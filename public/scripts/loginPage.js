const userVal = document.getElementById('username');
const passVal = document.getElementById('password');
const loginBtn = document.getElementById('signIn');
const announceTxt = document.getElementById('Announce');
const bodyTag = document.getElementsByTagName('body')[0];

bodyTag.style.display = "none";

function fetchsignIn(value, cb) {
  fetch('/signin', {
    method: 'POST',
    body: JSON.stringify({
      user: userVal.value,
      pass: passVal.value,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      cb(data.msg);
    });
}

if (document.cookie) {
  fetch('/checkauth')
    .then(res => res.json())
    .then(data => userAuthentication(data))
    .catch(err => console.log(err));

  const userAuthentication = (data) => {
    if (!data.redirect) location.href = '/subjects';
    else bodyTag.style.display = "block";

  };
}

function signin(data) {
  announceTxt.innerText = data;

  if (data === 'Successfully logged in') {
    announceTxt.style.color = 'green';
    userVal.style.border = '1px green solid';
    passVal.style.border = '1px green solid';

    setTimeout(() => {
      location.href = '/subjects';
    }, 1500);
  } else if (data === 'Invalid username/password') {
    announceTxt.style.color = 'red';
    userVal.style.border = '1px red solid';
    passVal.style.border = '1px red solid';
  } else {
    announceTxt.innerText = "Username doesn't exist";
    userVal.style.border = '1px red solid';
    announceTxt.style.color = 'red';
  }
}

loginBtn.addEventListener('click', (e) => {
  if (userVal.value === '') {
    announceTxt.innerText = 'Username cannot be empty';
    announceTxt.style.color = 'red';
    userVal.style.border = '1px red solid';
  } else if (passVal.value === '') {
    announceTxt.innerText = 'Password cannot be empty';
    announceTxt.style.color = 'red';
    userVal.style.border = '1px white solid';
    passVal.style.border = '1px red solid';
  } else {
    userVal.style.border = '1px white solid';
    passVal.style.border = '1px white solid';

    e.preventDefault();
    fetchsignIn(loginBtn.value, signin);
  }
});
