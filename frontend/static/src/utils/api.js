// const clientId = import.meta.env.VITE_GAMEATLAS_CLIENT_ID;
const clientId = "4Hi148hUNY";
const atlasUrl = "https://api.boardgameatlas.com/api";

async function atlasFetch(params) {
  return await fetch(`${atlasUrl}/${params}&client_id=${clientId}`, {
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

// export const getGames = async ({ query = "", ids = [] } = {}) => {
//   return fetch("/gameData.json", { cache: "force-cache" })
//     .then((res) => res.json())
//     .then((json) => {
//       return json
//         .filter((g) => g.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
//         .slice(0, 9);
//     });
// };

// export const getGame = async (id) => {
//   return fetch("/gameData.json", { cache: "force-cache" })
//     .then((res) => res.json())
//     .then((json) => {
//       return json.find((g) => g.id === id);
//     });
// };

// function randomStores() {
//   return [
//     "Target",
//     "Amazon",
//     "Card Haus",
//     "Game Nerdz",
//     "Barnes and Noble",
//     "Fun Again Games",
//   ].sort(() => Math.random() - 0.5);
// }

// function randomPrice(price, maxDiscount = 20) {
//   return (price - price * ((Math.random() * maxDiscount) / 100)).toFixed(2);
// }

// export const getPrice = async (id) => {
//   const game = await getGame(id);
//   const stores = randomStores();
//   const prices = [];
//   for (let i = 0; i < 3; i++) {
//     prices.push({
//       name: game.name,
//       store_name: stores.shift(),
//       price_text: `$${randomPrice(Number(game.price))}`,
//     });
//   }

//   return prices;
// };
