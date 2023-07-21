import useLocalStorage from "./utils/useLocalStorage";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import navImg from "./images/favicon.ico";

export default function Header() {
  let [user, setUser, removeUser] = useLocalStorage("user");
  const navigate = useNavigate();
  const cookie = Cookies.get("Authorization");

  const handleError = (err) => {
    console.log(err);
  };

  async function logout() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Oops! Something went wrong");
    } else {
      const data = await response.json();
      Cookies.remove("Authorization", `Token${" "}${data.key}`);
      removeUser();

      navigate("/");
    }
  }

  return (
    <>
      <header id="header">
        <a className="pagenav" href="/">
          <img className="site-logo" src={navImg} alt="" />
          <h1 className="header-title">Game Knight</h1>
        </a>
        <nav id="head">
          {cookie ? (
            <>
              <a href="/Collection">Armory</a>
              <p>|</p>
              <a href="/friends">Companions</a>
              <p>|</p>
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
