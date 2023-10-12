const API = "https://65260bd067cfb1e59ce7d705.mockapi.io/Users";
// selecting the dom elements
const studentList = document.querySelector("#student-list");
const studentForm = document.querySelector("#student-form");
let editId;
//creating a form
studentForm.innerHTML += `
<form class="form-data">
<h2 class="head">Student Form</h2>
<input
type="text"
name = "name"
required
value= ""
placeholder ="Student Name"
class="input-text"
id="input-name"
/>

<input
type="text"
name = "batch"
required
value= ""
placeholder ="Student Batch"
class="input-text"
id="input-batch"
/>

<input
type="text"
name = "age"
required
value= ""
placeholder ="Student Age"
class="input-text"
id="input-age"
/>
<div>
<button 
type="submit" 
id="add-btn"
class="btn"
>Add students</button>

<button 
type="submit" 
id="update-btn"
class="btn"
>Update students</button>
</div>
</form>
`;
const updateBtn = document.querySelector("#update-btn");
const addBtn = document.querySelector("#add-btn");
const inputName = document.querySelector("#input-name");
const inputBatch = document.querySelector("#input-batch");
const inputAge = document.querySelector("#input-age");
updateBtn.style.display = "none";

function ReadAllData() {
    fetch(API, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => renderAllStudents(data))
      .catch((err) => console.log("Error", err));
  }
  ReadAllData();

  function createData(newStudent) {
    //Create(POST)
    fetch(API, {
      method: "POST",
      body: JSON.stringify(newStudent),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => renderStudents(data))
      .then(() => {
        inputName.value = "";
        inputBatch.value = "";
        inputAge.value = "";
      })
      .catch((err) => console.log(err));
  }


  
  // render array of students card
  function renderAllStudents(students) {
    students.forEach((student) => {
      renderStudents(student);
    });
  }
  
  studentForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id == "add-btn") {
      const newStudent = {
        name: inputName.value,
        batch: inputBatch.value,
        age: inputAge.value,
      };
      createData(newStudent);
    }
  
    if (e.target.id == "update-btn") {
      const updatedStudent = {
        name: inputName.value,
        batch: inputBatch.value,
        age: inputAge.value,
      };
      updateData(updatedStudent);
    }
  });
  
  function populateStudentForm(parent) {
    const editableParent = parent.parentNode;
    inputName.value = editableParent.querySelector("h2").textContent;
    inputBatch.value = editableParent.querySelector("#batch-val").textContent;
    inputAge.value = editableParent.querySelector("#age-val").textContent;
    updateBtn.style.display = "block";
    addBtn.style.display = "none";
  }