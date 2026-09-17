module.exports = {
  name: "play",
  async execute(sock, msg, args) {
    if (!args.length) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "🕊 Utilisation : 🕊play [nom de la musique]"
      });
    }

    const music = args.join(" ");

    await sock.sendMessage(msg.key.remoteJid, {
      text: `🎵 Recherche de : ${music}\n\n⏳ Fonction de téléchargement audio en préparation...`
    });
  }
};