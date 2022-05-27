import { createTransport } from "nodemailer";

interface SendRawMailContext {
    email: string,
    body: string,
    subject: string
}

const env = process.env
const transporter = createTransport({
    host: env.HOST,
    port: env.PORT,
    secure: env.SECURE === 'true' ? true :  false,
    auth: {
        user: env.USER,
        pass: env.PASSWORD,
    },
});


export const sendRawMail = (mailOpt: SendRawMailContext) : Promise<{
    status : 'error' | 'Success',
    data ?:any,
    error ?: any
}> => {
    const mailOptions = {
        ...mailOpt,
        from: env.FROM,
        to: mailOpt.email,
        html: mailOpt.body,
    };
    return new Promise((resolve, reject) => {
        if (typeof mailOptions !== "object") {
            reject(false);
        } else {
            transporter.sendMail(mailOptions, (error, data) => {
                if (error) {
                    reject({status :'error',error})
                } else {
                    resolve({ status: 'Success', data });
                }
            });
        }
    });
};