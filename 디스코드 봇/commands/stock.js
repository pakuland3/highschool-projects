module.exports = {
    name: "주식",
    async execute(message, args) {
        const { RED, GREEN, BLUE } = { RED: "#ff5454", GREEN: "#54ff62", BLUE: "#38e1ff" }
        const Schema_stock = require("../models/주식")
        const Schema_dobak = require("../models/도박")
        const Discord = require('discord.js');
        const Embed = new Discord.MessageEmbed();
        const dobakInfo = await Schema_dobak.findOne({
            userid: message.author.id
        })
        const stockInfo = await Schema_stock.findOne({
            stock: "391839729830"
        })

        function isInt(num) {
          return num % 1 === 0;
        }
        const trBol = await Schema_dobak.find({"stocks":{$exists:true}}) // stocks 필드 있는 docs
        const flBol = await Schema_dobak.find({"stocks":{$exists:false}}) // stocks 필드 없는 docs
        let i = 0
switch (args[0]) {
    case "구매":
    if(!isInt(args[2])){ // 범이야 주식 구매 args[1] args[2]
        message.channel.send("구매 가능한 숫자가 아닙니다")
        }
        else if(args[2]>0){
            switch(args[1]){
                case "서울전자":
                    let howmanysj = args[2]*stockInfo.seoulJj
                    i = 0
                    if (dobakInfo.stocks.imold == 1 && dobakInfo.money > howmanysj){
                        try{
                            await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                money: dobakInfo.money - args[2]*stockInfo.seoulJj,
                                userid: message.author.id,
                                date: dobakInfo.date,
                                stocks: {
                                    seoulJj: parseInt(dobakInfo.stocks.seoulJj) + parseInt(args[2]),
                                    eungaeFd: dobakInfo.stocks.eungaeFd,
                                    gukcci: dobakInfo.stocks.gukcci,
                                    seondoCf: dobakInfo.stocks.seondoCf,
                                    imold: 1
                                }
                            })
                            const totalMoney = parseInt(dobakInfo.stocks.seoulJj) + parseInt(args[2])
                            Embed.setTitle("구매 완료").setDescription(`현재 주식 개수: ${totalMoney}`).setColor(GREEN)
                            message.channel.send({ embeds: [Embed]})
                        }
                        catch(e){
                            message.reply("에러가 발생했습니다 재시도 해주세요")
                        }
                    }
                    else if (dobakInfo.stocks.imold == 1 && dobakInfo.money < howmanysj){
                        Embed.setColor(RED).setTitle("오류").setDescription(`돈이 부족합니다 \n현재 돈:${dobakInfo.money}`)
                        message.channel.send({ embeds: [Embed]})
                    }
                    else {
                        const trBol = await Schema_dobak.find({"stocks":{$exists:true}}) // stocks 필드 있는 docs
                        const flBol = await Schema_dobak.find({"stocks":{$exists:false}}) // stocks 필드 없는 docs
                        const flBolCount = await Schema_dobak.find({"stocks":{$exists:false}}).count()
                        const trBolCount = await await Schema_dobak.find({"stocks":{$exists:true}}).count()
                        const totalticks = flBolCount - trBolCount - 1
                        for(i=0;i<=totalticks;i++){
                            if(flBol[i].userid === dobakInfo.userid){
                                await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                    money: dobakInfo.money,
                                    userid: message.author.id,
                                    date: dobakInfo.date,
                                    stocks: {
                                        seoulJj: 0,
                                        eungaeFd: 0,
                                        gukcci: 0,
                                        seondoCf: 0,
                                        imold: 1
                                    }
                                })
                                Embed.setColor("GREEN").setTitle("환영합니다").setDescription("주식을 처음 시작했습니다").addField("**범이야 주식 <구매/판매> <수량>**","종목은 서울전자, 응애식품, 국찌, 선도커피",true)
                                message.channel.send({embeds:[Embed]})
                                message.reply("주식이 사지지 않았습니다 다시 한번 입력해주세요")
                            }
                        }
                    }
                    break
                case "응애식품":
                    let howmanyef = args[2]*stockInfo.eungaeFd
                    i = 0;
                    if (dobakInfo.stocks.imold == 1 && dobakInfo.money > howmanyef){
                        try{
                            await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                money: dobakInfo.money - stockInfo.eungaeFd*args[2],
                                userid: message.author.id,
                                date: dobakInfo.date,
                                stocks: {
                                    seoulJj: dobakInfo.stocks.seoulJj,
                                    eungaeFd: parseInt(dobakInfo.stocks.eungaeFd) + parseInt(args[2]),
                                    gukcci: dobakInfo.stocks.gukcci,
                                    seondoCf: dobakInfo.stocks.seondoCf,
                                    imold: 1
                                }
                            })
                            const totalMoney = parseInt(dobakInfo.stocks.eungaeFd) + parseInt(args[2])
                            Embed.setTitle("구매 완료").setDescription(`현재 주식 개수: ${totalMoney}`).setColor(GREEN)
                            message.channel.send({ embeds: [Embed]})
                        }
                        catch(e){
                            message.reply("에러가 발생했습니다 재시도 해주세요")
                            console.log(e)
                        }
                        }
                        else if (dobakInfo.stocks.imold == 1 && dobakInfo.money < howmanyef){
                            Embed.setColor(RED).setTitle("오류").setDescription(`돈이 부족합니다 \n현재 돈:${dobakInfo.money}`)
                            message.channel.send({ embeds: [Embed]})
                        }
                        else {
                            const trBol = await Schema_dobak.find({"stocks":{$exists:true}}) // stocks 필드 있는 docs
                            const flBol = await Schema_dobak.find({"stocks":{$exists:false}}) // stocks 필드 없는 docs
                            const flBolCount = await Schema_dobak.find({"stocks":{$exists:false}}).count()
                            const trBolCount = await await Schema_dobak.find({"stocks":{$exists:true}}).count()
                            const totalticks = flBolCount - trBolCount - 1
                            for(i=0;i <=totalticks;i++){
                                if(flBol[i].userid === dobakInfo.userid){
                                    await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                        money: dobakInfo.money,
                                        userid: message.author.id,
                                        date: dobakInfo.date,
                                        stocks: {
                                            seoulJj: 0,
                                            eungaeFd: 0,
                                            gukcci: 0,
                                            seondoCf: 0,
                                            imold: 1
                                        }
                                    })
                                    Embed.setColor("GREEN").setTitle("환영합니다").setDescription("주식을 처음 시작했습니다").addField("**범이야 주식 <구매/판매> <수량>**","종목은 서울전자, 응애식품, 국찌, 선도커피",true)
                                    message.channel.send({embeds:[Embed]})
                                    message.reply("주식이 사지지 않았습니다 다시 한번 입력해주세요")
                                }
                            }
                        }
                        break
                case "국찌":
                    let howmanygc = args[2]*stockInfo.gukcci
                    i = 0;
                    if (dobakInfo.stocks.imold == 1 && dobakInfo.money > howmanygc){
                        try{
                            await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                money: dobakInfo.money - args[2]*stockInfo.gukcci,
                                userid: message.author.id,
                                date: dobakInfo.date,
                                stocks: {
                                    seoulJj: dobakInfo.stocks.seoulJj,
                                    eungaeFd: dobakInfo.stocks.eungaeFd,
                                    gukcci: dobakInfo.stocks.gukcci + parseInt(args[2]),
                                    seondoCf: dobakInfo.stocks.seondoCf,
                                    imold: 1
                                }
                            })
                            const totalMoney = parseInt(dobakInfo.stocks.gukcci) + parseInt(args[2])
                            Embed.setTitle("구매 완료").setDescription(`현재 주식 개수: ${totalMoney}`).setColor(GREEN)
                            message.channel.send({ embeds: [Embed]})
                        }
                        catch(e){
                            message.reply("에러가 발생했습니다 재시도 해주세요")
                        }
                        }
                        else if (dobakInfo.stocks.imold == 1 && dobakInfo.money < howmanygc){
                            Embed.setColor(RED).setTitle("오류").setDescription(`돈이 부족합니다 \n현재 돈:${dobakInfo.money}`)
                            message.channel.send({ embeds: [Embed]})
                        }
                        else {
                            const trBol = await Schema_dobak.find({"stocks":{$exists:true}}) // stocks 필드 있는 docs
                            const flBol = await Schema_dobak.find({"stocks":{$exists:false}}) // stocks 필드 없는 docs
                            const flBolCount = await Schema_dobak.find({"stocks":{$exists:false}}).count()
                            const trBolCount = await await Schema_dobak.find({"stocks":{$exists:true}}).count()
                            const totalticks = flBolCount - trBolCount - 1
                            for(i=0;i <=totalticks;i++){
                                if(flBol[i].userid === dobakInfo.userid){
                                    await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                        money: dobakInfo.money,
                                        userid: message.author.id,
                                        date: dobakInfo.date,
                                        stocks: {
                                            seoulJj: 0,
                                            eungaeFd: 0,
                                            gukcci: 0,
                                            seondoCf: 0,
                                            imold: 1
                                        }
                                    })
                                    Embed.setColor("GREEN").setTitle("환영합니다").setDescription("주식을 처음 시작했습니다").addField("**범이야 주식 <구매/판매> <수량>**","종목은 서울전자, 응애식품, 국찌, 선도커피",true)
                                    message.channel.send({embeds:[Embed]})
                                    message.reply("주식이 사지지 않았습니다 다시 한번 입력해주세요")
                                }
                            }
                        }
                        break
                case "선도커피":
                    let howmanycf = args[2]*stockInfo.seondoCf
                    i = 0;
                    if (dobakInfo.stocks.imold == 1 && dobakInfo.money > howmanycf){
                        try{
                            await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                money: dobakInfo.money - args[2]*stockInfo.seoulJj,
                                userid: message.author.id,
                                date: dobakInfo.date,
                                stocks: {
                                    seoulJj: dobakInfo.stocks.seoulJj,
                                    eungaeFd: dobakInfo.stocks.eungaeFd,
                                    gukcci: dobakInfo.stocks.gukcci,
                                    seondoCf: parseInt(dobakInfo.stocks.seondoCf) + parseInt(args[2]),
                                    imold: 1
                                }
                            })
                            const totalMoney = parseInt(dobakInfo.stocks.seondoCf) + parseInt(args[2])
                            Embed.setTitle("구매 완료").setDescription(`현재 주식 개수: ${totalMoney}`).setColor(GREEN)
                            message.channel.send({ embeds: [Embed]})
                        }
                        catch(e){
                            message.reply("에러가 발생했습니다 재시도 해주세요")
                        }
                        }
                        else if (dobakInfo.stocks.imold == 1 && dobakInfo.money < howmanycf){
                            Embed.setColor(RED).setTitle("오류").setDescription(`돈이 부족합니다 \n현재 돈:${dobakInfo.money}`)
                            message.channel.send({ embeds: [Embed]})
                    }
                        else {
                            const trBol = await Schema_dobak.find({"stocks":{$exists:true}}) // stocks 필드 있는 docs
                            const flBol = await Schema_dobak.find({"stocks":{$exists:false}}) // stocks 필드 없는 docs
                            const flBolCount = await Schema_dobak.find({"stocks":{$exists:false}}).count()
                            const trBolCount = await await Schema_dobak.find({"stocks":{$exists:true}}).count()
                            const totalticks = flBolCount - trBolCount - 1
                            for(i=0;i <=totalticks;i++){
                                if(flBol[i].userid === dobakInfo.userid){
                                    await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                        money: dobakInfo.money,
                                        userid: message.author.id,
                                        date: dobakInfo.date,
                                        stocks: {
                                            seoulJj: 0,
                                            eungaeFd: 0,
                                            gukcci: 0,
                                            seondoCf: 0,
                                            imold: 1
                                        }
                                    })
                                    Embed.setColor("GREEN").setTitle("환영합니다").setDescription("주식을 처음 시작했습니다").addField("**범이야 주식 <구매/판매> <수량>**","종목은 서울전자, 응애식품, 국찌, 선도커피",true)
                                    message.channel.send({embeds:[Embed]})
                                    message.reply("주식이 사지지 않았습니다 다시 한번 입력해주세요")
                                }
                            }
                        }
                    }
                }
                break
    case "판매":
        if(!isInt(args[2])){
            message.channel.send("판매 가능한 숫자가 아닙니다")
        }
        else if(args[2]>0){ // 범이야 주식 판매 args[1] args[2]
            switch(args[1]){
                case "서울전자":
                    let howmanysjsts = args[2]
                    i = 0
                    if (dobakInfo.stocks.imold == 1){
                        try{
                            await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                money: dobakInfo.money + args[2]*stockInfo.seoulJj,
                                userid: message.author.id,
                                date: dobakInfo.date,
                                stocks: {
                                    seoulJj: parseInt(dobakInfo.stocks.seoulJj) - parseInt(args[2]),
                                    eungaeFd: dobakInfo.stocks.eungaeFd,
                                    gukcci: dobakInfo.stocks.gukcci,
                                    seondoCf: dobakInfo.stocks.seondoCf,
                                    imold: 1
                        }
                    })
                        const totalMoney = parseInt(dobakInfo.stocks.seoulJj) - parseInt(args[2])
                        Embed.setTitle("판매 완료").setDescription(`현재 주식 개수: ${totalMoney}`).setColor(GREEN)
                        message.channel.send({ embeds: [Embed]})
                        }
                        catch(e){
                            message.reply("에러가 발생했습니다 재시도 해주세요")
                        }
                    }
                    else if (dobakInfo.stocks.imold == 1 && dobakInfo.stocks.seoulJj < howmanysjsts){
                        Embed.setColor(RED).setTitle("오류").setDescription(`주식이 부족합니다 \n현재 주식 개수:${dobakInfo.stocks.seoulJj}`)
                        message.channel.send({ embeds: [Embed]})
                    }
                    else {
                        const trBol = await Schema_dobak.find({"stocks":{$exists:true}}) // stocks 필드 있는 docs
                        const flBol = await Schema_dobak.find({"stocks":{$exists:false}}) // stocks 필드 없는 docs
                        const flBolCount = await Schema_dobak.find({"stocks":{$exists:false}}).count()
                        const trBolCount = await await Schema_dobak.find({"stocks":{$exists:true}}).count()
                        const totalticks = flBolCount - trBolCount - 1
                        for(i=0;i <=totalticks;i++){
                            if(flBol[i].userid === dobakInfo.userid){
                                await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                    money: dobakInfo.money,
                                    userid: message.author.id,
                                    date: dobakInfo.date,
                                    stocks: {
                                        seoulJj: 0,
                                        eungaeFd: 0,
                                        gukcci: 0,
                                        seondoCf: 0,
                                        imold: 1
                                    }
                                })
                                Embed.setColor("GREEN").setTitle("환영합니다").setDescription("주식을 처음 시작했습니다").addField("**범이야 주식 <구매/판매> <수량>**","종목은 서울전자, 응애식품, 국찌, 선도커피",true)
                                message.channel.send({embeds:[Embed]})
                                message.reply("주식이 사지지 않았습니다 다시 한번 입력해주세요")
                            }
                        }
                    }
                    break
                case "응애식품":
                    let howmanyefsts = args[2]
                    i = 0
                    if (dobakInfo.stocks.imold == 1){
                        try{
                            await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                money: dobakInfo.money + args[2]*stockInfo.eungaeFd,
                                userid: message.author.id,
                                date: dobakInfo.date,
                                stocks: {
                                    seoulJj: dobakInfo.stocks.seoulJj,
                                    eungaeFd: parseInt(dobakInfo.stocks.eungaeFd) - parseInt(args[2]),
                                    gukcci: dobakInfo.stocks.gukcci,
                                    seondoCf: dobakInfo.stocks.seondoCf,
                                    imold: 1
                                }
                            })
                        const totalMoney = parseInt(dobakInfo.stocks.eungaeFd) - parseInt(args[2])
                        Embed.setTitle("판매 완료").setDescription(`현재 주식 개수: ${totalMoney}`).setColor(GREEN)
                        message.channel.send({ embeds: [Embed]})
                        }
                        catch(e){
                            message.reply("에러가 발생했습니다 재시도 해주세요")
                        }
                    }
                    else if (dobakInfo.stocks.imold == 1 && dobakInfo.stocks.eungaeFd < howmanyefsts){
                        Embed.setColor(RED).setTitle("오류").setDescription(`주식이 부족합니다 \n현재 주식 개수:${dobakInfo.stocks.seoulJj}`)
                        message.channel.send({ embeds: [Embed]})
                    }
                    else {
                        const trBol = await Schema_dobak.find({"stocks":{$exists:true}}) // stocks 필드 있는 docs
                        const flBol = await Schema_dobak.find({"stocks":{$exists:false}}) // stocks 필드 없는 docs
                        const flBolCount = await Schema_dobak.find({"stocks":{$exists:false}}).count()
                        const trBolCount = await await Schema_dobak.find({"stocks":{$exists:true}}).count()
                        const totalticks = flBolCount - trBolCount - 1
                        for(i=0;i <=totalticks;i++){
                            if(flBol[i].userid === dobakInfo.userid){
                                await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                    money: dobakInfo.money,
                                    userid: message.author.id,
                                    date: dobakInfo.date,
                                    stocks: {
                                        seoulJj: 0,
                                        eungaeFd: 0,
                                        gukcci: 0,
                                        seondoCf: 0,
                                        imold: 1
                                    }
                                })
                                Embed.setColor("GREEN").setTitle("환영합니다").setDescription("주식을 처음 시작했습니다").addField("**범이야 주식 <구매/판매> <수량>**","종목은 서울전자, 응애식품, 국찌, 선도커피",true)
                                message.channel.send({embeds:[Embed]})
                                message.reply("주식이 사지지 않았습니다 다시 한번 입력해주세요")
                           }
                        }
                    }
                    break
                case "국찌":
                    let howmanygcsts = args[2]
                    i = 0
                    if (dobakInfo.stocks.imold == 1){
                        try{
                            await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                            money: dobakInfo.money + args[2]*stockInfo.gukcci,
                            userid: message.author.id,
                            date: dobakInfo.date,
                            stocks: {
                            seoulJj: dobakInfo.stocks.seoulJj,
                            eungaeFd: dobakInfo.stocks.eungaeFd,
                            gukcci: parseInt(dobakInfo.stocks.gukcci) - parseInt(args[2]),
                            seondoCf: dobakInfo.stocks.seondoCf,
                            imold: 1
                            }
                        })
                        const totalMoney = parseInt(dobakInfo.stocks.gukcci) - parseInt(args[2])
                        Embed.setTitle("판매 완료").setDescription(`현재 주식 개수: ${totalMoney}`).setColor(GREEN)
                        message.channel.send({ embeds: [Embed]})
                        }
                        catch(e){
                            message.reply("에러가 발생했습니다 재시도 해주세요")
                        }
                    }
                    else if (dobakInfo.stocks.imold == 1 && dobakInfo.stocks.gukcci < howmanygcsts){
                        Embed.setColor(RED).setTitle("오류").setDescription(`주식이 부족합니다 \n현재 주식 개수:${dobakInfo.stocks.seoulJj}`)
                        message.channel.send({ embeds: [Embed]})
                    }
                    else {
                        const trBol = await Schema_dobak.find({"stocks":{$exists:true}}) // stocks 필드 있는 docs
                        const flBol = await Schema_dobak.find({"stocks":{$exists:false}}) // stocks 필드 없는 docs
                        const flBolCount = await Schema_dobak.find({"stocks":{$exists:false}}).count()
                        const trBolCount = await await Schema_dobak.find({"stocks":{$exists:true}}).count()
                        const totalticks = flBolCount - trBolCount - 1
                        for(i=0;i <=totalticks;i++){
                            if(flBol[i].userid === dobakInfo.userid){
                                await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                    money: dobakInfo.money,
                                    userid: message.author.id,
                                    date: dobakInfo.date,
                                    stocks: {
                                        seoulJj: 0,
                                        eungaeFd: 0,
                                        gukcci: 0,
                                        seondoCf: 0,
                                        imold: 1
                                    }
                                })
                                Embed.setColor("GREEN").setTitle("환영합니다").setDescription("주식을 처음 시작했습니다").addField("**범이야 주식 <구매/판매> <수량>**","종목은 서울전자, 응애식품, 국찌, 선도커피",true)
                                message.channel.send({embeds:[Embed]})
                                message.reply("주식이 사지지 않았습니다 다시 한번 입력해주세요")
                            }
                        }
                    }
                    break
                case "선도커피":
                    let howmanycfsts = args[2]
                    i = 0
                    if (dobakInfo.stocks.imold == 1){
                        try{
                            await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                money: dobakInfo.money + args[2]*stockInfo.seondoCf,
                                userid: message.author.id,
                                date: dobakInfo.date,
                                stocks: {
                                    seoulJj: dobakInfo.stocks.seoulJj,
                                    eungaeFd: dobakInfo.stocks.eungaeFd,
                                    gukcci: dobakInfo.stocks.gukcci,
                                    seondoCf: parseInt(dobakInfo.stocks.seondoCf) - parseInt(args[2]),
                                    imold: 1
                                }
                            })
                        const totalMoney = parseInt(dobakInfo.stocks.seondoCf) - parseInt(args[2])
                        Embed.setTitle("판매 완료").setDescription(`현재 주식 개수: ${totalMoney}`).setColor(GREEN)
                        message.channel.send({ embeds: [Embed]})
                        }
                        catch(e){
                            message.reply("에러가 발생했습니다 재시도 해주세요")
                        }
                    }
                    else if (dobakInfo.stocks.imold == 1 && dobakInfo.stocks.gukcci < howmanycfsts){
                        Embed.setColor(RED).setTitle("오류").setDescription(`주식이 부족합니다 \n현재 주식 개수:${dobakInfo.stocks.seoulJj}`)
                        message.channel.send({ embeds: [Embed]})
                    }
                    else {
                        const trBol = await Schema_dobak.find({"stocks":{$exists:true}}) // stocks 필드 있는 docs
                        const flBol = await Schema_dobak.find({"stocks":{$exists:false}}) // stocks 필드 없는 docs
                        const flBolCount = await Schema_dobak.find({"stocks":{$exists:false}}).count()
                        const trBolCount = await await Schema_dobak.find({"stocks":{$exists:true}}).count()
                        const totalticks = flBolCount - trBolCount - 1
                        for(i=0;i <=totalticks;i++){
                            if(flBol[i].userid === dobakInfo.userid){
                                await Schema_dobak.findOneAndUpdate({ userid: message.author.id }, {
                                    money: dobakInfo.money,
                                    userid: message.author.id,
                                    date: dobakInfo.date,
                                    stocks: {
                                        seoulJj: 0,
                                        eungaeFd: 0,
                                        gukcci: 0,
                                        seondoCf: 0,
                                        imold: 1
                                    }
                                })
                                Embed.setColor("GREEN").setTitle("환영합니다").setDescription("주식을 처음 시작했습니다").addField("**범이야 주식 <구매/판매> <수량>**","종목은 서울전자, 응애식품, 국찌, 선도커피",true)
                                message.channel.send({embeds:[Embed]})
                                message.reply("주식이 사지지 않았습니다 다시 한번 입력해주세요")
                            }
                        }
                    }
                }
            }
            break
    case "시세":
        let sv = stockInfo.seoulJjVar
        let ev = stockInfo.eungaeFdVar
        let gv = stockInfo.gukcciVar
        let cv = stockInfo.seondoCfVar
        const plus = "+"
        if(sv>0){
            sv = plus+String(sv)
        }
        else{
            sv = String(sv)
        }
        if(ev>0){
            ev = plus+String(ev)
        }
        else{
            ev = String(ev)
        }
        if(cv>0){
            cv = plus+String(cv)
        }
        else{
            cv = String(cv)
        }
        if(gv>0){
            gv = plus+String(gv)
        }
        else{
            gv = String(gv)
        }
        const totalrkqtsj = parseInt(stockInfo.seoulJj)
        const totalrkqteu = parseInt(stockInfo.eungaeFd)
        const totalrkqtgk = parseInt(stockInfo.gukcci)
        const totalrkqtsc = parseInt(stockInfo.seondoCf)

        Embed.setColor("AQUA").setTitle("주식 시세").setDescription("시세는 1분마다 변경됩니다")
        .addField('서울전자',`**${totalrkqtsj + " " + "(" + sv + ")"}**`,true)
        .addField('응애식품',`**${totalrkqteu + " " + "(" + ev + ")"}**`,true)
        .addField('국찌',`**${totalrkqtgk + " " + "(" + gv + ")"}**`,true)
        .addField('선도커피',`**${totalrkqtsc + " " + "(" + cv + ")"}**`,true)
        message.channel.send({embeds:[Embed]})
        }
    }
}