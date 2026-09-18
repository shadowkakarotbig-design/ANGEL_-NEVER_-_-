const https = require("https");

function rechercherAnime(recherche) {
  return new Promise((resolve, reject) => {

    const query = `
      query ($search: String) {
        Page(perPage: 5) {
          media(search: $search, type: ANIME) {
            id
            title {
              romaji
              english
            }
            description
            episodes
            status
            averageScore
            characters(sort: ROLE, perPage: 5) {
              edges {
                role
                node {
                  name {
                    full
                  }
                }
              }
            }
          }
        }
      }
    `;

    const body = JSON.stringify({
      query,
      variables: {
        search: recherche
      }
    });

    const options = {
      hostname: "graphql.anilist.co",
      path: "/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {

        if (res.statusCode !== 200) {
          return reject(
            new Error(`AniList erreur HTTP ${res.statusCode}`)
          );
        }

        try {
          const json = JSON.parse(data);

          if (json.errors) {
            return reject(
              new Error("AniList a retourné une erreur.")
            );
          }

          resolve(json.data?.Page?.media || []);

        } catch (error) {
          reject(error);
        }

      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
}

module.exports = {
  rechercherAnime
};