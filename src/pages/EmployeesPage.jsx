import AddIcon from "@mui/icons-material/Add";
import { Button, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import EmployeesTable from "../components/EmployeesTable";

const EmployeesPage = ({ employees, onDeleteEmployee }) => {
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
          employees={employees}
          onDeleteEmployee={onDeleteEmployee}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeesPage;
