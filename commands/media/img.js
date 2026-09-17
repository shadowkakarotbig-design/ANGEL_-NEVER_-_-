module.exports = {
  name: "img",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;

    if (!args.length) {
      return sock.sendMessage(jid, {
        text: "🖼️ Utilisation : 🕊img [recherche]"
      });
    }

    const recherche = args.join(" ");

    await sock.sendMessage(jid, {
      text: `🖼️ Recherche d'image : ${recherche}\n\n🔎 Fonction de recherche en préparation...`
    });
  }
};