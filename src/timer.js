const timerElements = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

const timeToEndPromotion = {
  days: 4,
  hours: 11,
  minutes: 16,
  seconds: 12,
};

let secondsToEndPromotion =
  timeToEndPromotion.seconds +
  timeToEndPromotion.minutes * 60 +
  timeToEndPromotion.hours * 60 * 60 +
  timeToEndPromotion.days * 24 * 60 * 60;

setInterval(() => {
  timerElements.seconds.innerHTML = secondsToEndPromotion % 60;
  timerElements.minutes.innerHTML = Math.floor(secondsToEndPromotion / 60) % 60;
  timerElements.hours.innerHTML = Math.floor(
    (secondsToEndPromotion / (60 * 60)) % 24
  );
  timerElements.days.innerHTML = Math.floor(
    secondsToEndPromotion / (24 * 60 * 60)
  );
  secondsToEndPromotion -= 1;
}, 1000);
