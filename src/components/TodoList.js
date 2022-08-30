import React from "react";
import { connect } from "react-redux";
import "../style/body.css";

const TodoList = () => {
  return <div id="todoContainer" className="d-grid"></div>;
};

export default connect()(TodoList);
