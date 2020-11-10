$(() => {
  createMain();
})


const createMain = () => {
  fetch("ui/sideDisplay.html")
  .then(resp => resp.text())
  .then(data => {
    // console.log(data);
    $("main nav").append(data)
    // משגר אירוע שאנחנו המצאנו שנקרא
    // main_loaded
    // עושים את זה כי אנחנו צריכים לדעת מתי הוא סיים
    // לטעון את המיין
    // כרגע לאחר שינוי לא חובה כי זה רק הלינקים
    // ואין חובה שהם יטענו כדי לבצע פעולות
    //window.dispatchEvent(new Event("main_loaded"))
  })
}