🕊️━module.exports = {
  async execute(args, { sock, remoteJid }) {

    const menu = `
╔════════════════════════════╗
        🕊️ ANGEL NEVER CRY
╚════════════════════════════╝

          🪽 MENU PRINCIPAL 🪽

╭──────〔 🕊️ INFO 〕──────╮
│ • 🕊menu                │
╰─────────────────────────╯

╭─────〔 🎵 MUSIQUE 〕─────╮
│ • 🕊play                │
│ • 🕊stop                │
│ • 🕊skip                │
╰─────────────────────────╯

╭──────〔 🎌 ANIME 〕──────╮
│ • 🕊protagoniste        │
│ • 🕊antagoniste         │
│ • 🕊secondary           │
╰─────────────────────────╯

╭───────〔 ❤️ FUN 〕───────╮
│ • 🕊ship                │
│ • 🕊couple              │
│ • 🕊aura                │
│ • 🕊dad                 │
│ • 🕊mom                 │
╰─────────────────────────╯

╭──────〔 🖼️ MEDIA 〕──────╮
│ • 🕊img                 │
│ • 🕊video               │
╰─────────────────────────╯

╭───〔 🛡️ MODÉRATION 〕───╮
│ • 🕊mute                │
│ • 🕊unmute              │
│ • 🕊antilink            │
│ • 🕊antibot             │
│ • 🕊autoreact           │
╰─────────────────────────╯

╭──────〔 👑 GROUPE 〕─────╮
│ • 🕊tagadmin            │
│ • 🕊tagall              │
╰─────────────────────────╯

╔════════════════════════════╗
       🕊️ THAT'S LA PEACE
╚════════════════════════════╝
`;

    await sock.sendMessage(remoteJid, {
      text: menu
    });

    return null;
  }
};