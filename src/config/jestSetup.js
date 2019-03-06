const mongoose = require("mongoose");

import "../models/Movie";

beforeEach(done => {
  const { collections, readyState } = mongoose.connection;

  function clearDB() {
    for (let i in collections) {
      collections[i].remove();
    }
    return done();
  }

  if (readyState === 0) {
    mongoose.connect("mongodb://mongo:27017/netflux-test", err => {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});

afterEach(done => {
  mongoose.disconnect();
  return done();
});

afterAll(done => done());
