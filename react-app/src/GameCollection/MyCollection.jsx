import React from "react";
import "../styles/App.css";
import Header from "../Header";
import RenderCollection from "./RenderCollection";

function CollectionPage() {
  // make a useEffect and redirect if user isnt logged in
  return (
    <>
      <Header />

      <h1>MY COLLECTION</h1>
      <button id="sort-button">Sort By</button>
      <section className="collection-list">
        {/* map through database to display the user's game collection  */}
        <RenderCollection />
      </section>
    </>
  );
}

export default CollectionPage;
