/* eslint-disable no-unused-vars */
function getSubjects(cb) {
  fetch('/getSubSubjects')
    .then(response => response.json())
    .then(data => cb(data))
    .catch(error => console.log(error));
}
