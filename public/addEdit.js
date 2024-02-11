import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showStudents } from "./students.js";

let addEditDiv = null;
let fName = null;
let sName = null;
let surname = null;
let dob = null;
let admNo = null;
let classID = null;
let addingStudent = null;

export const handleAddEdit = () => {

  addEditDiv = document.getElementById("edit-note");
  fName = document.getElementById("fName");
  sName = document.getElementById("sName");
  surname = document.getElementById("surname");
  dob = document.getElementById("dob");
  admNo = document.getElementById("admNo");
  classID = document.getElementById("classID");
  addingStudent = document.getElementById("adding-student");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingStudent) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/students";

        // Edit a student
        if (addingNote.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/students/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              fName: fName.value,
              sName: sName.value,
              surname: surname.value,
              dob: dob.value,
              admNo: admNo.value,
              classID: classID.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The student info was updated.";
            } else {
              // a 201 is expected for a successful creation of a student
              message.textContent = "The student was created.";
            }

            fName.value ="";
            sName.value = "";
            surname.value = "";
            dob.value = "";
            admNo.value = "";
            classID.value = "";

            showStudents();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);

      } else if (e.target === editCancel) {
        message.textContent = "";
        
        showStudents();

      }
    }
  });
};

export const showAddEdit = async (studentId) => {
  if (!studentId) {
    fName.value ="";
    sName.value = "";
    surname.value = "";
    dob.value = "";
    admNo.value = "";
    classID.value = "";
    addingStudent.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/students/${studentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        fName.value = data.student.fName;
        sName.value = data.student.sName;
        surname.value = data.student.surname;
        dob.value = data.student.dob;
        admNo.value = data.student.admNo;
        classID.value = data.student.classID;
        addingStudent.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = studentId;

        setDiv(addEditDiv);
      } else {
        // If list of students has been updated since last display
        message.textContent = "The student was not found";
        showStudents();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showStudents();
    }

    enableInput(true);
  }
};

// Deleting a student
export const deleteStudent = async (studentId) => {
  try {
    const response = await fetch(`/api/v1/students/${studentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      message.textContent = "Student deleted successfully.";
      // Refresh the students list after deleting one.
      await showStudents();
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "An error occurred while deleting the student.";
  }
};