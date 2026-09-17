module.exports = {

  async execute(args, { sock, remoteJid }) {

    await sock.sendMessage(remoteJid, {
      image: { url: "./media/menu.jpg" },
      caption: `🕊️━━━━━━━━━━━━━━━━━━🕊️
        ANGEL NEVER CRY
🕊️━━━━━━━━━━━━━━━━━━🕊️

👑 MENU PRINCIPAL

🕊️ 🕊️ 🕊️

📌 COMMANDES GÉNÉRALES
🕊️menu
🕊️play
🕊️stop
🕊️skip

🎭 ANIME
🕊️protagoniste
🕊️antagoniste
🕊️secondary

❤️ FUN
🕊️ship
🕊️couple
🕊️aura
🕊️dad
🕊️mom

🖼️ MÉDIA
🕊️img
🕊️video

🛡️ MODÉRATION
🕊️mute
🕊️unmute
🕊️antilink
🕊️antibot
🕊️autoreact
🕊️tagadmin
🕊️tagall

🕊️━━━━━━━━━━━━━━━━━━🕊️
       ANGEL NEVER CRY
🕊️━━━━━━━━━━━━━━━━━━🕊️`
    });

    return null;
  }

};