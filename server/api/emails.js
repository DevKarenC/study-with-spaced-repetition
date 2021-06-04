const router = require('express').Router();
const { Email } = require('../db');

// GET /api/emails
router.get('/', async (req, res, next) => {
  try {
    const emails = await Email.getAllEmails();
    res.send(emails);
  } catch (error) {
    next(error);
  }
});

// POST /api/emails
router.post('/', async (req, res, next) => {
  try {
    const email = await Email.addNewEmail(req.body);
    res.status(201).send(email);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
