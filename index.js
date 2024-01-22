const task = document.getElementById("input-task");
const date = document.getElementById("date");
const button = document.getElementById("button");

button.addEventListener("click", function (event) {
    event.preventDefault();
    const taskValue = task.value;
    const dateValue = new Date(date.value + "T00:00:00");

    try {
        addTask(taskValue, dateValue);
    } catch (error) {
        alert("Insert a valid Date");
    }
});

function addTask(taskValue, dateValue) {
    if (taskValue === "") {
        alert("Insert a Task");
        return;
    }

    const timestampDate = dateValue.getTime();
    const weekDay = dateValue.getDay();
    const weekIDHTML = document.getElementById(`week-${weekDay}`);

    const timeNow = Date.now();
    const weekLater = 1000 * 60 * 60 * 24 * 7;
    const color = timeNow + weekLater < timestampDate ? "blue" : "red";

    if (timestampDate < timeNow - 1000 * 60 * 60 * 24) {
        alert("Insert a task for today or later");
        return;
    }

    const taskElement = document.createElement("div");
    taskElement.className = `task-${color}`;
    taskElement.innerHTML = `
        <p><strong>${dateValue.getDate()}/${dateValue.getMonth() + 1}/${dateValue.getFullYear()}</strong></p>
        <p><strong>${taskValue}</strong></p>
    `;

    taskElement.addEventListener("click", function () {
        this.classList.toggle("done");
    });

    weekIDHTML.appendChild(taskElement);
}