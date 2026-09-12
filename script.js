const STORAGE_KEY = "task-list-items";

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector('[data-cy="task-input"]');
const taskList = document.querySelector('[data-cy="task-list"]');
const emptyState = document.querySelector('[data-cy="empty-state"]');
const validationMessage = document.querySelector('[data-cy="validation-message"]');
const activeCount = document.querySelector('[data-cy="active-count"]');
const completedCount = document.querySelector('[data-cy="completed-count"]');

let tasks = loadTasks();

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskId() {
  return window.crypto && typeof window.crypto.randomUUID === "function"
    ? window.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach((task) => {
    const taskItem = document.createElement("article");
    taskItem.className = `task-item${task.completed ? " is-completed" : ""}`;
    taskItem.dataset.cy = "task-item";
    taskItem.dataset.taskId = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.dataset.cy = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Tandai ${task.title} sebagai selesai`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-task";
    deleteButton.dataset.cy = "delete-task";
    deleteButton.textContent = "Hapus";
    deleteButton.setAttribute("aria-label", `Hapus ${task.title}`);
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    taskItem.append(checkbox, taskText, deleteButton);
    taskList.append(taskItem);
  });

  const completedTasks = tasks.filter((task) => task.completed).length;
  activeCount.textContent = String(tasks.length - completedTasks);
  completedCount.textContent = String(completedTasks);
  emptyState.hidden = tasks.length > 0;
}

function showValidation(message) {
  validationMessage.textContent = message;
  validationMessage.hidden = false;
}

function clearValidation() {
  validationMessage.textContent = "";
  validationMessage.hidden = true;
}

function addTask(title) {
  tasks.push({
    id: createTaskId(),
    title,
    completed: false
  });
  saveTasks();
  renderTasks();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) => (
    task.id === taskId ? { ...task, completed: !task.completed } : task
  ));
  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();

  if (!title) {
    showValidation("Nama task wajib diisi.");
    taskInput.focus();
    return;
  }

  clearValidation();
  addTask(title);
  taskForm.reset();
  taskInput.focus();
});

taskInput.addEventListener("input", () => {
  if (taskInput.value.trim()) {
    clearValidation();
  }
});

renderTasks();
