const bodyTag = document.getElementsByTagName('body')[0];
const signOutBtn = document.getElementById('signout');

bodyTag.style.display = 'none';
signOutBtn.style.display = 'none';

if (document.cookie) {
  fetch('/checkauth')
    .then(res => res.json())
    .then(data => userAuthentication(data))
    .catch(err => console.log(err));

  const userAuthentication = (data) => {
    if (data.redirect) location.href = data.url;
    else {
      signOutBtn.style.display = 'inline-block';
      bodyTag.style.display = 'block';
    }
  };
} else location.href = '/';

signOutBtn.addEventListener('click', (event) => {
  event.preventDefault();

  fetch('/logout')
    .then(res => res.json())
    .then(data => logOut(data));
});
const logOut = (data) => {
  if (data.logOut) location.href = '/';
};
