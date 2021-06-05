const { db } = require('./db');
const PORT = process.env.port || 3000;
const app = require('./app');
const seed = require('../script/seed');
const cron = require('node-cron');
const sendMail = require('../script/emailSender');
require('dotenv').config();

const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
    } else {
      await db.sync();
    }
    app.listen(PORT, () =>
      console.log(`Retaining knowledge on port ${PORT}...`)
    );

    // send reminder emails
    cron.schedule(
      '*/1 * * * *',
      () => {
        sendMail();
        console.log('sending email every 1 minute');
      },
      {
        timezone: 'Etc/UTC',
      }
    );
  } catch (error) {
    console.log(error);
  }
};

init();
