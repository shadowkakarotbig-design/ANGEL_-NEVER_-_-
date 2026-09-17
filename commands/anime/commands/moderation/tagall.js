module.exports = {

  async execute(args, { sock, remoteJid }) {

    if (!remoteJid.endsWith("@g.us")) {
      return "❌ Cette commande fonctionne uniquement dans les groupes.";
    }

    const metadata = await sock.groupMetadata(remoteJid);

    const participants = metadata.participants;

    const mentions = participants.map(
      participant => participant.id
    );

    let text = "🕊️ ANGEL NEVER CRY\n\n";
    text += "📢 Mention de tous les membres\n\n";

    for (const participant of participants) {
      text += `@${participant.id.split("@")[0]} `;
    }

    await sock.sendMessage(
      remoteJid,
      {
        text,
        mentions
      }
    );

    return null;
  }

};