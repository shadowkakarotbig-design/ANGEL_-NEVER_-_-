const http = require("http");
const pino = require("pino");

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  Browsers
} = require("@whiskeysockets/baileys");

// =====================================================
// 📋 COMMANDES
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

commands.set("tagadmin", require("./commands/moderation/tagadmin"));
commands.set("tagall", require("./commands/moderation/tagall"));

// =====================================================
// ⚙️ EXECUTER UNE COMMANDE
// =====================================================

async function handleCommand(command, args, context) {

  const cmd = commands.get(command);

  if (!cmd) {
    return "❌ Commande inconnue.\n\nTape 🕊️menu pour voir les commandes.";
  }

  if (typeof cmd.execute !== "function") {
    return `❌ La commande "${command}" est mal configurée.`;
  }

  return await cmd.execute(args, context);
}

// =====================================================
// 🌐 SERVEUR RENDER
// =====================================================

const PORT = process.env.PORT || 10000;

http.createServer((req, res) => {

  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8"
  });

  res.end("🕊️ ANGEL NEVER CRY est en ligne !");

}).listen(PORT, "0.0.0.0", () => {

  console.log(`🌐 Serveur Render actif sur le port ${PORT}`);

});

// =====================================================
// 🟢 CONNEXION WHATSAPP
// =====================================================

async function connectToWhatsApp() {

  const {
    state,
    saveCreds
  } = await useMultiFileAuthState("./auth_session");

  const sock = makeWASocket({

    auth: state,

    logger: pino({
      level: "silent"
    }),

    printQRInTerminal: false,

    // Identité canonique pour le pairing
    browser: Browsers.ubuntu("Chrome"),

    connectTimeoutMs: 60000

  });

  // ===================================================
  // 💾 SAUVEGARDE DE LA SESSION
  // ===================================================

  sock.ev.on(
    "creds.update",
    saveCreds
  );

  // ===================================================
  // 📡 ÉTAT DE LA CONNEXION
  // ===================================================

  sock.ev.on(
    "connection.update",
    async (update) => {

      const {
        connection,
        lastDisconnect
      } = update;

      if (connection === "connecting") {

        console.log(
          "🔄 Connexion à WhatsApp..."
        );

      }

      if (connection === "open") {

        console.log("");
        console.log(
          "======================================"
        );
        console.log(
          "✅ ANGEL NEVER CRY EST CONNECTÉ !"
        );
        console.log(
          "======================================"
        );
        console.log("");

        console.log(
          "📋 Commandes chargées :"
        );

        console.log(
          [...commands.keys()].join(", ")
        );

      }

      if (connection === "close") {

        const statusCode =
          lastDisconnect?.error?.output?.statusCode;

        console.log("");
        console.log(
          "⚠️ Connexion WhatsApp fermée."
        );

        console.log(
          "📌 Code :", statusCode || "inconnu"
        );

        if (
          statusCode !== DisconnectReason.loggedOut
        ) {

          console.log(
            "🔄 Reconnexion dans 5 secondes..."
          );

          setTimeout(() => {

            connectToWhatsApp();

          }, 5000);

        } else {

          console.log(
            "❌ Session WhatsApp déconnectée."
          );

          console.log(
            "⚠️ Une nouvelle association sera nécessaire."
          );

        }

      }

    }
  );

  // ===================================================
  // 🔑 ASSOCIATION PAR CODE
  // ===================================================

  if (!state.creds.registered) {

    const phoneNumber =
      process.env.PHONE_NUMBER;

    if (!phoneNumber) {

      console.log(
        "❌ PHONE_NUMBER n'est pas configuré dans Render."
      );

      return;
    }

    // Garder uniquement les chiffres
    const cleanNumber =
      phoneNumber.replace(/\D/g, "");

    if (!cleanNumber) {

      console.log(
        "❌ PHONE_NUMBER est invalide."
      );

      return;
    }

    try {

      console.log("");
      console.log(
        "======================================"
      );
      console.log(
        "🔑 PRÉPARATION DE L'ASSOCIATION"
      );
      console.log(
        "======================================"
      );

      console.log(
        "📱 Numéro utilisé :",
        cleanNumber
      );

      // Laisser la connexion WebSocket s'établir
      await new Promise(
        resolve => setTimeout(resolve, 3000)
      );

      const code =
        await sock.requestPairingCode(
          cleanNumber
        );

      console.log("");
      console.log(
        "======================================"
      );
      console.log(
        "🔑 CODE D'ASSOCIATION WHATSAPP"
      );
      console.log(
        "👉 " + code
      );
      console.log(
        "======================================"
      );
      console.log("");

      console.log(
        "📱 WhatsApp → Paramètres → Appareils connectés"
      );

      console.log(
        "📱 Puis → Connecter un appareil → avec un numéro de téléphone"
      );

      console.log(
        "⏳ Entre le code affiché ci-dessus."
      );

    } catch (error) {

      console.error("");
      console.error(
        "❌ ERREUR D'ASSOCIATION WHATSAPP"
      );

      console.error(
        error
      );

      console.error(
        "Message :",
        error.message
      );

    }

  } else {

    console.log(
      "✅ Session WhatsApp déjà enregistrée."
    );

  }

  // ===================================================
  // 💬 RÉCEPTION DES MESSAGES
  // ===================================================

  sock.ev.on(
    "messages.upsert",
    async ({ messages }) => {

      for (const message of messages) {

        try {

          if (!message.message) {
            continue;
          }

          const remoteJid =
            message.key.remoteJid;

          if (!remoteJid) {
            continue;
          }

          const text =
            message.message.conversation ||
            message.message.extendedTextMessage?.text ||
            "";

          if (!text) {
            continue;
          }

          console.log(
            `📩 Message reçu : ${text}`
          );

          // =================================================
          // 🕊️ DÉTECTION DU PRÉFIXE
          // =================================================

          let content =
            text.trim();

          if (
            content.startsWith("🕊️")
          ) {

            content =
              content