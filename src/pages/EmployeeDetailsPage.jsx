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
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmployeeDetailsPage = ({ employees, onDeleteEmployee }) => {
  const params = useParams();

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const employee = employees.find((employee) => employee.id === +params.id);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
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
          <MenuItem onClick={() => navigate(`/employees/${employee.id}/edit`)}>
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDeleteEmployee(employee.id);
              navigate("/");
            }}
          >
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
};

export default EmployeeDetailsPage;
