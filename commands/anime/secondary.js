module.exports = {
  name: "secondary",
  async execute(sock, msg, args) {
    if (!args.length) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "🕊 Utilisation : 🕊secondary [anime/manga/webtoon]"
      });
    }

    const œuvre = args.join(" ");

    await sock.sendMessage(msg.key.remoteJid, {
      text: `👥 Personnages secondaires de : ${œuvre}\n\n🔎 Recherche en préparation...`
    });
  }
};