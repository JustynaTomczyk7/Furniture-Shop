const currentTimeElement = document.querySelector("#current-time");
const currentHour = new Date().getHours();

setInterval(() => {
  currentTimeElement.innerHTML = `${currentHour}:00`;
}, 1000);
