//load in mongoose
const mongoose = require('mongoose');

//tell mongoose which promise library to use
mongoose.Promise = global.Promise;
//connect mongoose to our local mongodb or herokuDB so we can start writing data to db until mongoose knows how to connect
mongoose.connect(process.env.MONGODB_URI);



module.exports = {mongoose};
