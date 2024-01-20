const mongo = require("mongoose")

const d = new mongo.Schema({
    money: { type: Number },
    userid: { type: String },
    date: { type: String },
    stocks: {
        seoulJj: { type: Number },
        eungaeFd: { type: Number },
        gukcci: { type: Number },
        seondoCf: { type: Number },
        imold: { type:Number }
    }
})

const MessageModel = module.exports = mongo.model("도박", d);