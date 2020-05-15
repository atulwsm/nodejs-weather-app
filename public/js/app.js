const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

const messageIcon = document.querySelector('#message-icon');
const messageDesc = document.querySelector('#description');
const messageError = document.querySelector('#error');
const weatherBlock = document.querySelector('.weather-block');

weatherForm.addEventListener('submit', (e) => {
  const loc = document.querySelector('input').value;
  weatherBlock.style.display = 'none';
  messageError.innerHTML =
    '<div class="progress"><div class="indeterminate"></div></div>';

  fetch(`/weather?address=${loc}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        setTimeout(() => {
          messageError.textContent = data.error;
        }, 2000);
      } else {
        setTimeout(() => {
          weatherBlock.style.display = 'block';
          messageIcon.innerHTML = `<img src=http://openweathermap.org/img/w/${data.icon}.png />`;
          messageDesc.innerHTML =
            data.sky.charAt(0).toUpperCase() + data.sky.slice(1);
          messageOne.innerHTML = data.forecast;
          messageThree.innerHTML = `Humidity: ${data.humidity} %  | Wind Speed: ${data.wind_speed} meter/sec,`;
          messageTwo.textContent = data.location;
          messageError.textContent = '';
        }, 2000);
      }
    });
  });

  e.preventDefault();
});
