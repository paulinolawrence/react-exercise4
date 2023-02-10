import React from "react";
import EmployeeForm from "../components/EmployeeForm";

const AddEmployeePage = ({ onAddEmployee }) => {
  return (
    <div>
      <EmployeeForm onSubmit={onAddEmployee} />
    </div>
  );
};

export default AddEmployeePage;
