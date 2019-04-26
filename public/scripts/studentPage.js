const subjectDesc = document.getElementById('about-the-subject');
const subjectTitle = document.getElementById('subjectName');
const containerSubSubjects = document.getElementById('subSubjects');
const ourID = window.location.href.split('?')[1].split('id=')[1];

function size() {
  if (window.innerWidth < 1050) {
    document.getElementById('logo').src = '../../public/assests/minilogo.png';
  }
}

const updateDom = (data) => {
  data.data.map((item, index) => {
    const newLi = document.createElement('li');
    const newA = document.createElement('a');
    newA.innerText = data.data[index].name;
    newLi.appendChild(newA);
    containerSubSubjects.appendChild(newLi);

    if (data.data[index].subject_id == ourID) {
      subjectDesc.textContent = data.data[index].data;
      subjectTitle.textContent = data.data[index].name;
    }

    return 0;
  });
};

fetch('/getsubjectdetails', {
  method: 'POST',
  body: JSON.stringify({ subjectid: ourID }),
})
  .then(res => res.json())
  .then(data => updateDom(data))
  .catch(err => console.log(err));

function mytoggle() {
  document.getElementById('sidebar').classList.toggle('active');
}

function navbar() {
  if (window.innerWidth > 1199) {
    mytoggle();
  }
}
size();
navbar();
