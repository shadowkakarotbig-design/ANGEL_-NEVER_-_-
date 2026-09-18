module.exports = {
  name: "stop",

  async execute(args, { sock, message, remoteJid }) {
    return "⏹️ Lecture arrêtée.";
  }
};