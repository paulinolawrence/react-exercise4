import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as employeeService from "../services/employee";

const EmployeeDetailsPage = () => {
  const params = useParams();

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    employeeService.fetchEmployeeById(params.id).then((response) => {
      setEmployee(response.data);
      setLoading(false);
    });
  }, [params.id]);

  const handleDeleteEmployee = async (id) => {
    try {
      await employeeService.deleteEmployee(id);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Data might have already been deleted");
      }
    }
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (employee)
    return (
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          }
          title={employee.name}
          subheader={`@${employee.username}`}
        />
        <CardContent>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={() => navigate(`/employees/${employee.id}/edit`)}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDeleteEmployee(employee.id)}>
              Delete
            </MenuItem>
          </Menu>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Typography variant="overline">Email</Typography>
              <Typography variant="body2">{employee.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Phone</Typography>
              <Typography variant="body2">{employee.phone}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Adress</Typography>
              <Typography variant="body2">{employee.address}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Website</Typography>
              <Typography variant="body2">{employee.website}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );

  return null;
};

export default EmployeeDetailsPage;
