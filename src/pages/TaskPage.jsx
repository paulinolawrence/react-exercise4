import { ArrowForward, Clear } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TasksTable from "../components/TaskTable";
import * as taskService from "../services/task";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState(null);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });

  const handleSubmit = () => {
    taskService
      .addTask(task)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message[0]);
        }
      });
    setTask(null);
    console.log("page");
  };

  const addTask = () => {
    setTask({});
  };

  const handleChange = ({ currentTarget: input }) => {
    setTask({
      ...task,
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
    console.log(task);
  };

  const isFormInvalid = () => {
    const result = schema.validate(task);
    console.log(result);
    return !!result.error;
  };

  useEffect(() => {
    taskService.fetchTasks().then((response) => {
      setTasks(response.data);
    });
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center" textAlign="left">
      {task == null ? (
        <Grid item xs={8}>
          <Button
            variant="text"
            startIcon={<AddIcon />}
            onClick={() => addTask()}
            sx={{
              color: "black",
              "&:hover": {
                border: "1px solid",
              },
            }}
          >
            Add Task
          </Button>
        </Grid>
      ) : (
        <Grid item xs={5} sx={{ ml: 10 }}>
          Input new task:&ensp;
          <TextField
            sx={{ mt: 0.7 }}
            name="title"
            error={!!errors.title}
            helperText={errors.title}
            onChange={handleChange}
            value={task.title}
            variant="standard"
            size="small"
          />
          <IconButton disabled={isFormInvalid()}>
            <ArrowForward
              sx={{ "&:hover": { color: "green" } }}
              onClick={() => handleSubmit()}
            />
          </IconButton>
        </Grid>
      )}

      <Grid item xs={8}>
        <TasksTable tasks={tasks} />
      </Grid>
    </Grid>
  );
};

export default TaskPage;
