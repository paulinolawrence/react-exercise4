import AddIcon from "@mui/icons-material/Add";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeesTable from "../components/EmployeesTable";
import * as employeeService from "../services/employee";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    employeeService.fetchEmployees().then((response) => {
      setEmployees(response.data);
    });
    console.log(employees);
  }, []);

  const handleDeleteEmployee = async (id) => {
    const employeesClone = [...employees];

    try {
      setEmployees(employees.filter((employee) => employee.id !== id));
      const returnValue = await employeeService.deleteEmployee(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Data might have already been deleted");
      }
      setEmployees(employeesClone);
    }
  };

  const handleAddEmployee = (employee) => {
    setEmployees([
      ...employees,
      { ...employee, id: employees.length * 999 + 1 },
    ]);
  };

  const handleEditEmployee = (id, employee) => {
    setEmployees(
      employees.map((emp) => {
        if (emp.id === id) {
          return {
            ...employee,
            id,
          };
        }
        return emp;
      })
    );
  };

  return (
    <Grid container spacing={2} justifyContent="flex-end" textAlign="right">
      <Grid item xs={4}>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          LinkComponent={Link}
          to="/employees/new"
        >
          Add Employee
        </Button>
      </Grid>
      <Grid item xs={12}>
        <EmployeesTable
          onDeleteEmployee={handleDeleteEmployee}
          employees={employees}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeesPage;
