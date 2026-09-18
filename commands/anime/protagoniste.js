const { rechercherAnime } = require("../api/anime");

module.exports = {
  name: "protagoniste",

  async execute(args) {
    if (!args.length) {
      return "🕊️ Utilisation : 🕊️protagoniste [anime]";
    }

    const recherche = args.join(" ");

    try {
      const resultats = await rechercherAnime(recherche);

      if (!resultats.length) {
        return `❌ Aucun anime trouvé pour : ${recherche}`;
      }

      const anime = resultats[0];

      const titre =
        anime.title.english ||
        anime.title.romaji ||
        recherche;

      return `🎭 PROTAGONISTE

🎌 Anime : ${titre}

🔎 Recherche effectuée avec AniList.

ℹ️ Cette API fournit les informations sur l'œuvre.`;
    } catch (error) {
      console.error("❌ Erreur AniList :", error);
      return "❌ Impossible de contacter l'API AniList actuellement.";
    }
  }
};