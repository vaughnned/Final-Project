import React from "react";
import "./App.css";
import Header from "./Header";

function CollectionPage() {
  // make a useEffect and redirect if user isnt logged in
  return (
    <>
      <Header />

      <h1>MY COLLECTION</h1>
      <button id="sort-button">Sort By</button>
      <section className="collection-list">
        {/* map through database to display the user's game collection  */}
        <div className="collection-game">
          <h2 className="collection-title">Title Here</h2>
          <div className="collection-image">Image Here</div>
        </div>
        <div className="collection-game">
          <h2 className="collection-title">Title Here</h2>
          <div className="collection-image">Image Here</div>
        </div>
        <div className="collection-game">
          <h2 className="collection-title">Title Here</h2>
          <div className="collection-image">Image Here</div>
        </div>
        <div className="collection-game">
          <h2 className="collection-title">Title Here</h2>
          <div className="collection-image">Image Here</div>
        </div>
        <div className="collection-game">
          <h2 className="collection-title">Title Here</h2>
          <div className="collection-image">Image Here</div>
        </div>
        <div className="collection-game">
          <h2 className="collection-title">Title Here</h2>
          <div className="collection-image">Image Here</div>
        </div>
        <div className="collection-game">
          <h2 className="collection-title">Title Here</h2>
          <div className="collection-image">Image Here</div>
        </div>
      </section>
    </>
  );
}

export default CollectionPage;
