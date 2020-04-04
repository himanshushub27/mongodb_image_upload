const mongoose = require("mongoose");
const keys = require("../config/keys");
const mongoURI = keys.mongoURI;
const connection = mongoose.createConnection(mongoURI);

module.exports = connection;
