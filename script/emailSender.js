require('dotenv').config();
const { Email } = require('../server/db');
const nodemailer = require('nodemailer');
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASSWORD;

const sendMail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    const emailList = await Email.getAllEmails();
    const emails = emailList.map((email) => {
      return {
        from: `Spaced Repetition <${senderEmail}>`,
        to: email.email,
        subject: email.item,
        text: email.message,
      };
    });

    emails.forEach((email) => transporter.sendMail(email));
  } catch (error) {
    console.error('Oh no, error while trying to study vigorously!');
  }
};

module.exports = sendMail;
