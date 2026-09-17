module.exports = {
  name: "aura",
  async execute(sock, msg) {
    const aura = Math.floor(Math.random() * 101);
    const jid = msg.key.remoteJid;

    await sock.sendMessage(jid, {
      text: `⚡ Ton niveau d'aura est de : ${aura}%`
    });
  }
};