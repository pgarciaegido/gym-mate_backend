const nodemailer = require('nodemailer');
const Boom = require('boom');

const { GMAIL_PASSWORD } = require('../../../config/secrets');

const sendEmail = (emailTo, userName) => {
    return new Promise((resolve, reject) => {
            
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pgarciaegido@gmail.com',
                pass: GMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: 'pgarciaegido@gmail.com',
            to: emailTo,
            subject: 'Gym Mate password recovery',
            html: `<b>Hello ${userName}! This is a password recovery service :)</b>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(Boom.badRequest('Sending email failed.'));
            }
            resolve('Email sent');
        });
    });
};

module.exports = { sendEmail };
