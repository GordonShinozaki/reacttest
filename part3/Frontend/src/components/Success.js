import React from "react";

const Success = ({ message }) => {
  const successstyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    border: "5px solid green",
    padding: 10,
    marginbottom: 10,
  };
  if (message == null || message === "") {
    return null;
  } else {
    return <div style={successstyle}>{message}</div>;
  }
};

export default Success;
