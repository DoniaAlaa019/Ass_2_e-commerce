import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <>
        <div className="head-loading">
          <i
            className="fa-solid fa-spinner fa-5x loader"
            style={{ color: "#fff" }}
          ></i>
        </div>
    </>
  );
};

export default Loading;
