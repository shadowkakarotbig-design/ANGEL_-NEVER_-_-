const youtubedl = require("youtube-dl-exec");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "play",

  async execute(args, { sock, remoteJid }) {

    if (!args.length) {
      return "🎵 Utilisation : 🕊️play [titre de la musique]";
    }

    const recherche = args.join(" ");

    await sock.sendMessage(remoteJid, {
      text: `🔎 Recherche de : ${recherche}\n\n⏳ Un instant...`
    });

    const dossier = path.join("/tmp", "angel-never-cry");

    if (!fs.existsSync(dossier)) {
      fs.mkdirSync(dossier, { recursive: true });
    }

    const fichier = path.join(
      dossier,
      `${Date.now()}.mp3`
    );

    try {

      await youtubedl(
        `ytsearch1:${recherche}`,
        {
          extractAudio: true,
          audioFormat: "mp3",
          audioQuality: "5",
          output: fichier,
          noPlaylist: true,
          noWarnings: true,
          quiet: true
        }
      );

      if (!fs.existsSync(fichier)) {
        return "❌ La musique n'a pas pu être téléchargée.";
      }

      await sock.sendMessage(remoteJid, {
        audio: {
          url: fichier
        },
        mimetype: "audio/mpeg",
        ptt: false
      });

      fs.unlinkSync(fichier);

      return null;

    } catch (error) {

      console.error("❌ Erreur PLAY :", error);

      if (fs.existsSync(fichier)) {
        fs.unlinkSync(fichier);
      }

      return "❌ Impossible de récupérer cette musique.";
    }
  }
};