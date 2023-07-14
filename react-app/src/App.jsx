import React, { useState, useEffect } from "react";
import "./styles/index.css";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import CollectionPage from "./GameCollection/MyCollection.jsx";
import HandleLogin from "./Login/Login";
import GameDetail from "./GameDetail";
import ProfileComponent from "./Profile";
import Protected from "./Login/Protected";
import FriendsList from "./Friends";

function App() {
  const cookie = Cookies.get("Authorization");
  console.log(cookie);

  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* define a secure route */}
        <Route path="/" element={<Home />} />
        <Route
          path="/Collection"
          element={
            <Protected isLoggedIn={cookie}>
              <CollectionPage />
            </Protected>
          }
        />
        <Route path="/Login" element={<HandleLogin />} />
        <Route path="/Detail/:gameId" element={<GameDetail />} />
        <Route
          path="/Profile"
          element={
            <Protected isLoggedIn={cookie}>
              <ProfileComponent />
            </Protected>
          }
        />
        <Route
          path="/Friends"
          element={
            <Protected isLoggedIn={cookie}>
              <FriendsList />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
