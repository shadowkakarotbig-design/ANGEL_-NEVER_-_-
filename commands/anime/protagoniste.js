module.exports = {
  name: "protagoniste",

  async execute(args) {
    if (!args.length) {
      return "🕊️ Utilisation : 🕊️protagoniste [anime]";
    }

    const anime = args.join(" ");

    return `🎭 PROTAGONISTE

🎌 Anime : ${anime}

🔎 Recherche en préparation...`;
  }
};