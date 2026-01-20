import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import '../css/styless.css';

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();


  const formData = new FormData(event.currentTarget);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  createPromise(delay, state)
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A603',
        messageColor: '#fff',
        titleColor: '#fff',
        iconColor: '#fff',
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        titleColor: '#fff',
        iconColor: '#fff',
      });
    });

  event.currentTarget.reset();
});


function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}