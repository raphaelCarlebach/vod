export const auth = async() => {
  if(!localStorage["token"]){
    return window.location.href = "login.html"
  }
  let myData = await axios.get("http://localhost:3000/users/auth",{
    headers: {
      "x-auth-token": localStorage["token"],
    }
  })
  try{
    return myData.data
  }
  catch(err){
    alert("Token invalid or expired please try login again");
    localStorage.removeItem("token");
    return window.location.href = "login.html"
  }


  
}


setInterval(()=>{
  auth();
},120000)