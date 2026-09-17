module.exports = {
  name: "antibot",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    if (mode !== "on" && mode !== "off") {
      return sock.sendMessage(jid, {
        text: "🤖 Utilisation : 🕊antibot on\n🕊antibot off"
      });
    }

    await sock.sendMessage(jid, {
      text: mode === "on"
        ? "🛡️ Antibot activé."
        : "🛡️ Antibot désactivé."
    });
  }
};