var inputData = document.querySelector('input[type="text"]');
var ulSpisok = document.getElementById("list");
var spans = document.getElementsByTagName("span");
var saveBtn = document.getElementById("save");
var clearBtn = document.getElementById("clear");
var infoBtn = document.getElementById("info");
var endTasks = document.getElementsByTagName("p");
var nowDate = new Date();
var thisLoacal = document.querySelector("html").getAttribute("lang");

var optionsForDate = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  timezone: "UTC",
  hour: "numeric",
  minute: "numeric",
};

//addEventListner - обработчик события с послежующим вызовом функции
inputData.addEventListener("keypress", function (keyPressed) {
  if (keyPressed.which === 13) {
    var newLi = document.createElement("li");
    var newSpan = document.createElement("span");
    var newPForDate = document.createElement("p");
    var newPForTask = document.createElement("p");
    var newTodo = this.value;

    newSpan.innerHTML = "Delete";
    newPForTask.setAttribute("id", "task");
    newPForDate.setAttribute("id", "nowDate");

    if (this.value != 0) {
      ulSpisok.appendChild(newLi).append(newSpan);
      newLi.appendChild(newPForTask).append(newTodo);
      newLi
        .appendChild(newPForDate)
        .append(nowDate.toLocaleString(thisLoacal, optionsForDate));

      this.value = "";
    }

    deleteTodo();
    ForEndTask();
  }
});

function deleteTodo() {
  for (let span of spans) {
    span.addEventListener("click", function () {
      span.parentElement.remove();
      event.preventDefault();
    });
  }
}
function ForEndTask() {
  for (let endTask of endTasks) {
    if (endTask.getAttribute("id") == "task") {
      endTask.addEventListener("click", function () {
        endTask.style.textDecoration = "line-through";
        event.preventDefault();
      });
    }
  }
}
function loadTodo() {
  if (localStorage.getItem("todoApplication")) {
    ulSpisok.innerHTML = localStorage.getItem("todoApplication");
    deleteTodo();
    ForEndTask();
  }
}

saveBtn.addEventListener("click", function () {
  localStorage.setItem("todoApplication", ulSpisok.innerHTML);
});

clearBtn.addEventListener("click", function () {
  ulSpisok.innerHTML = "";
  localStorage.setItem("todoApplication", ulSpisok.innerHTML);
});
infoBtn.addEventListener("click", function () {
  var windowWirhInfo = window.open(
    "about:blank",
    "hello",
    "width=200,height=200",
  );
  windowWirhInfo.document.write("<h1>Никита Сотников</h1>");
});

deleteTodo();
loadTodo();
ForEndTask();
