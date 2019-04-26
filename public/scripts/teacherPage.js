const containerSubSubjects = document.getElementById('subSubjects');

function updateDom(data) {
  if (data) {
    data.map((item, index) => {
      const newLi = document.createElement('li');
      const newA = document.createElement('a');
      newA.innerText = data[index].name;
      newLi.appendChild(newA);
      containerSubSubjects.appendChild(newLi);
      return 0;
    });
  }
}

if (!document.cookie) location.href = '/';
else {
  fetch('/checkauth')
    .then(res => res.json())
    .then(data => userAuthentication(data))
    .catch(err => console.log(err));

  const userAuthentication = (data) => {
    if (data.redirect) location.href = data.url;
  };
}

fetch('/getSubSubjects')
  .then(res => res.json())
  .then((data) => {
    updateDom(JSON.parse(JSON.stringify(data)));
  });
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
