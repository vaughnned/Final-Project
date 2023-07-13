// import React, { useState } from "react";

// function ImageUploadForm() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8000/add-game/", {
//         method: "POST",
//         data: formData,
//       });
//       setUploadMessage("Image uploaded successfully. ");
//       console.log(response.data);
//     } catch {}
//   };
//   return (
//     <div>
//       {/* <form action="" onSubmit={handleSubmit}> */}
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button type="submit">Upload Image</button>
//       {/* </form> */}
//       <p>{uploadMessage}</p>
//     </div>
//   );
// }
// export default ImageUploadForm;
