import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./containers/App";
import Home from "./containers/Home";
import DrawPoint from "./containers/DrawPoint";
import MultiPoint from "./containers/MultiPoint";
import MultiAttrPoint from "./containers/MultiAttrPoint";
import DrawTriangle from "./containers/DrawTriangle";
import DrawRectangle from "./containers/DrawRectangle";
import MultiRectangle from "./containers/MultiRectangle";
import ThreeHelloWorld from "./containers/ThreeHelloWorld";

import "./index.less";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/three/hello-world" element={<ThreeHelloWorld />} />
          <Route path="/draw-point" element={<DrawPoint />} />
          <Route path="/multi-point" element={<MultiPoint />} />
          <Route path="/multi-attr-point" element={<MultiAttrPoint />} />
          <Route path="/draw-triangle" element={<DrawTriangle />} />
          <Route path="/draw-rectangle" element={<DrawRectangle />} />
          <Route path="/multi-rectangle" element={<MultiRectangle />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
