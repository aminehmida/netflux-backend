const mongoose = require("mongoose");

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = "test";

beforeEach(done => {
  const { readyState, collections } = mongoose.connection;

  const clearDB = () => {
    for (let i in collections) {
      collections[i].remove(function() {});
    }
    return done();
  };

  if (readyState === 0) {
    mongoose.connect(
      `mongodb://${process.env.MONGO_DB_HOST}/netflux-test`,
      function(err) {
        if (err) {
          throw err;
        }
        return clearDB();
      }
    );
  } else {
    return clearDB();
  }
});

afterEach(done => {
  mongoose.disconnect();
  return done();
});
