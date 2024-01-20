const client = require("../index")
const comma = require('comma-number')
const Schema_dobak = require("../models/도박")
const Schema_stock = require("../models/주식")

module.exports = {
    name: "잔액",
    async execute(message, args) {
        const dobakInfo = await Schema_dobak.findOne({
            userid: message.author.id
        })
        const stockInfo = await Schema_stock.findOne({
            stock: "391839729830"
        })
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        if (!dobakInfo) return message.reply("**오류 ) 등록된 정보가 없어 \"범이야 돈받기\"로 돈을 받아**")
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        let i
        if (dobakInfo.date == date) i = "돈을 받음"
        else i = "돈을 받지않음"
        const embed = new (require("discord.js")).MessageEmbed()
            .setTitle(`${user.tag || user.user.tag}의 도박 정보`)
            .addField("잔액 :", `**${comma(dobakInfo.money + dobakInfo.stocks.seoulJj * stockInfo.seoulJj +
            dobakInfo.stocks.eungaeFd * stockInfo.eungaeFd + dobakInfo.stocks.gukcci * stockInfo.gukcci +
            dobakInfo.stocks.seondoCf * stockInfo.seondoCf)}원 !**`)
            .addField("오늘 돈을 받았는가 :", `**오늘 ${i}**`)
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp()
            .setColor("YELLOW")
            .addField("서울전자", `${dobakInfo.stocks.seoulJj}개`)
            .addField("응애식품", `${dobakInfo.stocks.eungaeFd}개`)
            .addField("국찌", `${dobakInfo.stocks.gukcci}개`)
            .addField("선도커피", `${dobakInfo.stocks.seondoCf}개`)
        message.channel.send({ embeds: [embed] })
    }
}