import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CollectionPage from "./collection.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route />
        <Route path="/Collection" element={<CollectionPage />} />
      </Routes>
    </BrowserRouter>
    <App />
    {/* <Collection /> */}
  </React.StrictMode>
);
