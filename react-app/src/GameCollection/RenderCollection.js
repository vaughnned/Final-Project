import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const getUserGames = async () => {
  let response = await fetch(`http://127.0.0.1:8000/collection/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  });
  const data = await response.json();
  console.log(data, "Get Game");

  return data;
};

export const deleteGame = (gameId) => {
  fetch(`http://127.0.0.1:8000/collection/${gameId}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
        return response;
      }
    })
    .catch((error) => {
      console.error("THIS ISNT WORKING", error);
    });
};
