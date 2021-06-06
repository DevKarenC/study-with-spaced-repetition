require('dotenv').config();
const { Email } = require('../server/db');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const senderEmail = process.env.SENDER_EMAIL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    clientId,
    clientSecret,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
    forceRefreshOnFailure: true,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: senderEmail,
      accessToken,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
    },
  });

  return transporter;
};

const sendMail = async () => {
  try {
    let emailTransporter = await createTransporter();
    const emailList = await Email.getAllEmails();
    const emails = emailList.map((email) => {
      return [
        {
          from: `Spaced Repetition <${senderEmail}>`,
          to: email.email,
          subject: `From Spaced Repetition - ${email.item}!`,
          text: email.message,
        },
        email.count,
      ];
    });

    emails.forEach((email) => {
      const [message, count] = email;
      // stop sending emails after 4 emails go out to the user
      if (count < 4) {
        emailTransporter.sendMail(message);
        Email.incrementCount();
      }
    });
  } catch (error) {
    console.log('Oh no, error while trying to study vigorously!', error);
  }
};

module.exports = sendMail;
