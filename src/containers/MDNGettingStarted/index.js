import React from "react";
// import './App.css';

function MDNGettingStarted() {
  return <div className="MDN">MDN Getting started with WebGL</div>;
}

export default React.memo(MDNGettingStarted, () => true);
