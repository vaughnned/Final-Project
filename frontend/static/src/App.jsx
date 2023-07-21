import React, { useEffect } from "react";
import "./styles/index.css";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home.jsx";
import CollectionPage from "./GameCollection/MyCollection.jsx";
import Login from "./Login/Login";
import GameDetail from "./GameDetail";
import Protected from "./Login/Protected";
import FriendsList from "./Friends";
import Register from "./Login/Register";
import Header from "./Header";
import FriendCollection from "./GameCollection/FriendCollection.jsx";
import icon from "./images/favicon.ico";

function App() {
  const cookie = Cookies.get("Authorization");

  useEffect(() => {
    const favicon = document.getElementById("favicon");
    favicon.setAttribute("href", icon);
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/Collection"
            element={
              <Protected isLoggedIn={cookie}>
                <CollectionPage />
              </Protected>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/Detail/:gameId" element={<GameDetail />} />
          <Route
            path="/Friends"
            element={
              <Protected isLoggedIn={cookie}>
                <FriendsList />
              </Protected>
            }
          />
          <Route
            path="/friend-collection/:id"
            element={
              <Protected isLoggedIn={cookie}>
                <FriendCollection />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
