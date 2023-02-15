import http from "./http";

export function fetchEmployees() {
  return http.get("/tasks");
}

export function fetchEmployeeById(id) {
  return http.get(`/tasks/${id}`);
}

export function addEmployee(employee) {
  const employeeClone = { ...employee };
  Object.keys(employeeClone).forEach((key) => {
    if (
      employeeClone[key] === "" ||
      employeeClone[key] === null ||
      employeeClone[key] === undefined
    ) {
      delete employeeClone[key];
    }
  });

  return http.post("/employees", employeeClone);
}

export function updateEmployee(id, task) {
  const taskClone = { ...task };
  Object.keys(taskClone).forEach((key) => {
    if (
      taskClone[key] === "" ||
      taskClone[key] === null ||
      taskClone[key] === undefined
    ) {
      delete taskClone[key];
    }
  });
  return http.put(`/tasks/${id}`, taskClone);
}

export function deleteEmployee(id) {
  return http.delete(`/tasks/${id}`);
}
