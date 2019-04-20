var userVal = document.getElementById('username');
var passVal = document.getElementById('password');
var loginBtn = document.getElementById('signIn');

loginBtn.addEventListener("click",function(e){
e.preventDefault();
fetchsignIn(loginBtn.value,signin);


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
  console.log("the data we have is",data);
}
