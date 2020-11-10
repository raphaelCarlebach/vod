const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");



const userSchema = new mongoose.Schema({
  user: String,
  email: String,
  pass: String,
  date_time: {
    type: Date, default: Date.now
  },
  rule:{
    type:String, default:"regular"
  }
});

const userModel = mongoose.model("users",userSchema);
exports.userModel = userModel;

// מייצר טוקן/קוד כניסה שנשלח למקומות שרק משתמשים מורשים
// רשאים להכנס
const createToken = (_id,_email) => {
 
  let newToken = jwt.sign({email:_email,_id:_id},config.get("tokenKey"),{expiresIn:"30mins"});
 // console.log(newToken)
  return newToken;
}

exports.createToken = createToken;





// בשביל הוספה או עריכה של משתמש חדש
const validUser = (_userObj) => {
  //any == כל סוג טייפ
  let schema = Joi.object({
    id:Joi.any(),
    user:Joi.string().min(2).max(50).required(),
    email: Joi.string().min(2).max(50).email().required(),
    pass:Joi.string().min(1).max(50).required(),
   
  })
  return schema.validate(_userObj);
}


exports.validUser = validUser;


// בשביל הוספה או עריכה של משתמש חדש
const validEditUser = (_userObj) => {
  //any == כל סוג טייפ
  let schema = Joi.object({
    id:Joi.any().required(),
    user:Joi.string().min(2).max(50).required(),
    email: Joi.string().min(2).max(50).email().required()
   
  })
  return schema.validate(_userObj);
}


exports.validEditUser = validEditUser;

// ולדיזציה למידע שנשלח כאשר מתחברים
const validLogin = (_userObj) => {
  let schema = Joi.object({
    email: Joi.string().min(2).max(50).email().required(),
    pass:Joi.string().min(1).max(50).required(),  
  })
  return schema.validate(_userObj);
}

exports.validLogin = validLogin;




