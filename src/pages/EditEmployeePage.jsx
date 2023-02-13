import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import * as employeeService from "../services/employee";

const EditEmployeePage = () => {
  const params = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    employeeService.fetchEmployeeById(params.id).then((response) => {
      setEmployee(response.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (form) => {
    employeeService.updateEmployee(employee.id, form).then((response) => {
      console.log(response);
      navigate("/");
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (employee)
    return (
      <div>
        <EmployeeForm
          initialValue={{
            name: employee.name,
            username: employee.username,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            website: employee.website,
          }}
          onSubmit={handleSubmit}
        />
      </div>
    );

  return null;
};

export default EditEmployeePage;
