$(() => {
  createHeader();
  
})


const createHeader = () => {
  fetch("ui/headerUi.html")
  .then(resp => resp.text())
  .then(data => {
    // console.log(data);
    $("body").prepend(data)
    checkIfLogin();
  })

}

const checkIfLogin = () => {
  if(localStorage["token"]){
    // $("header .log_in").empty();
    let btn = $("<button class='btn btn-danger'>Log out</button>");
    $("header .log_in").html(btn);
    $(btn).on("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html"
    })
  }
}