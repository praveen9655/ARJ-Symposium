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