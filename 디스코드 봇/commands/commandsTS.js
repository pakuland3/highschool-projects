// module.exports = {
//     name: "찾기",
//     async execute(message, args) {
//         const Schema_stock = require("../models/주식")
//         const Schema_dobak = require("../models/도박")
//         const { mongo } = require("mongoose")
//         const dobakInfo = await Schema_dobak.findOne({
//             userid: message.author.id
//         })
//         const stockInfo = await Schema_stock.findOne({
//             stock: "391839729830"
//         })
//         const { EmbedBuilder } = require("discord.js")
//         switch(args[0]){
//             case "서울전자":
//                 let i = 0;
//                 const trBol = await Schema_dobak.find({"stocks":{$exists:true}}) // stocks 필드 있는 docs
//                 const flBol = await Schema_dobak.find({"stocks":{$exists:false}}) // stocks 필드 없는 docs
//                 const flBolCount = await Schema_dobak.find({"stocks":{$exists:false}}).count()
//                 const trBolCount = await await Schema_dobak.find({"stocks":{$exists:true}}).count()
//                 if (dobakInfo.stocks.imold == 1){
//                     console.log(1)
//                 }
//                 else {
//                     console.log(flBolCount, trBolCount)
//                     for(i;i<=flBolCount-trBolCount-1;i++){
//                         if(flBol[i].userid === dobakInfo.userid){
//                             await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
//                                 money: dobakInfo.money,
//                                 userid: message.author.id,
//                                 date: dobakInfo.date,
//                                 stocks: {
//                                     seoulJj: 0,
//                                     eungaeFd: 0,
//                                     gukcci: 0,
//                                     seondoCf: 0,
//                                     imold: 1
//                                 }
//                             })
//                             Embed.setColor("GREEN").setTitle("환영합니다").setDescription("주식을 처음 시작했습니다").addField("**범이야 주식 <구매/판매> <수량>**","종목은 서울전자, 응애식품, 국찌, 선도커피",true)
//                             message.channel.send({embeds:[Embed]})
//                         }
//                     }
//                 }
//             case "응애":
//                 const usersUengae = await Schema_dobak.findOne({ userid: message.author.id})
//                 try{
//                     console.log(usersUengae.stocks.eungaeFd)
//                 }
//                 catch(e){
//                     console.log(e)
//                 }
//         }
//     }
// }