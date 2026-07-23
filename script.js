function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form  textarea");
  let taskCheckbox = document.querySelector(".addTask form #checkbox");

  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is empty");
  }

  function renderTask() {
    var allTask = document.querySelector(".allTask");

    var sum = "";
    currentTask.forEach(function (elem, idx) {
      sum += `<div class="task">
            <h5>${elem.task} <span class = ${elem.imp}>imp</span> </h5>
            <button id=${idx}>Mark as completed</button>
          </div>`;
    });
    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    let markCompletedBtn = document
      .querySelectorAll(".task button")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentTask.splice(btn.id, 1);
          renderTask();
        });
      });
  }
  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();

    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckbox.checked = false;
  });
}
todoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";
    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
            <p>${elem}</p>
             <input id=${idx} type="text" placeholder="..." value=${savedData}>
          </div>`;
  });
  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", () => {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuote() {
  var motivationQuoteContent = document.querySelector(".motivation-2 h2");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch("http://api.quotable.io/random");
    let data = await response.json();
    motivationQuoteContent.innerHTML = data.content;
    motivationAuthor.innerHTML = data.author;
  }
  fetchQuote();
}
motivationalQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  var startBtn = document.querySelector(".pomo-timer .start");
  var pauseBtn = document.querySelector(".pomo-timer .pause");
  var resetBtn = document.querySelector(".pomo-timer .reset");
  var session = document.querySelector(".pomodoro-fullpage .session");
  let timeInterval = null;
  let totalSeconds = 25 * 60;
  let isWorkSession = true;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
  }
  function startTimer() {
    clearInterval(timeInterval);

    if (isWorkSession) {
      timeInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timeInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break!";
          session.style.backgroundColor = "var(--red)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timeInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timeInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--tri2)";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }
  function pauseTimer() {
    clearInterval(timeInterval);
  }
  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timeInterval);
    updateTimer();
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

function weatherFunctionality(){
var APIKey = "886218673bbb4e8b9d8133703260702";
var city = "Gorakhpur";
var data = null;
var header1Time = document.querySelector(".header1 h1");
var header1Date= document.querySelector(".header1 h2");
var header2Temp= document.querySelector(".header2 h2");
var header2Condition= document.querySelector(".header2 h4");
var precipitation= document.querySelector(".header2 .precipitation");
var humidity= document.querySelector(".header2 .humidity");
var wind= document.querySelector(".header2 .wind");

async function weatherAPICall() {
  var response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`,
  );
  data = await response.json();
  console.log(data);
  
  header2Temp.innerHTML= `${data.current.temp_c}°C`
  header2Condition.innerHTML=`${data.current.condition.text}`
  wind.innerHTML=`Wind: ${data.current.wind_kph}km/h`
  humidity.innerHTML=`Humidity: ${data.current.humidity}%`
  precipitation.innerHTML=`Heat Index: ${data.current.heatindex_c}°C`
}
weatherAPICall();

function timedate() {
  const totalDaysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const totalMonths=[
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  var date = new Date();
  var dayOfWeek =totalDaysOfWeek[date.getDay()];
  var hours= date.getHours();
  var minutes = date.getMinutes();
  var seconds= date.getSeconds()
  var tarikh = date.getDate()
  var month= totalMonths[date.getMonth()];
  var year= date.getFullYear();

  header1Date.innerHTML=`${tarikh} ${month}, ${year}`

  if(hours>12){
    header1Time.innerHTML = `${dayOfWeek}, ${String(hours-12).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} PM`;
  }
  else{
    header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}AM`;
  }
}

setInterval(()=>{
  timedate()
},1000)
}
weatherFunctionality()

function changeTheme(){
var theme= document.querySelector('.theme');
var rootElement= document.documentElement
var flag=0;
theme.addEventListener('click', ()=>{
   /* --pre: #eff7f9;
  --sec: #0f5257;
  --tri1: #0b3142;
  --tri2: #bfd7ea; */
  if(flag == 0){
  rootElement.style.setProperty('--pri', '#E6501B')
   rootElement.style.setProperty('--sec', '#740A03')
    rootElement.style.setProperty('--tri1', '#280905')
     rootElement.style.setProperty('--tri2', '#C3110C')
     flag=1;
  }
  else if(flag==1){
rootElement.style.setProperty('--pri', '#eff7f9')
   rootElement.style.setProperty('--sec', '#0f5257')
    rootElement.style.setProperty('--tri1', '#0b3142')
     rootElement.style.setProperty('--tri2', '#bfd7ea')
     flag=2;
  }
  else if(flag==2){
rootElement.style.setProperty('--pri', '#EFE1B5')
   rootElement.style.setProperty('--sec', '#5DD3B6')
    rootElement.style.setProperty('--tri1', '#6E5034')
     rootElement.style.setProperty('--tri2', '#CDB885')
     flag=0;
  }
})
}
changeTheme();

function dailyGoals(){
  let form = document.querySelector(".addGoals form");
  let goalInput = document.querySelector(".addGoals form #goal-input");
/*   let taskDetailsInput = document.querySelector(".addGoals form  textarea");*/
  let goalCheckbox = document.querySelector(".addGoals form #checkbox");

  let currentGoal = [];

  if (localStorage.getItem("currentGoal")) {
    currentGoal = JSON.parse(localStorage.getItem("currentGoal"));
  } else {
    console.log("Goal list is empty");
  }

  function renderGoal() {
    var allGoals = document.querySelector(".allGoals");

    var add = "";
    currentGoal.forEach(function (elem, idx) {
      add += `<div class="goals">
            <h5>${elem.task} <span class = ${elem.imp}>imp</span> </h5>
            <button id=${idx}>Mark as completed</button>
          </div>`;
    });
    allGoals.innerHTML = add;

    localStorage.setItem("currentGoal", JSON.stringify(currentGoal));

    let markCompletedBtn = document
      .querySelectorAll(".goals button")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentGoal.splice(btn.id, 1);
          renderGoal();
        });
      });
  }
  renderGoal();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentGoal.push({
      goals: goalInput.value,
      imp: goalCheckbox.checked,
    });
    renderGoal();

    goalInput.value = "";
    goalCheckbox.checked = false;
  });
}
dailyGoals();