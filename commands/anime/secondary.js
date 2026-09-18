module.exports = {
  name: "secondary",

  async execute(args, { sock, message, remoteJid }) {

    if (!args.length) {
      return "🕊️ Utilisation : 🕊️secondary [anime/manga/webtoon]";
    }

    const œuvre = args.join(" ");

    return `⭐ Personnage secondaire de : ${œuvre}

🔎 Recherche en préparation...`;
  }
};