module.exports = {

  async execute(args, { sock, remoteJid }) {

    if (!remoteJid.endsWith("@g.us")) {
      return "❌ Cette commande fonctionne uniquement dans les groupes.";
    }

    const metadata = await sock.groupMetadata(remoteJid);

    const admins = metadata.participants.filter(
      participant =>
        participant.admin === "admin" ||
        participant.admin === "superadmin"
    );

    if (admins.length === 0) {
      return "❌ Aucun administrateur trouvé.";
    }

    const mentions = admins.map(
      participant => participant.id
    );

    let text = "👑 ANGEL NEVER CRY\n\n";
    text += "📢 Administrateurs du groupe\n\n";

    for (const admin of admins) {
      text += `@${admin.id.split("@")[0]} `;
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