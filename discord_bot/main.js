require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

const Constants = require('./constants');

const nearley = require("nearley");
const grammar = require("./cmd.js");

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

client.on("messageCreate", msg => {
    let reply = null;

    let content = msg.content;
    let len = content.length;

    try {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed(content);
        let obj = parser.results[0][0];
        switch (obj.cmd) {
            case "dice":
                reply = Math.ceil(Math.random() * obj.n) + "/" + obj.n;
                break;
            case "hidden_dice":
                let roll = Math.ceil(Math.random() * obj.n);
                if (roll > (obj.n - obj.critical)) {
                    gmUser.send(roll + "/" + obj.n).catch(() => console.log("GM user has DMs closed or has no mutual servers with the bot."));
                    roll = Math.ceil(Math.random() * (obj.skill - obj.critical)) + obj.critical;
                }
                reply = roll + "/" + obj.n;
                break;
            case "description":
                reply = Constants.descriptions[obj.name];
                break;
            case "resource":
                let resource = Constants.resources[obj.code];
                if (resource)
                    msg.author.send(resource);
                break;
            case "names":
                const peuple = Constants.names[obj.race];
                if (peuple !== undefined) {
                    if (peuple.t !== undefined)
                        reply = peuple.t;
                    const sexe = obj.sex;
                    if (sexe !== null) {
                        const names = peuple[sexe];
                        if (names !== undefined) {
                            if (Array.isArray(names)) {
                                reply += getRandomN(obj.n, names, peuple.n);
                            } else if (names.p !== undefined && names.s !== undefined) {
                                reply += getRandomN(obj.n, names.p, names.s);
                            }
                        }
                    } else if (peuple.t !== undefined && peuple.p !== undefined && peuple.s !== undefined) {
                        reply += getRandomN(obj.n, peuple.p, peuple.s);
                    }
                }
                break;
        }
    } catch(error) {
        reply = null;
    }

    if (reply !== null) {
        console.log(content);
        msg.reply(reply);
    }
});

let tok = process.env.TOKEN;

var gmUser;

client.login(tok).then(() => {
        client.users.fetch(process.env.GAME_MASTER_ID)
            .catch(() => null)
            .then(user => {
                if (!user)
                    console.log("GM user not found.");
                gmUser = user;
            });
    });