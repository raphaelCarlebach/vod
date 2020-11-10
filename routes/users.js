const express = require('express');
const { userModel, validUser, validLogin ,validEditUser, createToken} = require("../models/users_model")
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {authToken} = require("../middleware/auth")


/* GET users listing. */
router.get('/', async (req, res) => {
  // 1 - אומר להציג
  // 0 - אל תציד רק את המאפין הנל
  userModel.find({},{email:1,user:1})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })

});

router.get('/single/',authToken, async (req, res) => {
  // יתקבל מהמידל וואיר שמפענח את הטוקן
  let userId = req._id;
  userModel.findOne({_id:userId}, { email: 1, user: 1 })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })
})


// authToken - מיידל ווארי שבודק שנשלח טוקן תקני
router.get('/admin',authToken, async (req, res) => {
  // 1 - אומר להציג
  // 0 - אל תציד רק את המאפין הנל
  userModel.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })

});

// סתם לבדיקה
const checkQ = (req,res,next) => {
  if(req.query.q){
    req.user = req.query.q;
    next();
   // res.json({query:req.query.q})
  }
  else{
    res.json({message:"no query"})
  }
}

// מנסה להסביר את המיידל ווארי
router.get("/test",checkQ,
(req,res) => {
  userModel.find({user:req.user})
  .then(data => {
    res.json(data)
  })
})




router.get('/all', async (req, res) => {
  // req.params, req.body , req.query , req.header
  // req.header - ניתן לשלוח בכל סוג מיטוד גם גיט ,פוסט,פוט,דיליט
  // והוא מאובטח
  let token = req.header("x-auth-token");
  if(!token){return res.status(401).json({message:"access denied"})}
  try{
   let checkToken =  jwt.verify(token,"monkeys");
  }
  catch(err){
    // אם מוצא שהטוקן לא תקני מחזיר טעות ועוצר את הפונקציה
    return res.status(401).json(err)
  }
  // TODO: רק אם יש טוקן תקני ייתן לי לצפות בעמוד הנל
  userModel.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })

});

// חשוב לזכור 
// try  and catch בגלל שזה אנסינכרוני 
router.post("/add", async (req, res) => {

  let valid = validUser(req.body);
  if (!valid.error) {
    let salt = await bcrypt.genSalt(10);
    req.body.pass = await bcrypt.hash(req.body.pass, salt);
    try {
      let data = await userModel.insertMany([req.body]);
      // מסתיר מאפיינים שאנחנו לא נרצה להציג , נכתוב את המאפיינים שכן נרצה להציג
      let dataHidden = _.pick(data[0], ["user", "email", "_id", "date_time"])
      res.json(dataHidden)
    }
    catch (err) {
      // בודק לפי המייל בגלל שהוא יחודי
      res.status(400).json({message:"user already in system ",code:"duplicate"});
    }
  }
  else {
    res.status(400).json(valid.error.details);
  }
})

router.post("/login", async (req, res) => {
  let valid = validLogin(req.body)
  if (!valid.error) {
    try {
      let user = await userModel.findOne({ email: req.body.email })
      if (user) {
        // לבדוק שהסטרינד סיסמא שהגיע מהצד לקוח תואם להצפנה 
        // במסד נתונים
        let validPass = await bcrypt.compare(req.body.pass, user.pass);
        if (!validPass) { res.status(400).json({ message: "password not good, go work" }) }
        else {
          console.log(user)
          let myToken = createToken(user.id,user.email);
          res.json({token:myToken})
        }
      }
      else {
        res.status(400).json({ message: "user not found, go home" })
      }
    }
    catch(err){
      res.status(400).json(err);
    }
  }
  else {
    res.status(400).json(valid.error.details);
  }
})

// מבצע בדיקה אם יש טוקן תקני
router.get('/auth',authToken,(req,res) => {
  res.json({status:"ok"})
});

// ניתן לערוך רק שם משתמש ואימייל
// סיסמא צריך ראוט בפני עצמו
router.put("/edit", async (req, res) => {
  let valid = validEditUser(req.body);
  if (!valid.error) {
    
    try {
      let data = await userModel.updateOne({ _id: req.body.id }, req.body);
      res.json(data)
    }
    catch (err) {
      res.status(400).json({message:"user already in system ",code:"duplicate"});
    }
  }
  else {
    res.status(400).json(valid.error.details);
  }
})


// router.put("/edit", async (req, res) => {
//   let valid = validUser(req.body);
//   if (!valid.error) {
//     // מגדיר רמת הצפנה
//     let salt = await bcrypt.genSalt(10);
//     req.body.pass = await bcrypt.hash(req.body.pass, salt);
//     try {
//       let data = await userModel.updateOne({_id:req.body.id},req.body);
//       res.json(data)
//     }
//     catch (err) {
//       res.status(400).json("id is not valid " + err);
//     }
//   }
//   else {
//     res.status(400).json(valid.error.details);
//   }
// })


module.exports = router;
