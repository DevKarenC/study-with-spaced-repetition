// access point for all database-related things
const db = require('./db');
const Email = require('./models/Email');

// Email Class Methods
Email.getAllEmails = async () => {
  const emails = await Email.findAll({});
  return emails;
};

Email.addNewEmail = async (data) => {
  const email = await Email.create(data);
  return email;
};

Email.incrementCount = async () => {
  const emails = await Email.getAllEmails();
  await Promise.all(
    emails.map(async (email) => {
      email.count += 1;
      await email.save();
    })
  );
};

module.exports = {
  db,
  Email,
};
