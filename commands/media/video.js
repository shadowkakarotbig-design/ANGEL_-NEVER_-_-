module.exports = {
  name: "video",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;

    if (!args.length) {
      return sock.sendMessage(jid, {
        text: "🎬 Utilisation : 🕊video [recherche]"
      });
    }

    const recherche = args.join(" ");

    await sock.sendMessage(jid, {
      text: `🎬 Recherche de vidéo : ${recherche}\n\n🔎 Fonction de recherche en préparation...`
    });
  }
};