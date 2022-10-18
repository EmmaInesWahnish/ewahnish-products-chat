import logConfiguration from '../js/gralLogger.js';
import winston from 'winston';
import { createTransport } from 'nodemailer';

const ilogger = winston.createLogger(logConfiguration);

let  testAccount = 'bettye48@ethereal.email';

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'bettye48@ethereal.email',
        pass: 'NCEddWPZP61qPzde2A'
    }
});

let from = 'bettye48@ethereal.email';
let to = 'ewahnish@hotmail.email';

const sendEmail = async (myMessage, mySubject) => {
    const mailOptions = {
        from: from,
        to: to,
        subject: mySubject,
        html: myMessage,
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        ilogger.info(`nodemailer test message ${info}`)
    }
    catch(error){
        ilogger.error(`Error: Error trying to send email ${error}`)
    }
}

export default sendEmail