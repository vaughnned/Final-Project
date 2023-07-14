import React from "react";
import Cookies from "js-cookie";

export const AddToCollection = async (
  e,
  { gameId, gameTitle, gameImageUrl }
) => {
  e.preventDefault();
  await fetch("http://127.0.0.1:8000/add-game/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
    body: JSON.stringify({
      game_atlas_id: { gameId },
      title: { gameTitle },
      imageUrl: { gameImageUrl },
    }),
  }).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      window.location.reload();
      return response;
    }
  });
};
