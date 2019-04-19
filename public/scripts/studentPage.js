function mytoggle(){
  window.onload=size;

  function size(){
    if (window.innerWidth<1050){
        document.getElementById("logo").src="../../public/assests/minilogo.png";

}
  }
document.getElementById("sidebar").classList.toggle('active');
}

function navbar(){
if (window.innerWidth>1199){
mytoggle();
}
}
navbar();
