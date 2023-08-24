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
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwVAB5kCoEUqTXCu6lsOazM0A0-Z_ugMpfwjIKeT3pWaI0XtFhnZYqqZCtlvK3XaegNqw/exec'
  const form = document.forms['form']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log("Thank you! your form is submitted successfully." ))
      // .then(() => {  window.location.reload(); })
      .then(() => {  
        document.querySelector("#form").style.display='none';
        document.querySelector("#success").style.display='block';
       })
      .catch(error => console.error('Error!', error.message))
  })
//FireBase

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


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = document.querySelector('#form');
    var studentName = document.getElementById("studentName").value;
    var studentEmail = document.getElementById("studentEmail").value;
    var studentPhone = document.getElementById("studentPhone").value;
    var collegeName = document.getElementById("collegeName").value;
    var department = document.querySelector('input[name="department"]:checked').value;
    var yearOfStudying = document.querySelector('input[name="yearOfStudying"]:checked').value;
    
        var technicalEvents = [];
        var technicalEventCheckboxes = document.querySelectorAll('input[name="technicalEvents[]"]:checked');
        technicalEventCheckboxes.forEach(function(checkbox) {
            technicalEvents.push(checkbox.value);
        });

        var nonTechnicalEvents = [];
        var nonTechnicalEventCheckboxes = document.querySelectorAll('input[name="nonTechnicalEvents[]"]:checked');
        nonTechnicalEventCheckboxes.forEach(function(checkbox) {
            nonTechnicalEvents.push(checkbox.value);
        });
    console.log(studentName,studentEmail,studentPhone,collegeName, department ,yearOfStudying, technicalEvents, nonTechnicalEvents);
  var newContactForm = contactFormDB.push();
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
});
    var el = document.getElementById("wrapper");
    var toggleButton = document.getElementById("menu-toggle");
