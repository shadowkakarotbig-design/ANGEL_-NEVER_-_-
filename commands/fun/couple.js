module.exports = {
  name: "couple",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;

    await sock.sendMessage(jid, {
      text: "💕 Couple du jour : calcul en cours..."
    });
  }
};