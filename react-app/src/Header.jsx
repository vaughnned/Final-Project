import { useState } from "react";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Header() {
  let [user, setUser] = useState("");
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";

  // function DropDown() {
  //   const [opened, { toggle }] = useDisclosure(false);
  //   const label = opened ? "Close navigation" : "Open navigation";
  // }

  function logout() {
    setUser(null);
  }

  function login() {
    setUser({ firstName: "Vaughn", email: "vaughn@nedderman.com" });
  }
  return (
    <>
      <header id="header">
        {user ? (
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
              <div>Friends</div>
              <div>Profile</div>
              <div>
                <a href="#" onClick={logout}>
                  Logout
                </a>
              </div>
            </>
          ) : (
            <div>
              <a href="#" onClick={login}>
                Login
              </a>
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
