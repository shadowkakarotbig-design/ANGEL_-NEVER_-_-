module.exports = {
  name: "ship",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;

    await sock.sendMessage(jid, {
      text: "💞 Calcul du ship en cours..."
    });
  }
};