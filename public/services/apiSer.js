export const doApiGet = async(_url) => {
  let myData = await axios.get(_url,{
    headers: {
      "x-auth-token": localStorage["token"],
    }
  })
  try{
    return myData.data
  }
  catch(err){
    alert("There is problem");
   // localStorage.removeItem("token");
   // return window.location.href = "login.html"
  }
}