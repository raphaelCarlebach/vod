// npm I mongoose -  להתקין בטרמינל בשביל החיבור לדאטא בייס

const mongoose = require('mongoose');
const config = require("config");
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(`mongodb+srv://raphael:${config.get("dbPass")}@cluster0.wusom.mongodb.net/shop`, {useNewUrlParser: true, useUnifiedTopology: true});

// בדיקה אם המונגו מחובד ועובד
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("mongo work")
});

module.exports = db