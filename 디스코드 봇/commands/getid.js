const { MessageEmbed } = require("discord.js");
const client = require('../index')
module.exports = {
    name:"유저정보",
    execute(message, args){
        const User = client.users.cache.find(user => user.id === args[0]) || message.mentions.members.first()
        const embed = new MessageEmbed()
            .setTitle("유저정보")
            .addField(`${User.tag||User.user.tag}`,`${User.id||User.user.id}`, true)
            .addField(`가입일 : ${User.createdAt||User.user.createdAt}`, "\u200B", true) //\u0020 \u200B
            .setTimestamp()
            .setThumbnail(User.displayAvatarURL()||User.user.displayAvatarURL)
            .setColor("BLUE")
            if(message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)){
                message.channel.send({ embeds: [embed] })
            }
    }
}