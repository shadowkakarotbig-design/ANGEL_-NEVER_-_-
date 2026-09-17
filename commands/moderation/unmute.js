module.exports = {
  name: "unmute",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;

    await sock.sendMessage(jid, {
      text: "🔊 Mode mute désactivé."
    });
  }
};