module.exports = {
  name: "stop",
  async execute(sock, msg) {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "⏹️ Lecture arrêtée."
    });
  }
};