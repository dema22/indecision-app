import React from "react";
import ReactDOM from "react-dom";

// Importing my Parent Component
import IndecisionApp from "./components/IndecisionApp";

// Importing reset and my css
import "normalize.css/normalize.css";
import "./styles/styles.scss";

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));


