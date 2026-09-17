const commands = new Map();

commands.set("menu", require("./commands/general/menu"));
commands.set("play", require("./commands/music/play"));
commands.set("stop", require("./commands/music/stop"));
commands.set("skip", require("./commands/music/skip"));

commands.set("protagoniste", require("./commands/anime/protagoniste"));
commands.set("antagoniste", require("./commands/anime/antagoniste"));
commands.set("secondary", require("./commands/anime/secondary"));

commands.set("ship", require("./commands/fun/ship"));
commands.set("couple", require("./commands/fun/couple"));
commands.set("aura", require("./commands/fun/aura"));
commands.set("dad", require("./commands/fun/dad"));
commands.set("mom", require("./commands/fun/mom"));

commands.set("img", require("./commands/media/img"));
commands.set("video", require("./commands/media/video"));

commands.set("mute", require("./commands/moderation/mute"));
commands.set("unmute", require("./commands/moderation/unmute"));
commands.set("antilink", require("./commands/moderation/antilink"));
commands.set("antibot", require("./commands/moderation/antibot"));
commands.set("autoreact", require("./commands/moderation/autoreact"));

function handleCommand(command, args) {
  const cmd = commands.get(command);

  if (!cmd) {
    return "❌ Commande inconnue. Utilise 🕊menu";
  }

  return cmd.execute(args);
}

console.log("🕊 ANGEL NEVER CRY démarre...");
console.log("✅ Commandes chargées :", commands.size);
