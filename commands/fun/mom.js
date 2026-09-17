module.exports = {
  name: "mom",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;

    await sock.sendMessage(jid, {
      text: "👩 La maman du groupe veille sur vous 😂"
    });
  }
};