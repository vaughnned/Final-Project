// import Cookies from "js-cookie";

// export const getImage = async (user) => {
//   let response = await fetch(`http://localhost:8000/auth/user/profile/`, {
//     method: "GET",
//     headers: {
//       Authorization: `Token ${user?.token}`,
//       "content-type": "application/json",
//       "X-CSRFToken": Cookies.get("csrftoken"),
//     },
//   });
//   const data = await response.json();
//   return data;
// };
