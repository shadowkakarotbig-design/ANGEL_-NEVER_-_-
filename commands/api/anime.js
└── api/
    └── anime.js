const https = require("https");

function rechercherAnime(recherche) {
  return new Promise((resolve, reject) => {
    const url =
      "https://api.jikan.moe/v4/anime?q=" +
      encodeURIComponent(recherche) +
      "&limit=5";

    https.get(url, (res) => {
      let data = "";

      res.on("data", chunk => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json.data || []);
        } catch (error) {
          reject(error);
        }
      });

    }).on("error", reject);
  });
}

module.exports = {
  rechercherAnime
};