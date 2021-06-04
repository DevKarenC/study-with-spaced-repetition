// access point for all database-related things
const db = require('./db');
const Email = require('./models/Email');

// define associations

// Email methods
Email.getAllEmails = async () => {
  const emails = await Email.findAll();
  return emails;
};

Email.addNewEmail = async (data) => {
  const email = await Email.create(data);
  return email;
};

module.exports = {
  db,
  Email,
};
