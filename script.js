const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  renderTask(task);
  saveTasks();
  taskInput.value = "";
}

// Render a single task
function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;
  li.className = "fade-in"; // animation

  if (task.completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.classList.add("fade-out");
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 300);
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save all tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    const text = li.childNodes[0].nodeValue.trim();
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Load saved tasks on page load
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(renderTask);
}

// Add task on Enter key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

loadTasks();
