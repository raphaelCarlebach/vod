$(() => {
  // TODO: אם המשתמש כבר מחובר לשגר אותו ל
  init()
})

const init = () => {
  $("#id_form").on("submit",(evt) => {
    evt.preventDefault();
    //TODO: לעשות ולדיזאציה קצת יותר מורכבת 
    sendData()
   
  })
}

const sendData = () => {

  let myUrl = "http://localhost:3000/users/add/";

    let dataBody = {
      email:$("#id_email_input").val(),
      user:$("#id_user_input").val(),
      pass:$("#id_pass_input").val()
    }
  axios({
    method: 'POST',
    url:myUrl,
    data: dataBody
  })
   .then(myData => {
     alert("Sign success, please login now")
     window.location.href = "login.html"
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