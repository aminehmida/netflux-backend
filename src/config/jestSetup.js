const mongoose = require("mongoose");

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = "test";
jest.setTimeout(40000);

let count = 0;
beforeEach(async done => {
  const { readyState, collections } = mongoose.connection;

  const clearDB = () => {
    for (let i in collections) {
      collections[i].remove(function() {});
    }
    count += 1;
    // console.error("Clearing DB", count);
    return done();
  };

  const URL = `mongodb://${process.env.MONGO_DB_HOST}/${process.env
    .TEST_SUITE || "netflux-test"}`;

  if (readyState === 0) {
    try {
      await mongoose.connect(URL);
    } catch (error) {
      console.error("Failed to connect!!", error);
      throw error;
    }
  }
  return clearDB();
});

afterEach(done => {
  mongoose.disconnect();
  return done();
});

afterAll(done => {
  return done();
});
