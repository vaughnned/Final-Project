export const getGames = async ({ query = "", ids = [] } = {}) => {
  console.log({ query });
  console.log({ ids });
  try {
    // make an object such as INITIAL_DATA (my own personal json file) and copy over the fetch results
    let response = await fetch(
      `https://api.boardgameatlas.com/api/search?&name=${query}&ids=${ids.join(
        ","
      )}&fuzzy_match=true&limit=9&client_id=4Hi148hUNY`
    );
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData.games;
  } catch (error) {
    console.error(error);
  }
};
