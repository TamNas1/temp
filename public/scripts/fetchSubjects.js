/* eslint-disable no-unused-vars */
function getSubjects(cb) {
  fetch('/getSubjects')
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}
