module.exports = {
  name: "mute",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;

    await sock.sendMessage(jid, {
      text: "🔇 Mode mute demandé.\n⚠️ La fonction de restriction du groupe sera ajoutée dans la prochaine étape."
    });
  }
};