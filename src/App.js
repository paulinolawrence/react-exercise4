import { Button, Container, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddEmployeePage from "./pages/AddEmployeePage";
import EmployeesTable from "./components/EmployeesTable";
import { EMPLOYEES_DATA } from "./data/employees";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import EditEmployeePage from "./pages/EditEmployeePage";
import NotFound from "./pages/NotFound";

function App() {
  const [employees, setEmployees] = useState(EMPLOYEES_DATA);

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />
          <Route
            path="/employees"
            element={
              <EmployeesPage
                employees={employees}
                onDeleteEmployee={handleDeleteEmployee}
              />
            }
          />
          <Route path="/employees/new" element={<AddEmployeePage />} />
          <Route
            path="/employees/:id"
            element={
              <EmployeeDetailsPage
                onDeleteEmployee={handleDeleteEmployee}
                employees={employees}
              />
            }
          />
          <Route path="/employees/:id/edit" element={<EditEmployeePage />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
