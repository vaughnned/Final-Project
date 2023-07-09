import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import CollectionPage from "./MyCollection.jsx";
import HandleLogin from "./Login";
import GameDetail from "./GameDetail";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Collection" element={<CollectionPage />} />
        <Route path="/Login" element={<HandleLogin />} />
        <Route path="/Detail/:gameId" element={<GameDetail />} />
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
    {/* <Collection /> */}
  </React.StrictMode>
);
