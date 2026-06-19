import { MailtrapClient } from "mailtrap";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { sender, MailTrapClient } from "./mailtrap.config.js";

// export const SendVerificationEmail = async (email, verificationToken) => {
//     const recipient = [{ email }];
//     try {
//         const response = await MailTrapClient.send({
//             from: sender,
//             to: recipient,
//             subject: "Verify your E-mail",
//             html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
//             category: "Email Verification"
//         })
//         console.log("Email sent Successfully", response)
//     } catch (error) {
//         console.error("There was an error: ", error);
//         throw new Error(`There was an Error: ${error}`);
//     }

// };

export const SendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    try {
        const response = await MailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "ac48d251-6ae2-4f6f-b02d-49ca873e6b88",
            template_variables: {
                "company_info_address": "Noida Sector-2",
                "company_info_city": "New Delhi",
                "company_info_zip_code": "110052",
                "company_info_country": "India"
            }
        })

    } catch (error) {
        console.error("There was an error.", error);
        throw new Error(`An error Occured: ${error}`);
    }
};

// export const SendPasswordResetRequest = async (email, reseturl) => {
//     const recipient = [{ email }];
//     try {
//         const response = await MailTrapClient.send({
//             from: sender,
//             to: recipient,
//             subject: "Reset Your Password",
//             html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", reseturl),
//             category: "Password Reset"
//         });
//         console.log("Reset Password has been Sent!", response);
//     }
//     catch (error) {
//         console.error("There was an error.", error);
//         throw new Error(`An error occured: ${error} `);
//     }
// };

// export const SendResetSuccessful = async (email) => {
//     const recipient = [{ email }];
//     try {
//         const response = await MailTrapClient.send({
//             from: sender,
//             to: recipient,
//             subject: "Password Reset Successful!",
//             html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//             category: "Password Reset"
//         });

//         console.log("Password has been reset successfully and Confirmed!", response);

//     } catch (error) {
//         console.error("There was an error resetting the password.", error);
//         throw new Error(`There was an Error, ${error}`);
//     }
// };

