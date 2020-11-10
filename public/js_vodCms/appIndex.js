import {auth} from "../services/authSer.js";

$(() => {
  
  init();
})

const init = async() => {
  let data = await auth();
  console.log(data)
  if(data.status == "ok"){
    // return window.location.href = "myInfo.html"
  }
  // TODO: נבדוק אם המשתמש מחובר או לא
}