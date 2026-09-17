const http = require("http");
const pino = require("pino");

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");


// =====================================================
// COMMANDES
// =====================================================

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


// =====================================================
// GESTION DES COMMANDES
// =====================================================

async function handleCommand(command, args) {
  const cmd = commands.get(command);

  if (!cmd) {
    return "❌ Commande inconnue. Utilise 🕊menu";
  }

  return await cmd.execute(args);
}


// =====================================================
// SERVEUR HTTP POUR RENDER
// =====================================================

const PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8"
  });

  res.end("🕊️ ANGEL NEVER CRY est en ligne !");
}).listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Serveur actif sur le port ${PORT}`);
});


// =====================================================
// CONNEXION WHATSAPP
// =====================================================

async function connectToWhatsApp() {
  const { state, saveCreds } =
    await useMultiFileAuthState("./auth_session");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" })
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const {
      connection,
      lastDisconnect
    } = update;

    if (connection === "open") {
      console.log("✅ ANGEL NEVER CRY est connecté à WhatsApp !");
    }

    if (connection === "close") {
      const statusCode =
        lastDisconnect?.error?.output?.statusCode;

      if (statusCode !== DisconnectReason.loggedOut) {
        console.log("🔄 Connexion WhatsApp perdue. Reconnexion...");
        connectToWhatsApp();
      } else {
        console.log("❌ Session WhatsApp déconnectée.");
      }
    }
  });


  // ===================================================
  // CODE DE CONNEXION WHATSAPP
  // ===================================================

  if (!state.creds.registered) {
    const phoneNumber = process.env.PHONE_NUMBER;

    if (!phoneNumber) {
      console.log(
        "⚠️ PHONE_NUMBER n'est pas encore configuré dans Render."
      );
      return;
    }

    try {
      const code = await sock.requestPairingCode(phoneNumber);

      console.log("");
      console.log("======================================");
      console.log("🔑 CODE DE CONNEXION WHATSAPP");
      console.log(code);
      console.log("======================================");
      console.log("");
    } catch (error) {
      console.error(
        "❌ Impossible de générer le code WhatsApp :",
        error
      );
    }
  }


  // ===================================================
  // RÉCEPTION DES MESSAGES
  // ===================================================

  sock.ev.on("messages.upsert", async ({ messages }) => {
    for (const message of messages) {
      try {
        if (!message.message) continue;
        if (message.key.fromMe) continue;

        const remoteJid = message.key.remoteJid;

        const text =
          message.message.conversation ||
          message.message.extendedTextMessage?.text ||
          "";

        if (!text) continue;

        console.log(`📩 Message reçu : ${text}`);

        if (!text.startsWith("🕊")) continue;

        const content = text.slice(2).trim();

        if (!content) continue;

        const parts = content.split(/\s+/);

        const command = parts.shift().toLowerCase();

        const args = parts;

        const result = await handleCommand(command, args);

        if (result !== undefined && result !== null) {
          await sock.sendMessage(remoteJid, {
            text: String(result)
          });
        }

      } catch (error) {
        console.error(
          "❌ Erreur lors du traitement du message :",
          error
        );
      }
    }
  });
}


// =====================================================
// DÉMARRAGE
// =====================================================

console.log("🕊️ ANGEL NEVER CRY démarre...");
console.log("✅ Commandes chargées :", commands.size);

connectToWhatsApp().catch((error) => {
  console.error(
    "❌ Erreur au démarrage de WhatsApp :",
    error
  );
});