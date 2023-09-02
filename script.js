
  function RegiOn(){
    var opn= document.querySelector('.Regi');
    opn.style.display='block';
  }

$(document).ready(function() {
  // Get the current timestamp in seconds
  var currentTimestamp = Math.floor(Date.now() / 1000);

  // Set the end date to September 31, 2023, and convert it to a Unix timestamp
  var endDate = new Date('2023-09-31');
  var endTimestamp = Math.floor(endDate.getTime() / 1000);
  var strDate = new Date('2023-08-31');
  var strTimestamp = Math.floor(strDate.getTime() / 1000);

  $('.countdown').final_countdown({
      start: strTimestamp,  // Start from the current time
      end: endTimestamp,       // Use the target timestamp
      now: currentTimestamp,
      selectors: {
          value_seconds: '.clock-seconds .val',
          canvas_seconds: 'canvas_seconds',
          value_minutes: '.clock-minutes .val',
          canvas_minutes: 'canvas_minutes',
          value_hours: '.clock-hours .val',
          canvas_hours: 'canvas_hours',
          value_days: '.clock-days .val',
          canvas_days: 'canvas_days'
      },
      seconds: {
          borderColor: '#E83363',
          borderWidth: '5'
      },
      minutes: {
          borderColor: '#E83363',
          borderWidth: '5'
      },
      hours: {
          borderColor: '#E83363',
          borderWidth: '5'
      },
      days: {
          borderColor: '#E83363',
          borderWidth: '5'
      }
  }, function() {
  });
});


// Form validation start
const regex_char = /^[a-zA-Z ]+$/;
const regex_num = /^[0-9]+$/;
const regex_email=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const studentName = document.querySelector('#studentName');
const studentEmail = document.querySelector('#studentEmail');
const studentPhone = document.querySelector('#studentPhone');
const collegeName = document.querySelector('#collegeName');

 function liveUpinfo(input, regex, maxLength) {
  input.addEventListener('input', function () {
      const value = input.value.trim();
      input.classList.remove('success', 'error');
      setSuccess(input);

      if (value.length === 0) {
        setError(input, 'Field is empty');
      }

      if (!regex.test(value)) {
        setError(input, 'Only specific characters are allowed');
      }

      if (value.length > maxLength) {
        setError(input, `Maximum ${maxLength} characters allowed`);
      }

      if (value.length > 0 && regex.test(value) && value.length <= maxLength) {
        setSuccess(input);
      }
    });
}

const fields = [
  { input: studentName, regex: regex_char, maxLength: 15, message: 'studentName', },
  { input: studentEmail, regex: regex_email, maxLength: 30, message: 'studentEmail', },
  { input: studentPhone, regex: regex_num, maxLength: 10, message: 'studentPhone',  },
  { input: collegeName, regex: regex_char, maxLength: 50, message: 'collegeName', },
];
fields.forEach(({ input, regex, maxLength }) => {
  liveUpinfo(input, regex, maxLength);
});

function validateInputs() {

  fields.forEach(({ input, regex, maxLength, message }) => {
    const value = input.value.trim();

    if (value === '') {
      setError(input, `${message} is empty`);
    } else if (!regex.test(value)) {
      setError(input, `Only numbers are allowed for ${message}`);
    } else if (value.length > maxLength) {
      setError(input, `Only ${maxLength} numbers are allowed for ${message}`);
    } else {
      setSuccess(input);
    }
  });

}
function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector('.error');
  inputGroup.classList.add('error1');
  inputGroup.classList.remove('success');
  errorElement.innerText = message;
}
function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector('.error');
  inputGroup.classList.remove('error1');
  inputGroup.classList.add('success');
  errorElement.innerText = '';
}

fields.forEach(({ input, regex, maxLength }) => {
  liveUpinfo(input, regex, maxLength);
});

// Form validation end


// Duplicate find 
async function payOpen() {
  const studentName = document.querySelector('#studentName').value;
  const studentPhone = document.getElementById("studentPhone").value;
  if (studentName === '' || studentPhone === '') {
    document.querySelector('.tXtform').style.display = 'block';
    document.querySelector('#btnnext').style.display = 'block';
    
    validateInputs();
    
    return;
  }
  validateInputs();
  const duplicateCheck = await checkDuplicateStudentPhone(studentPhone);
  if (duplicateCheck ) {
      console.log('err');
      document.querySelector('.errorMessage').style.display = 'block';
      document.querySelector('.tXtform').style.display = 'block';
      document.querySelector('#btnnext').style.display = 'block';
  } else {
      document.querySelector('.errorMessage').style.display = 'none';
      document.querySelector('.payMent').style.display = 'block';
      document.querySelector('.tXtform').style.display = 'none';
      document.querySelector('#btnnext').style.display = 'none';
  }
}


