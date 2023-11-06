const mongoose = require("mongoose");

require("dotenv").config();
mongoose.set('strictQuery', true);

const connect = mongoose.connect(process.env.DB_URL);

module.exports = connect;