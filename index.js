const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (e) => {
    console.log(`${e.user.username} is online, Sir!`);
})

client.on('messageCreate', (msg) => {
    if (msg.content == 'ping') {
        msg.reply('pong');
    }
    if (msg.content == 'hello') {
        msg.reply('hey!')
    }
})

client.login('MTE3Mjc3MzgyMjI1NzE4ODg5NQ.G4rnlU.EjTnod8Rzt3etOY9rjv0zFfAoCo-kjjCBaRQ8E');