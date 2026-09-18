module.exports = {
  name: "skip",

  async execute(args, { sock, message, remoteJid }) {
    return "⏭️ Passage à la musique suivante.";
  }
};