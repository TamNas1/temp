var loginBtn = document.getElementById('signIn');

loginBtn.addEventListener("click",function(e){
e.preventDefault();
fetchsignIn(loginBtn.value,signin);


})
function fetchsignIn (value,cb){
fetch("/signin?"+cb,
{
  method:POST,
   body:JSON.stringify({
    value:value
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
