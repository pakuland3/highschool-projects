const cooldown = new Set();
const Schema = require("../models/도박");
module.exports={
    name:"가위바위보",
    async execute(message, args){
        if(args[0]=="가위" || args[0]=="보" || args[0]=="바위"){
        if (cooldown.has(message.author.id)) {
            return message.channel.send("**오류 ) 미션 명령어는 30초이라는 쿨타임이 존재해요,  잠시 후 다시 시도해봐요**");
        } else {
            cooldown.add(message.author.id);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, 30000);
        }
        const userInfo = await Schema.findOne({
            userid: message.author.id
        })
        if(!userInfo) return message.reply("**\"범이야 돈줘\"로 먼저 돈을 받아**");
        else{
            const list = [`가위`, `바위`, `보`];
            const random = Math.floor(Math.random() * 3);
            const bot = list[random];
            let winner = ""
            const convertEmoji = (who) => {
                if(who === "가위"){
                  return "✌";
                }
                else if(who === "바위"){
                  return "✊";
                }
                else if(who === "보"){
                  return "✋";
                }
              }
              
            switch(args[0]){ // winner 구별 -> 나, 너, 비김
                case "가위":
                    if(bot == "가위"){
                        winner = "비김"
                    }
                    else if(bot == "보"){
                        winner = "너"
                    }
                    else{
                        winner = "나"
                    }
                    if(winner=="너"){
                        await Schema.findOneAndUpdate({ userid: message.author.id }, 
                        {$set:{
                            money: userInfo.money + 10000,
                            }
                        })
                        let result1 = `너 : ${convertEmoji(args[0])} vs 봇 : ${convertEmoji(bot)}\n너의 승리야 만원을 줄게 **+10000**`
                        message.reply(result1)
                    }
                    else{
                        let result1 = `너 : ${convertEmoji(args[0])} vs 봇 : ${convertEmoji(bot)}\n봇의 승리야`
                        message.reply(result1)
                    }
                    break
                case "바위":
                    if(bot == "가위"){
                        winner = "너"
                    }
                    else if(bot == "보"){
                        winner = "나"
                    }
                    else{
                        winner = "비김"
                    }
                    if(winner=="너"){
                        await Schema.findOneAndUpdate({ userid: message.author.id }, 
                        {$set:{
                            money: userInfo.money + 10000,
                            }
                        })
                        let result2 = `너 : ${convertEmoji(args[0])} vs 봇 : ${convertEmoji(bot)}\n너의 승리야 만원을 줄게 **+10000**`
                        message.reply(result2)
                    }
                    else{
                        let result2 = `너 : ${convertEmoji(args[0])} vs 봇 : ${convertEmoji(bot)}\n봇의 승리야`
                        message.reply(result2)
                    }
                    break
                case "보":
                    if(bot == "가위"){
                        winner = "나"
                    }
                    else if(bot == "보"){
                        winner = "비김"
                    }
                    else{
                        winner = "너"
                    }
                    if(winner=="너"){
                        await Schema.findOneAndUpdate({ userid: message.author.id }, 
                        {$set:{
                            money: userInfo.money + 10000,
                            }
                        })
                        let result1 = `너 : ${convertEmoji(args[0])} vs 봇 : ${convertEmoji(bot)}\n너의 승리야 만원을 줄게 **+10000**`
                        message.reply(result1)
                    }
                    else{
                        let result3 = `너 : ${convertEmoji(args[0])} vs 봇 : ${convertEmoji(bot)}\n봇의 승리야`
                        message.reply(result3)
                    }
                }    
            }
        }
        else{
            message.reply("가위/바위/보 중에 하나만 입력해주세요")
        }
    }
}