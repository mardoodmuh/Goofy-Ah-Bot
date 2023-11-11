import { EmbedBuilder, Client, IntentsBitField } from 'discord.js';
import JishoAPI from 'unofficial-jisho-api';

const jisho = new JishoAPI();

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
    var message = msg.content.split(" ");

    if (msg.content.startsWith("!kanji")) {
        var kanji = message[1];
        jisho.searchForKanji(kanji).then(r => {
            jisho.searchForExamples(kanji).then(res => {
                const examples = [];

                var kanjiEmbed = new EmbedBuilder()
                    .setColor(0x1a7e4c)
                    .setTitle("Kanji result for: " + kanji)
                    .setAuthor({ name: 'Kanji Bot', iconURL: client.user.defaultAvatarURL })
                    .setDescription("Kanji taught in " + r.taughtIn + ", JLPT Level: " + r.jlptLevel + "\nStroke count: " + r.strokeCount)
                    .setThumbnail(r.strokeOrderGifUri)
                    .addFields(
                        { name: 'Onyomi', value: r.onyomi.toString(), inline: true },
                        { name: 'Kunyomi', value: r.kunyomi.toString(), inline: true },
                        // { name: 'Radicals', vlaue: r.radical.toString(), inline: true },
                    )
                    .setFooter({ text: "Created by Goofy Ah devs" });
                msg.channel.send({ embeds: [kanjiEmbed] })
            })
        });
    }
})

client.login('MTE3Mjc3MzgyMjI1NzE4ODg5NQ.GakyiL.BllxZygdmQQ6XI3G6z3J6Khqy2j_DHPLyWtz8Q');