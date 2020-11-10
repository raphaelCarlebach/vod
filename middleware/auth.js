const jwt = require("jsonwebtoken");
const config = require("config");

const authToken = (req,res,next) => {
    let token = req.header("x-auth-token");
    // בודק אם נשלח טוקן
    if(!token){return res.status(401).json({ message: "access denied" })}
    try{
      let checkToken = jwt.verify(token,config.get("tokenKey"));
      req.email = checkToken.email;
      req._id = checkToken._id
      // תעבור לפונקציה הבאה 
      next()
    }
    catch(err){
      // אם הטוקן לא תקין
      return res.status(400).json(err)
    }
  }
  
  exports.authToken = authToken
  