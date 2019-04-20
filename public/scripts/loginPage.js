var userVal = document.getElementById('username');
var passVal = document.getElementById('password');
var loginBtn = document.getElementById('signIn');
var announceTxt  = document.getElementById('Announce');

loginBtn.addEventListener("click",function(e){

if( userVal.value.trim() == "" ) {
  announceTxt.innerText = "Username cannot be empty"
  announceTxt.style.color = "red";
  userVal.style.border = "1px red solid";
}
else if( passVal.value.trim() == "" ) {
  announceTxt.innerText = "Password cannot be empty"
  announceTxt.style.color = "red";
  userVal.style.border = "1px white solid";
  passVal.style.border = "1px red solid";

}
else {
  userVal.style.border = "1px white solid";
  passVal.style.border = "1px white solid";

e.preventDefault();
fetchsignIn(loginBtn.value,signin);

}

})
function fetchsignIn (value,cb){
fetch("/signin",
{
  method:"POST",
   body:JSON.stringify({
    user:userVal.value,
    pass:passVal.value
   })
}
).then(function(res){

return res.json();

})
.then(function(data){
cb(data);
})
}
function signin(data){
  if( data === true) {
    announceTxt.innerText = "Successfully logged in"
    announceTxt.style.color = "green";
    userVal.style.border = "1px green solid";
    passVal.style.border = "1px green solid";

    setTimeout(function() {
      location.href = "/subjects";
    }, 1500)
  }
  else if ( data === false ) {
    announceTxt.innerText = "Invaid username/password"
    announceTxt.style.color = "red";
  }
  else {
    announceTxt.innerText = "Server error"
    announceTxt.style.color = "red";
  }
}
