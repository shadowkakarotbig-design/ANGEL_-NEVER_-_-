module.exports = {
  name: "autoreact",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    if (mode !== "on" && mode !== "off") {
      return sock.sendMessage(jid, {
        text: "⚡ Utilisation : 🕊autoreact on\n🕊autoreact off"
      });
    }

    await sock.sendMessage(jid, {
      text: mode === "on"
        ? "⚡ Autoreact activé."
        : "⚡ Autoreact désactivé."
    });
  }
};