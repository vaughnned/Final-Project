import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const getUserGames = async () => {
  let response = await fetch(`/collection/`, {
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
