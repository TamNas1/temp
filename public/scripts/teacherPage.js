const containerSubSubjects = document.getElementById('subSubjects');

fetch('/getSubSubjects')
  .then(res => res.json())
  .then((data) => {
    updateDom(JSON.parse(JSON.stringify(data)))
  });

function updateDom(data) {
  if( data ) {
    data.map(function(item, index) {
      var newLi = document.createElement("li");
      var newA = document.createElement("a");
      newA.innerText = data[index].name;

      newLi.appendChild(newA);
      containerSubSubjects.appendChild(newLi);
    })
  }
}

function size() {
  if (window.innerWidth < 1050) {
    document.getElementById('logo').src = '../../public/assests/minilogo.png';
  }
}

function mytoggle() {
  document.getElementById('wrapper').classList.toggle('active');
}

function navbar() {
  if (window.innerWidth > 1199) {
    mytoggle();
  }
}
size();
navbar();
