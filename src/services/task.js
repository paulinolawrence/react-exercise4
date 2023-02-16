import http from "./http";

export function fetchTasks() {
  return http.get("/tasks");
}

export function fetchTaskById(id) {
  return http.get(`/tasks/${id}`);
}

export function addTask(task) {
  console.log(task);
  const taskClone = task;
  Object.keys(taskClone).forEach((key) => {
    if (
      taskClone[key] === "" ||
      taskClone[key] === null ||
      taskClone[key] === undefined
    ) {
      console.log(taskClone[key]);
      delete taskClone[key];
    }
  });
  console.log(taskClone);

  return http.post("/tasks", taskClone);
}

export function updateTaskStatus(id, completed) {
  console.log(id, completed);
  const taskClone = { completed };
  console.log(taskClone);
  Object.keys(taskClone).forEach((key) => {
    if (
      taskClone[key] === "" ||
      taskClone[key] === null ||
      taskClone[key] === undefined
    ) {
      delete taskClone[key];
    }
  });
  console.log(taskClone);
  return http.put(`/tasks/${id}`, taskClone);
}

export function updateTask(id, task) {
  console.log(id, task);
  const taskClone = task;
  console.log(taskClone);
  Object.keys(taskClone).forEach((key) => {
    if (
      taskClone[key] === "" ||
      taskClone[key] === null ||
      taskClone[key] === undefined
    ) {
      delete taskClone[key];
    }
  });
  console.log(taskClone);
  return http.put(`/tasks/${id}`, taskClone);
}

export function deleteTask(id) {
  return http.delete(`/tasks/${id}`);
}
