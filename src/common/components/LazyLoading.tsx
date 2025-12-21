import React from "react";
import "./LazyLoading.style.css";
import { ScaleLoader } from "react-spinners";

const LazyLoading = () => {
  return (
    <div className="loading-wrapper">
      <h3 className="loading-font">Wait a minutes</h3>
      <div className="loading-spinner">
        <ScaleLoader color="#1DB954" />
      </div>
    </div>
  );
};

export default LazyLoading;
