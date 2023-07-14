import { useState } from "react";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useLocalStorage from "./Login/UseLocalStorage";
import Cookies from "js-cookie";

export default function Header() {
  let [user, setUser, removeUser] = useLocalStorage("user");
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";

  // function DropDown() {
  //   const [opened, { toggle }] = useDisclosure(false);
  //   const label = opened ? "Close navigation" : "Open navigation";
  // }

  function logout() {
    removeUser();
    Cookies.remove("Authorization");
  }

  // function login() {
  //   setUser({ firstName: "Vaughn", email: "vaughn@nedderman.com" });
  // }
  return (
    <>
      <header id="header">
        {user?.token ? (
          <>
            <a className="pagenav" href="/">
              Home
            </a>
            <a className="pagenav" href="/Collection">
              Collection
            </a>
          </>
        ) : (
          <a className="pagenav" href="/">
            Home
          </a>
        )}

        <nav id="head">
          {user ? (
            <>
              <a href="/friends">Friends</a>
              <a href="/profile">Profile</a>
              <div>
                <a href="#" onClick={logout}>
                  Logout
                </a>
              </div>
            </>
          ) : (
            <div>
              <a href="/login">Login</a>
            </div>
          )}
          <div>
            <Burger
              margin="0"
              color="#FFFFFF"
              opened={opened}
              onClick={toggle}
              aria-label={label}
            />
          </div>
        </nav>
      </header>
    </>
  );
}
