window.onload = () => {
  init();
}

const init = async () => {
  let myUrl = "http://localhost:3000/users/admin/"
  axios.get(myUrl,{
    headers: {
      "x-auth-token": localStorage["token"],
    }
  })
  .then(myData => {
    console.log(myData.data)
  })
  .catch(err => {
    document.location.href = "login.html"
    console.log(err.response)
  })
}