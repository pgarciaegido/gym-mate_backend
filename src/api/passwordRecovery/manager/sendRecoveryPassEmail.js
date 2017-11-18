const nodemailer = require('nodemailer');
const Boom = require('boom');

const { GMAIL_PASSWORD } = require('../../../config/secrets');

const sendEmail = (emailTo, userName, token) => {
    return new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pgarciaegido@gmail.com',
                pass: GMAIL_PASSWORD
            }
        });

        // TODO: Link should point to FRONT END, and it should handle the api call.
        const mailOptions = {
            from: 'pgarciaegido@gmail.com',
            to: emailTo,
            subject: 'Gym Mate password recovery',
            html: `<div>
                <b>Hello ${userName}! This is a password recovery service :)</b>
                <a href="http://localhost:5000/introduce-new-password/${emailTo}/${token}">Click here to change your password</a>
            </div>`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                reject(Boom.badRequest('Sending email failed.'));
            }
            resolve('Email sent');
        });
    });
};

module.exports = { sendEmail };
