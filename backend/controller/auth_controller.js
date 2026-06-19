import express from "express";
import argon2 from "argon2";
import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { GenerateCookieandToken } from "../utils/GenerateCookieandToken.js";
// import { SendWelcomeEmail } from "../mailtrap/emails.js";
// import { MailTrapClient, sender } from "../mailtrap/mailtrap.config.js";
import { SendPasswordResetRequest, SendResetSuccessful, SendVerificationEmail } from "../resend/emails.js";

export const Signup = async (req, res, next) => {
    const { email, password, name } = req.body;
    try {

        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: `All Fields are Required! ` });
        };
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: `User Already Exists!` })
        }
        const hashedPassword = await argon2.hash(password);
        const Vtoken = Math.floor(100000 + Math.random() * 900000).toString();
        const newUsers = await User.create({ name, email, password: hashedPassword, verificationToken: Vtoken });

        newUsers.verificationToken = Vtoken;
        GenerateCookieandToken(res, newUsers._id);
        await SendVerificationEmail(newUsers.email, Vtoken);
        res.status(200).json({
            success: true,
            message: " New User Registered! ",
            data: {
                ...newUsers._doc,
            },
            verificationTokenExpiresIn: "1hr",
        });


    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error);
    }

};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found!"
            })
        }
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(403).json({
                success: false,
                message: " Invalid Password"
            });
        }
        GenerateCookieandToken(res, user._id);

        user.lastlogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: `User Logged in Successfully. Welcome Back ${user.name}`,
            data: {
                ...user._doc
            }
        })
    } catch (error) {
        console.error("There was an error", error);
        res.status(400).json({
            success: false,
            message: `There was an error :: ${error} `
        })

    }

};

export const Logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User Logged Out Successfully!"
    })
};

export const Verifyemail = async (req, res) => {
    const { code } = req.body;
    try {
        console.log("Code is ", code);
        const user = await User.findOne({
            verificationToken: code
        })

        if (!user) {
            return res.status(400).json({ success: false, message: `Invalid or Expired Token!` })
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresIn = undefined;
        await user.save();
        // await SendWelcomeEmail(user.email, user.name);
        res.status(200).json({
            success: true,
            message: "Welcome email has been Sent!",
            user: {
                ...user._doc,
            },
        })
    } catch (err) {
        console.error("Missing code/token.", err);
        throw new Error(`Error: ${err} `);
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Account does not Exist!",
            })
        };
        // Generate reset Token. 
        const resetToken = await crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresIn = resetTokenExpiresAt;
        await user.save();
        await SendPasswordResetRequest(user.email, `http://localhost:5173/reset-password/${resetToken}`);
        res.status(200).json({
            success: true,
            message: "Password Reset email Sent successfully!"
        })
    }
    catch (error) {
        console.error("There was an Error: ", error);
        return res.status(500).json({
            success: false,
            message: `There was an Error: ${error}`,
        })
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found!"
            });
        }
        const hashedPassword = await argon2.hash(password);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresIn = undefined;

        await user.save();

        await SendResetSuccessful(user.email);

        res.status(200).json({
            success: true,
            message: " Password Reset Successfully."
        });

    } catch (error) {
        console.error("There was an Error: ", error);
        // throw new Error(`There was an error resetting Password! ${error}`);
        return res.status(500).json({
            success: false,
            message: `There was an Error: ${error}`,
        });
    }
};

export const checkAuth = async (req, res) => {
    try {
        console.log("req.user ", req.userId);
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "The User has not been found!"
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    }
    catch (error) {
        console.error("There was an error authenticating user!", error);
        throw new Error(`There was an error: ${error}`);
    }

};
