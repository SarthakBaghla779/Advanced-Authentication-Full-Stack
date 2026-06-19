import mongoose, { mongo } from "mongoose";

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastlogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresIn: Date,
    verificationToken: String,
    verificationTokenExpiresIn: Date,
}, { timestamps: true });

const User = mongoose.model("User", userModel);

export default User;
