import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Pending } from "@mui/icons-material";
import * as employeeService from "../services/employee";
import Joi from "joi";
import { Box, Button, TextField } from "@mui/material";

const EmployeesTable = ({ employees, onDeleteEmployee }) => {
  const [form, setForm] = useState(null);

  const navigate = useNavigate();

  const editTask = (id) => {
    employeeService.fetchEmployeeById(id).then((response) => {
      setForm(response.data);
    });
  };

  const deleteTask = (id) => {
    employeeService.deleteEmployee(id).then(() => {
      navigate("/");
    });
  };

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    id: Joi.allow(),
    title: Joi.string().min(5).required(),
    completed: Joi.boolean().allow(),
    userId: Joi.allow(),
  });

  const handleSubmit = (id, form) => {
    setForm({});
    employeeService.updateEmployee(id, form).then(() => {
      navigate("/");
    });
  };

  const handleChange = ({ currentTarget: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setErrors({ ...errors, [input.name]: error.details[0].message });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);
    return !!result.error;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              {form != null && employee.id == form.id ? (
                <TextField
                  sx={{ mt: 5 }}
                  name="title"
                  error={!!errors.title}
                  helperText={errors.title}
                  onChange={handleChange}
                  value={form.title}
                  variant="standard"
                  fullWidth
                />
              ) : (
                <TableCell>{employee.title}</TableCell>
              )}

              <TableCell>
                {employee.completed ? (
                  <CheckCircle color="success" />
                ) : (
                  <Pending color="warning" />
                )}
              </TableCell>
              {form != null && employee.id == form.id ? (
                <TableCell>
                  <Button
                    disabled={isFormInvalid()}
                    onClick={() => handleSubmit(employee.id, form)}
                  >
                    Done
                  </Button>
                </TableCell>
              ) : (
                <TableCell>
                  <IconButton
                    sx={{ "&:hover": { color: "blue" } }}
                    onClick={() => editTask(employee.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{ "&:hover": { color: "red" } }}
                    onClick={() => deleteTask(employee.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesTable;
