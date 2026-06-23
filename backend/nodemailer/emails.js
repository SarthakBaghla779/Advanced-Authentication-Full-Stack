import { transporter, sender } from "./smtp.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";

export const SendVerificationEmail = async (email, verificationToken) => {
    try {
        const response = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Verify your E-mail",
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                "{verificationCode}",
                verificationToken
            ),
        })
        console.log("Email sent Successfully", response);

    } catch (error) {
        console.error("There was an verification error: ", error);
        throw error;
    }
};

export const SendPasswordResetRequest = async (email, reseturl) => {
    try {
        const response = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", reseturl),
        });
        console.log("Reset Password has been Sent!", response);
    }
    catch (error) {
        console.error("There was an error.", error);
        throw error;
    }
};

export const SendResetSuccessful = async (email) => {
    try {
        const response = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Password Reset Successful!",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });

        console.log("Password has been reset successfully and Confirmed!", response);

    } catch (error) {
        console.error("There was an error resetting the password.", error);
        throw error;
    }
};