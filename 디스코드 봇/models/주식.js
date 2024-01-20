const mongo = require("mongoose")

const dt = new mongo.Schema({
    seoulJj: { type: Number },
    eungaeFd: { type: Number },
    gukcci: { type: Number },
    seondoCf: { type: Number },
    stock: { type: String },
    seoulJjVar: { type: Number},
    eungaeFdVar: { type: Number},
    gukcciVar: { type: Number},
    seondoCfVar: { type: Number }
})

const MessageModel = module.exports = mongo.model("주식", dt);