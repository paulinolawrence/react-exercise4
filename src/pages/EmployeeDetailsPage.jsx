import React from "react";
import { useParams } from "react-router-dom";

const EmployeeDetailsPage = () => {
  const params = useParams();
  console.log(params);

  return <div>EmployeeDetailsPage with id: {params.id}</div>;
};

export default EmployeeDetailsPage;
