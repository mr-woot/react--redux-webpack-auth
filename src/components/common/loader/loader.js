import React from "react";
import "./loader.css";

const Loader = props => (
  <div class="spinner">
    <div class="bounce1" />
    <div class="bounce2" />
    <div class="bounce3" />
  </div>
);

// const Loader = props => (
//   <div className="sk-cube-grid">
//     <div className="sk-cube sk-cube1" />
//     <div className="sk-cube sk-cube2" />
//     <div className="sk-cube sk-cube3" />
//     <div className="sk-cube sk-cube4" />
//     <div className="sk-cube sk-cube5" />
//     <div className="sk-cube sk-cube6" />
//     <div className="sk-cube sk-cube7" />
//     <div className="sk-cube sk-cube8" />
//     <div className="sk-cube sk-cube9" />
//   </div>
// );

export default Loader;
