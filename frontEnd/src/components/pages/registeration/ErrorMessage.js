import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert variant="danger" >
        
      <strong> Invalid Email or Password !</strong>
     
    </Alert>

  );
};


export default ErrorMessage;