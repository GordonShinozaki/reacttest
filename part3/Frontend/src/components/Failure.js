import React from "react";

const Failure = ({ message }) => {
  const failurestyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    border: "5px solid red",
    padding: 10,
    marginbottom: 10,
  };
  if (message == null || message === "") {
    return null;
  } else {
    return <div style={failurestyle}>{message}</div>;
  }
};

export default Failure;
