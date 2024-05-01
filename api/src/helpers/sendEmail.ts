import nodemailer from 'nodemailer';

import { SMTP_PASSWORD, SMTP_USERNAME} from '../util/secrets';

const sendEmailWithNodeMailer = async (emailData:any) => {
    
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: SMTP_USERNAME,
                pass: SMTP_PASSWORD,
            },
        });
        const mailOption = {
            from: SMTP_USERNAME,
            to: emailData.email,
            subject: emailData.subject,
            html: emailData.html,
        };
        await transporter.sendMail( mailOption, (error,info) =>{
            if (error) {
                console.log("---SMTP ERROR1---");
                console.log(error);
            }else {
                console.log("message sent:%s",info.response);
            }
        });
    } catch (error) {
        console.log("---SMTP ERROR2---");
        console.log("problem sending Email:",error);
    }
};

export default sendEmailWithNodeMailer;