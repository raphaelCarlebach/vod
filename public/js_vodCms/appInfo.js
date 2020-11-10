import { doApiGet } from "../services/apiSer.js";
import {auth} from "../services/authSer.js";

let userId

$(() => {
  init();
})

const init = async() => {
  let data = await auth();
  //console.log(data)
  if(data.status == "ok"){
    let data = await doApiGet("http://localhost:3000/users/single")
    console.log(data)
    userId = data._id;
    $("#id_user_input").val(data.user)
    $("#id_email_input").val(data.email)
    $("#user_info").removeClass("d-none")
    $("#loading_img").hide();
    // return window.location.href = "myInfo.html"
  }
  declareViewEvents()
}

const declareViewEvents = () => {
  $("#id_form").on("submit",(evt) => {
    evt.preventDefault();
    //TODO: לעשות ולדיזאציה קצת יותר מורכבת 
    sendEditData()
   
  })
}

const sendEditData = () => {

  let myUrl = "http://localhost:3000/users/edit/";

    let dataBody = {
      id:userId,
      email:$("#id_email_input").val(),
      user:$("#id_user_input").val(),
      // pass:$("#id_pass_input").val()
    }
  axios({
    method: 'PUT',
    url:myUrl,
    data: dataBody
  })
   .then(myData => {
     alert("Edit user success")
     location.reload();
   })
   .catch(error => {
      console.log(error.response)
     if(error.response.data.code){
      alert("Email already in system, try another or log in")
     }
     else if(error.response.data[0].context.key == "email"){
      alert("Email not valid, enter anothe one")
     }
     else{
       alert("There is problem try again!")
     }
     // כדי להציג שגיאה עם פירוט
    //  console.log(error.response)
   })
}