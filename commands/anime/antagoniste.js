module.exports = {
  name: "antagoniste",
  async execute(sock, msg, args) {
    if (!args.length) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "🕊 Utilisation : 🕊antagoniste [anime/manga/webtoon]"
      });
    }

    const œuvre = args.join(" ");

    await sock.sendMessage(msg.key.remoteJid, {
      text: `😈 Antagoniste de : ${œuvre}\n\n🔎 Recherche en préparation...`
    });
  }
};