module.exports = {
  name: "antilink",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    if (mode !== "on" && mode !== "off") {
      return sock.sendMessage(jid, {
        text: "🛡️ Utilisation : 🕊antilink on\n🕊antilink off"
      });
    }

    await sock.sendMessage(jid, {
      text: mode === "on"
        ? "🛡️ Antilink activé."
        : "🛡️ Antilink désactivé."
    });
  }
};