const atlasUrl = "https://api.boardgameatlas.com/api";

async function atlasFetch(params) {
  return await fetch(`${atlasUrl}/${params}&client_id=4Hi148hUNY`, {
    cache: "force-cache",
  }).then((res) => res.json());
}

export const getGames = async ({ query = "", ids = [] } = {}) => {
  return atlasFetch(
    `search?name=${query}&ids=${ids.join(",")}&fuzzy_match=true&limit=9`
  ).then((json) => json.games);
};

export const getGame = async (id) => {
  return atlasFetch(`search?ids=${id}`).then(
    (json) => json?.games?.shift() ?? null
  );
};

export const getPrice = async (id) => {
  return atlasFetch(`game/prices?game_id=${id}`).then(
    (json) => json?.gameWithPrices?.us
  );
};
