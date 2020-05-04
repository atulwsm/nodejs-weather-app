const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  const loc = document.querySelector('input').value;
  console.log(loc);

  messageOne.textContent = 'Loading...';

  fetch(`http://localhost:3000/weather?address=${loc}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = 'Forecast: ' + data.forecast;
        messageTwo.textContent = 'Location: ' + data.location;
      }
    });
  });

  e.preventDefault();
});
