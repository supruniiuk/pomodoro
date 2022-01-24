const convertToSeconds = (min, sec) => {
  return Number(min * 60 + Number(sec));
};

const convert_from_seconds = (seconds) => {
  const sec = seconds % 60;
  const min = Math.floor(seconds / 60);
  return [min, sec];
};

const startTimer = () => {
  intrvl = setInterval(showTime, repeat_time);
};

const setAnimationPlay = () => {
  let timelineStyle = document.querySelector(".timeline").style;
  let animation = window.getComputedStyle(
    document.querySelector(".circle__content"),
    null
  )["animation-play-state"];
  if (animation == "paused") {
    document.querySelector(
      ".circle__content"
    ).style.animationPlayState = `running`;

    timelineStyle.setProperty("--pauseBefore", `running`);
    timelineStyle.setProperty("--pauseAfter", `running`);
  } else if (animation == "running") {
    document.querySelector(
      ".circle__content"
    ).style.animationPlayState = `paused`;

    timelineStyle.setProperty("--pauseBefore", `paused`);
    timelineStyle.setProperty("--pauseAfter", `paused`);
  }
};

const pauseTimer = () => {
  showTime();
  setAnimationPlay();

  clearInterval(intrvl);
};

const resetTimer = () => {
  /*???*/
};

const setTime = (currentTime) => {
  let [min, sec] = convert_from_seconds(currentTime);

  minutes.textContent = String(min).padStart(2, "0");
  seconds.textContent = String(sec).padStart(2, "0");
};

const getPercent = (currentTime) => {
  return (currentTime * 100) / time;
};

const showTime = () => {
  if (currentTime > 0) {
    setTime(--currentTime);
  } else if (currentTime == 0) {
    optionText.textContent = "start";
  }
};

const setAnimation = (time) => {
  if (time != currentTime) {
    setAnimationPlay();
  } else {
    document.querySelector(
      ".circle__content"
    ).style.animation = `line ${time}s linear forwards`;

    let timelineStyle = document.querySelector(".timeline").style;
    timelineStyle.setProperty(
      "--animBefore",
      `mask_right ${time}s steps(1, end) forwards`
    );
    timelineStyle.setProperty(
      "--animAfter",
      `mask_left ${time}s steps(1, end) forwards`
    );
  }
};

let time = 1500;
let currentTime = 1500;
const repeat_time = 1000;
let counterActive = false;
const timeTypes = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 600,
};
let intrvl;

const minutes = document.querySelector("#min");
const seconds = document.querySelector("#sec");
const optionText = document.getElementsByClassName("option")[0];
const timePicker = document.getElementsByClassName("pomodoro-time-type");

const timer = document.querySelector(".circle");

for (let i = 0; i < timePicker.length; i++) {
  let duration = timeTypes[timePicker[i].getAttribute("data-time-type")];
  timePicker[i].onclick = () => {
    showTime(time);
    time = duration;
    currentTime = duration;

    resetTimer();
  };
}

function click() {
  if (!counterActive) {
    setAnimation(time);
    startTimer();
    counterActive = true;
    optionText.textContent = "pause";
  } else {
    pauseTimer();
    counterActive = false;
    optionText.textContent = "start";
  }
}

timer.onclick = () => {
  click();
};

window.onkeypress = () => {
  click();
};

window.onkeydown = () => {
  document.querySelector(".circle").classList.add("active");
};

window.onkeyup = () => {
  document.querySelector(".circle").classList.remove("active");
};

setTime(time);
