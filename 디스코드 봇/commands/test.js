module.exports = {
    name : "테스트",
    execute(message, args){
        if(args[0]){
            message.reply("성공")
        }
    }
}