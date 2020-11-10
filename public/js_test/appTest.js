window.onload = () => {
  init()
}

const init = async () => {
  $("#id_form").on("submit",(evt) => {
    evt.preventDefault();
    let myUrl = "http://localhost:3000/users/login/";

    let dataBody = {
      email:$("#id_email_input").val(),
      pass:$("#id_pass_input").val()
    }
   axios({
    method: 'POST',
    url:myUrl,
    data: dataBody
  })
   .then(myData => {
     console.log(myData.data.token);
     // שומר את הטוקן על המחשב של הלקוח
     localStorage.setItem("token",myData.data.token);
     window.location.href = "showUsers.html"
   })
   .catch(error => {
     // כדי להציג שגיאה עם פירוט
     console.log(error.response)
   })
  })
}