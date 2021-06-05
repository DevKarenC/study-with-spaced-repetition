require('dotenv').config();
const nodemailer = require('nodemailer');
const emailList = 'hekir48023@vvaa1.com';
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASSWORD;

const sendMail = async (subject, text, to = emailList) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    const message = {
      from: `Spaced Repetition from ${senderEmail}!`,
      to,
      subject,
      text: subject,
      html: text,
    };

    transporter.sendMail(message);
  } catch (error) {
    console.error('Oh no, error while trying to study vigorously!');
  }
};

module.exports = sendMail;
