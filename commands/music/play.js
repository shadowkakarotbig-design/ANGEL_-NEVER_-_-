module.exports = {
  name: "play",

  async execute(args) {
    if (!args.length) {
      return "🎵 Utilisation : 🕊️play [titre de la musique]";
    }

    return `🔎 Recherche musicale : ${args.join(" ")}

⏳ La recherche musicale sera connectée prochainement.`;
  }
};