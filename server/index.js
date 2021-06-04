const { db } = require('./db');
const PORT = process.env.port || 3000;
const app = require('./app');
const seed = require('../script/seed');

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
  } catch (error) {
    console.log(error);
  }
};

init();
