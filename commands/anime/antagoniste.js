module.exports = {
  name: "antagoniste",

  async execute(args, { sock, message, remoteJid }) {

    if (!args.length) {
      return "🕊️ Utilisation : 🕊️antagoniste [anime/manga/webtoon]";
    }

    const œuvre = args.join(" ");

    return `☠️ Antagoniste de : ${œuvre}

🔎 Recherche en préparation...`;
  }
};