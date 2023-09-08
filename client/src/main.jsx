import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";

// import customFetch from "./utils/customFetch.js";
// // Axios is a popular JavaScript library that simplifies the process of making HTTP requests from web browser
// const resp = await customFetch.get("/test");
// console.log(resp);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-center" />
  </React.StrictMode>
);

// testing the route
// axios method is used replacement for fetch and then methods
// testing proxy setup, after go to vite configure js and setup server proxy for backend and include the localhost api
// fetch("/api/v1/test").then((res) =>
//   res.json().then((data) => console.log(data))
// );
