import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import MapChart from "./MapChart";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <MapChart />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter basename="/commst-434">
    <App />
  </BrowserRouter>, rootElement);
