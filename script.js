function updateCountdown() {
    const eventDate = new Date('2023-08-31');
    const currentDate = new Date();
    const timeDifference = eventDate - currentDate;
    if (timeDifference <= 0) {
      clearInterval(interval);
      return;
    }
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('daysMobile').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('hoursMobile').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('minutesMobile').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('secondsMobile').textContent = seconds;
  }
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
  function RegiOn(){
    var opn= document.querySelector('.Regi');
    opn.style.display='block';
  }
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
  const studentPhone = document.getElementById("studentPhone").value;
  const duplicateCheck = await checkDuplicateStudentPhone(studentPhone);

  if (duplicateCheck) {
      document.querySelector('.errorMessage').style.display='block';
  } else {
    document.querySelector('.errorMessage').style.display='none';
      const studentName = document.getElementById("studentName").value;
      const studentEmail = document.getElementById("studentEmail").value;
      const collegeName = document.getElementById("collegeName").value;
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
          nonTechnicalEvents: nonTechnicalEvents
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