module.exports = {
  name: "skip",
  async execute(sock, msg) {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "⏭️ Passage à la musique suivante..."
    });
  }
};