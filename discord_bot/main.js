require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

const Constants = require('./constants');

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function getRandomN(n, l1, l2 = null) {
    let text = "";

    let size1 = l1.length;
    let size2 = l2 !== null ? l2.length : null;
    for (let i = 0; i < n; i++) {
        if (l2 === null)
            text += "\n" + l1[Math.trunc(Math.random() * l1.length)];
        else
            text += "\n" + l1[Math.trunc(Math.random() * l1.length)] + " " + l2[Math.trunc(Math.random() * l2.length)];
    }

    return text;
}

const N = 5;

client.on("messageCreate", msg => {
    let reply = null;

    let content = msg.content;
    let len = content.length;

    if (content[0] === "n" && len > 1) {
        const peuple = Constants.noms[content[1]];
        if (peuple !== undefined) {
            if (peuple.t !== undefined)
                reply = peuple.t;
            if (content.length == 3) {
                const sexe = peuple[content[2]];
                if (sexe !== undefined) {
                    if (Array.isArray(sexe)) {
                        reply += getRandomN(N, sexe, peuple.n);
                    } else if (sexe.p !== undefined && sexe.s !== undefined) {
                        reply += getRandomN(N, sexe.p, sexe.s);
                    }
                }
            } else if (content.length == 2 && peuple.t !== undefined && peuple.p !== undefined && peuple.s !== undefined) {
                reply += getRandomN(N, peuple.p, peuple.s);
            }
        }
    } else if (content[0] === "d") {
        let n = parseInt(content.substring(1), 10);
        if (n !== NaN) {
            if (n === 1)
                n = 100;
            reply = Math.ceil(Math.random() * n) + "/" + n;
        }
    }

    if (reply !== null)
        msg.reply(reply);
});

let tok = process.env.TOKEN

client.login(tok)