const { db, Email } = require('../server/db');

// clear db, update tables to match the models, and populate the db
const seed = async () => {
  // clears db and matches models to tables
  await db.sync({ force: true });
  console.log('db synced!');

  // Create emails
  const emails = await Promise.all([
    Email.create({
      email: 'test1@email.com',
      item: 'Review Sequelize',
      message:
        'https://sequelize.org/master/manual/validations-and-constraints.html',
    }),
    Email.create({
      email: 'test2@email.com',
      item: 'Review Express',
      message: 'https://expressjs.com/',
    }),
    Email.create({
      email: 'test3@email.com',
      item: 'Review Node',
      message: '',
    }),
  ]);

  console.log(`seeded ${emails.length} emails`);
  console.log(`seeded successfully!`);

  return {
    emails: {
      test1: emails[0],
      test2: emails[1],
      test3: emails[2],
    },
  };
};

const runSeed = async () => {
  console.log('seeding...');
  try {
    await seed();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
};

if (module === require.main) {
  runSeed();
}

module.exports = seed;
