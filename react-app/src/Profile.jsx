// import React, { useState, useEffect } from "react";

// const ProfileComponent = () => {
//   const [title, setTitle] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [state, setState] = useState({
//     title: "",
//     image: null,
//   });

//   // const handleTitleInput = (e) => {
//   //   const { name, value } = e.target;
//   //   setState((prevState) => ({
//   //     ...prevState,
//   //     [name]: value,
//   //   }));
//   // };

//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];
//   //   setState((prevState) => ({
//   //     ...prevState,
//   //     image: file,
//   //   }));
//   // };

//   // if (!selectedFile) {
//   //   setUploadMessage("Select an image to display. ");
//   //   return;
//   // }

//   // const handleImageUpload = (e) => {
//   //   setImage(e.target.value);
//   // };

//   const handleImageSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8000/add-game/", {
//         method: "POST",
//         data: formData,
//       });
//       setUploadMessage("Image uploaded successfully. ");
//       // console.log(response.data);
//     } catch (error) {
//       setUploadMessage("Error uploading image.");
//       console.log(error);
//     }
//   };

//   // const createGame = async (e) => {
//   //   e.preventDefault();
//   //   const formData = new FormData();
//   //   formData.append("image", state.image);
//   //   formData.append("title", state.title);
//   //   console.log(formData);
//   //   await fetch("http://127.0.0.1:8000/add-game/", {
//   //     method: "POST",
//   //     headers: {
//   //       "X-CSRFToken": Cookies.get("csrftoken"),
//   //     },
//   //     body: formData,
//   //   }).then((response) => {
//   //     if (response.status >= 200 && response.status < 300) {
//   //       window.location.reload();
//   //       return response;
//   //     }
//   //   });
//   // };

//   return (
//     <div id="profile-page">
//       <h1>Joe's Profile</h1>
//       <section id="profile-reviews">
//         <div>Review 1</div>
//         <div>Review 2</div>
//       </section>
//       {/* <form onSubmit={createGame}>
//           <input
//             type="text"
//             placeholder="Title... "
//             name="title"
//             onChange={(e) => handleTitleInput(e)}
//           />
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//           <button onClick={handleImageSubmit}>Upload Image</button>
//           <button type="submit">Submit</button>
//           <p>{uploadMessage}</p>
//         </form> */}

//       {/* <img className="collection-image" src={selectedFile} /> */}
//     </div>
//   );
// };

// export default ProfileComponent;
