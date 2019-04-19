

function size(){
  if (window.innerWidth<1050){
      document.getElementById("logo").src="../../public/assests/minilogo.png";

}
function mytoggle(){
document.getElementById("sidebar").classList.toggle('active');
}

function navbar(){
if (window.innerWidth>1199){
mytoggle();
}
}
size();
navbar();
