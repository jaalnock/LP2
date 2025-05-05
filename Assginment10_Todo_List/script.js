function fetchTasks() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/tasks", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const tasks = JSON.parse(xhr.responseText);
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = ""; // Clear existing tasks

      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.setAttribute("data-id", task.id);

        // Create delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "delete-btn";
        delBtn.onclick = () => deleteTask(task.id); // Assign task delete function

        li.appendChild(delBtn); // Append the delete button to the list item
        taskList.appendChild(li); // Append list item to the task list
      });
    }
  };
  xhr.send();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/tasks", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 201) {
      input.value = ""; // Clear input field
      fetchTasks(); // Fetch and update the task list
    }
  };
  xhr.send(JSON.stringify({ text: taskText }));
}

function deleteTask(id) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `http://localhost:3000/tasks/${id}`, true);
  xhr.onload = function () {
    if (xhr.status === 204) {
      fetchTasks(); // Fetch and update the task list after deletion
    }
  };
  xhr.send();
}

window.onload = fetchTasks;
