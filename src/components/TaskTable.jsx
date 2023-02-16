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
import * as taskService from "../services/task";
import Joi from "joi";
import { Box, Button, TextField } from "@mui/material";

const TasksTable = ({ tasks }) => {
  const [form, setForm] = useState(null);

  const navigate = useNavigate();

  const toggleStatus = (id, completed) => {
    console.log(id, completed);
    taskService.updateTaskStatus(id, !completed).then(() => {
      navigate("/");
    });
  };

  const editTask = (id) => {
    taskService.fetchTaskById(id).then((response) => {
      setForm(response.data);
    });
  };

  const deleteTask = (id) => {
    taskService.deleteTask(id).then(() => {
      navigate("/");
    });
  };

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    id: Joi.allow(),
    title: Joi.string().min(3).required(),
    completed: Joi.boolean().allow(),
    userId: Joi.allow(),
  });

  const handleSubmit = (id, form) => {
    taskService.updateTask(id, form).then(() => {
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
            <TableCell>&emsp;Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              {form != null && task.id == form.id ? (
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
                <TableCell>{task.title}</TableCell>
              )}

              <TableCell>
                {task.completed ? (
                  <IconButton>
                    <CheckCircle
                      onClick={() => toggleStatus(task.id, task.completed)}
                      color="success"
                    />
                  </IconButton>
                ) : (
                  <IconButton>
                    <Pending
                      onClick={() => toggleStatus(task.id, task.completed)}
                      color="warning"
                    />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                {form != null && task.id == form.id ? (
                  <Button
                    disabled={isFormInvalid()}
                    onClick={() => handleSubmit(task.id, form)}
                  >
                    Done
                  </Button>
                ) : (
                  <>
                    <IconButton
                      sx={{ "&:hover": { color: "blue" } }}
                      onClick={() => editTask(task.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ "&:hover": { color: "red" } }}
                      onClick={() => deleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TasksTable;
