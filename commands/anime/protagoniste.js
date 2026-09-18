module.exports = {
  name: "protagoniste",

  async execute(args, { sock, message, remoteJid }) {

    if (!args.length) {
      return "🕊️ Utilisation : 🕊️protagoniste [anime/manga/webtoon]";
    }

    const œuvre = args.join(" ");

    return `🎭 Protagoniste de : ${œuvre}

🔎 Recherche en préparation...`;
  }
};