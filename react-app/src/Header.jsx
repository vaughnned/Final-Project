import useLocalStorage from "./utils/useLocalStorage";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let [user, setUser, removeUser] = useLocalStorage("user");
  const navigate = useNavigate();

  function logout() {
    removeUser();
    Cookies.remove("Authorization");
    navigate("#");
  }

  return (
    <>
      <header id="header">
        <a className="pagenav" href="/">
          {/* <img src="/images/GameKnight.jpeg" alt="" /> */}
        </a>
        <nav id="head">
          {user ? (
            <>
              <a href="/Collection">Armory</a>
              <a href="/friends">Friends</a>
              {/* <a href="/profile">Profile</a> */}
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
        </nav>
      </header>
    </>
  );
}
