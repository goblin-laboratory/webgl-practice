import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./containers/App";
import MDNGettingStarted from "./containers/MDNGettingStarted";
import MDNAdding2DContent from "./containers/MDNAdding2DContent";
import MDNAnimating from "./containers/MDNAnimating";
import RenderVideo from "./containers/RenderVideo";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RenderVideo />} />
        <Route path="/render-video" element={<RenderVideo />} />
        <Route path="/mdn-animating" element={<MDNAnimating />} />
        <Route path="/mdn-adding-2D-content" element={<MDNAdding2DContent />} />
        <Route path="/mdn-getting-started" element={<MDNGettingStarted />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
