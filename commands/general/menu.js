module.exports = {

  async execute(args, { sock, remoteJid }) {

    const menu = `
╭━━━〔 🪽 𝐀𝐍𝐆𝐄𝐋 𝐍𝐄𝐕𝐄𝐑 𝐂𝐑𝐘 〕━━━╮

        ✦ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄𝐒 ✦

╭─〔 🕊️ 𝐆𝐄́𝐍𝐄́𝐑𝐀𝐋 〕
│
│ 🕊️menu
│
╰────────────────────

╭─〔 🎵 𝐌𝐔𝐒𝐈𝐐𝐔𝐄 〕
│
│ 🎧play
│ ⏹️stop
│ ⏭️skip
│
╰────────────────────

╭─〔 🎌 𝐀𝐍𝐈𝐌𝐄 〕
│
│ ⚔️protagoniste
│ ☠️antagoniste
│ ⭐secondary
│
╰────────────────────

╭─〔 💫 𝐅𝐔𝐍 〕
│
│ ❤️ship
│ 💞couple
│ 🔥aura
│ 👨dad
│ 👩mom
│
╰────────────────────

╭─〔 🖼️ 𝐌𝐄𝐃𝐈𝐀 〕
│
│ 🖼️img
│ 🎬video
│
╰────────────────────

╭─〔 🛡️ 𝐌𝐎𝐃𝐄́𝐑𝐀𝐓𝐈𝐎𝐍 〕
│
│ 🔇mute
│ 🔊unmute
│ 🔗antilink
│ 🤖antibot
│ ⚡autoreact
│
╰────────────────────

╭─〔 👑 𝐆𝐑𝐎𝐔𝐏𝐄 〕
│
│ 👑tagadmin
│ 📢tagall
│
╰────────────────────

╰━━━〔 🕊️ 𝐓𝐇𝐀𝐓'𝐒 𝐋𝐀 𝐏𝐄𝐀𝐂𝐄 〕━━━╯
`;

    await sock.sendMessage(
      remoteJid,
      {
        text: menu
      }
    );

    return null;
  }

};