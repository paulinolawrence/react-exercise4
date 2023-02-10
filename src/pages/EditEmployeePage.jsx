import React from "react";
import { useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

const EditEmployeePage = ({ employees, onEditEmployee }) => {
  const params = useParams();
  const { id, ...employee } = employees.find(
    (employee) => employee.id === +params.id
  );
  return (
    <div>
      <EmployeeForm
        onSubmit={(form) => onEditEmployee(id, form)}
        initialValue={employee}
      />
    </div>
  );
};

export default EditEmployeePage;