//PreviewImg
// const imageInput = document.getElementById("payimg");
// const previewImage = document.getElementById("previewImage");

// imageInput.addEventListener("change", function() {
//   const selectedImage = imageInput.files[0];

//   if (selectedImage) {
//     const reader = new FileReader();

//     reader.onload = function(e) {
//       previewImage.src = e.target.result;
//       previewImage.style.display = "block";
//     };

//     reader.readAsDataURL(selectedImage);
//   } else {
//     previewImage.src = "#";
//     previewImage.style.display = "none";
//   }
// });
//Sheet 
const scriptURL = 'https://script.google.com/macros/s/AKfycbxiGtyhTf8A1jIsKcR3GGbpzigrQ59NDbUqSk4PCCicrTLL8ykYDRUOvYBZZ5Zvud_hlQ/exec'

const form = document.forms['form']

  const firebaseConfig = {
    apiKey: "AIzaSyCwY3ogotwg8p6SakN0MmvrpusFVpcL970",
    authDomain: "formtest-8e8fc.firebaseapp.com",
    databaseURL: "https://formtest-8e8fc-default-rtdb.firebaseio.com",
    projectId: "formtest-8e8fc",
    storageBucket: "formtest-8e8fc.appspot.com",
    messagingSenderId: "15994947140",
    appId: "1:15994947140:web:3e251fc4fe60b4e0bcde11"
  };
firebase.initializeApp(firebaseConfig);
var contactFormDB = firebase.database().ref('FormTest');


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  validateInputs();
  const TransactionId = document.getElementById("TransactionId").value;
  const duplicateCheck = await checkDuplicateTransactionId(TransactionId);
  if (duplicateCheck ) {
    document.getElementById("dupTid").style.display='block';
  }  else {
    document.getElementById("dupTid").style.display='none';
    document.querySelector('.errorMessage').style.display='none';
      const studentName = document.getElementById("studentName").value;
      const studentEmail = document.getElementById("studentEmail").value;
      const collegeName = document.getElementById("collegeName").value;
      const TransactionId = document.getElementById("TransactionId").value;
      const department = document.querySelector('input[name="department"]:checked').value;
      const yearOfStudying = document.querySelector('input[name="yearOfStudying"]:checked').value;
      
      const technicalEvents = [];
      const technicalEventCheckboxes = document.querySelectorAll('input[name="technicalEvents[]"]:checked');
      technicalEventCheckboxes.forEach(function(checkbox) {
          technicalEvents.push(checkbox.value);
      });

      const nonTechnicalEvents = [];
      const nonTechnicalEventCheckboxes = document.querySelectorAll('input[name="nonTechnicalEvents[]"]:checked');
      nonTechnicalEventCheckboxes.forEach(function(checkbox) {
          nonTechnicalEvents.push(checkbox.value);
      });

      const newContactForm = contactFormDB.push();
      newContactForm.set({
          studentName: studentName,
          studentEmail: studentEmail,
          studentPhone: studentPhone,
          collegeName: collegeName,
          department: department,
          yearOfStudying: yearOfStudying,
          technicalEvents: technicalEvents,
          nonTechnicalEvents: nonTechnicalEvents,
          TransactionId: TransactionId,
      });

      document.querySelector("#loading").style.display = 'block';
      document.querySelector("#form").style.display = 'none';
      document.querySelector("#success").style.display = 'none';
  
      function getCurrentDateTime() {
          const now = new Date();
          
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
          return formattedDateTime;
      }
  
      const currentDateTime = getCurrentDateTime();
      const formData = new FormData(form);
      formData.append('Time', currentDateTime);
  
      fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => {
          if (data.result === 'success') {
              console.log("Thank you! Your form is submitted successfully.");
              document.querySelector("#form").style.display = 'none';
              document.querySelector("#loading").style.display = 'none';
              document.querySelector("#success").style.display = 'block';
          } else {
              console.error('Error!', data.error);
              document.querySelector("#errorMessage").textContent = data.error; // Show the error message
          }
      })
      .catch(error => console.error('Error!', error.message));
  }
});

async function checkDuplicateStudentPhone(phoneNumber) {
  const snapshot = await contactFormDB.orderByChild("studentPhone").equalTo(phoneNumber).once("value");
  return snapshot.exists();
}
async function checkDuplicateTransactionId(TransactionId) {
  const snapshot = await contactFormDB.orderByChild("TransactionId").equalTo(TransactionId).once("value");
  return snapshot.exists();
}