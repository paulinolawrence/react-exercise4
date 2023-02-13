import http from "./http";

export function fetchEmployees() {
  return http.get("/employees");
}

export function fetchEmployeeById(id) {
  return http.get(`/employees/${id}`);
}

export function addEmployee(employee) {
  const employeeClone = { ...employee };
  //   Object.keys(employeeClone).forEach((key) => {
  //     if (
  //       employeeClone[key] === "" ||
  //       employeeClone[key] === null ||
  //       employeeClone[key] === undefined
  //     ) {
  //       delete employeeClone[key];
  //     }
  //   }
  //   );

  console.log(employeeClone);
  return http.post("/employees", employeeClone);
}

export function updateEmployee(id, employee) {
  return http.put(`/employees/${id}`, employee);
}

export function deleteEmployee(id) {
  return http.delete(`/employees/${id}`);
}
