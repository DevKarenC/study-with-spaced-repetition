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

module.exports = {
  db,
  Email,
};
