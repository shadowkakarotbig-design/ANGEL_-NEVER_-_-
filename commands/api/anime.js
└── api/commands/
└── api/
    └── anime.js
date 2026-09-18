const https = require("https");

function rechercherAnime(recherche) {
  return new Promise((resolve, reject) => {
    const url =
      "https://api.jikan.moe/v4/anime?q=" +
      encodeURIComponent(recherche) +
      "&limit=5";

    https.get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode !== 200) {
          return reject(
            new Error(`API Jikan : erreur HTTP ${res.statusCode}`)
          );
        }

        try {
          const json = JSON.parse(data);
          resolve(json.data || []);
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = {
  rechercherAnime
};