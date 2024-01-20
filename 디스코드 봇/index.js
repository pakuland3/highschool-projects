const { Client, Intents, Collection } = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');
const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const client = new Client({intents:32767}); //32767 모든 권한
const { DiscordTogether } = require('discord-together');
const mongoose = require('mongoose');
module.exports = client;

mongoose.connect("your mongoose url",{    
}).then(console.log("DB successfully connected"));

client.discordTogether = new DiscordTogether(client);

client.once('ready', async () => {
    console.log('Ready!');
    client.user.setActivity("범이야 도움말",{
        type:"PLAYING"
    })
    const Schema_stock = require("./models/주식")
    const stockInfo = await Schema_stock.findOne({
        stock: "391839729830"
    })    
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const interval = {
        // tick: 0,
        _interval: undefined,
        start: function () {
            this._interval = setInterval(this.callback.bind(this), 180000);
        },
        callback: async function () {
            // this.tick += 1;
            // console.log(this.tick);
            // if (this.tick >= 3) clearInterval(this._interval);
            let randSeoul = getRandom(0, 20)
            let randEungae = getRandom(0, 20)
            let randSeondo = getRandom(0, 20)
            let randGukcci = getRandom(0, 20)
            let seoulJjVar =  getRandom(-1 * randSeoul, randSeoul) //서울
            let eungaeFdVar =  getRandom(-1 * randEungae, randEungae) //응애
            let seondoCfVar =  getRandom(-1 * randSeondo, randSeondo) //선도
            let gukcciVar =  getRandom(-1 * randGukcci, randGukcci) //국찌
            let seoulJjTotal = new Array //변경 값들
            let eungaeFdTotal = new Array
            let gukcciTotal = new Array
            let seondoCfTotal = new Array
            let i = Number
            await Schema_stock.findOneAndUpdate({ stock: "391839729830" }, {
                $set:{
                    seoulJj: stockInfo.seoulJj + seoulJjVar,
                    eungaeFd: stockInfo.eungaeFd + eungaeFdVar,
                    gukcci: stockInfo.gukcci + gukcciVar,
                    seondoCf: stockInfo.seondoCf + seondoCfVar,
                    stock: "391839729830",
                    seoulJjVar: seoulJjVar,
                    eungaeFdVar: eungaeFdVar,
                    gukcciVar: gukcciVar,
                    seondoCfVar: seondoCfVar
                }
            })
            if(stockInfo.seoulJj < 100){
                stockInfo.seoulJj = stockInfo.seoulJj + 100
            }
            else if(stockInfo.eungaeFd < 100){
                stockInfo.eungaeFd = stockInfo.seoulJj + 100
            }
            else if(stockInfo.gukcci < 100){
                stockInfo.gukcci = stockInfo.seoulJj + 100
            }
            else if(stockInfo.seondoCf < 100){
                stockInfo.seondoCf = stockInfo.seoulJj + 100
            }
        }
    }
    interval.start();
});

client.commands = new Collection();

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    if (!command) return;
    try{
        command.execute(message,args);
    } catch (error) {
        console.error(error);
    }
})

client.on('messageCreate',message=>{
    if(message.content == `${prefix}유튜브`){
        const channel = message.member.voice.channel
        if(!channel) return message.reply("음성채널에 접속해주세요!");
        client.discordTogether.createTogetherCode(channel.id, 'youtube').then(invite =>{
            return message.channel.send(invite.code);
        })
    }
})

client.login(token);