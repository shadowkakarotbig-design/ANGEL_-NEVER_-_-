module.exports = {
  name: "protagoniste",
  async execute(sock, msg, args) {
    if (!args.length) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "🕊 Utilisation : 🕊protagoniste [anime/manga/webtoon]"
      });
    }

    const œuvre = args.join(" ");

    await sock.sendMessage(msg.key.remoteJid, {
      text: `🎭 Protagoniste de : ${œuvre}\n\n🔎 Recherche en préparation...`
    });
  }
};