import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import '../css/styless.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerInterval = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    
    if (selectedDate <= new Date()) {
      startButton.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        titleColor: '#fff',
        iconColor: '#fff',
      });
      userSelectedDate = null;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDate;
      iziToast.success({
        title: 'Success',
        message: 'Date selected! Click Start to begin countdown.',
        position: 'topRight',
        timeout: 3000,
      });
    }
  },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
  const currentTime = new Date();
  const timeDifference = userSelectedDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    daysSpan.textContent = '00';
    hoursSpan.textContent = '00';
    minutesSpan.textContent = '00';
    secondsSpan.textContent = '00';
    
    dateTimePicker.disabled = false;
    
    iziToast.success({
      title: 'Complete',
      message: 'Countdown finished! 🎉',
      position: 'topRight',
      backgroundColor: '#59A603',
      messageColor: '#fff',
      titleColor: '#fff',
      iconColor: '#fff',
    });
    return;
  }

  const timeLeft = convertMs(timeDifference);

  daysSpan.textContent = addLeadingZero(timeLeft.days);
  hoursSpan.textContent = addLeadingZero(timeLeft.hours);
  minutesSpan.textContent = addLeadingZero(timeLeft.minutes);
  secondsSpan.textContent = addLeadingZero(timeLeft.seconds);
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  updateTimer();

  timerInterval = setInterval(updateTimer, 1000);
});