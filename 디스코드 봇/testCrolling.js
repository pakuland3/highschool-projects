// const axios = require('axios');
// const iconv = require('iconv-lite');
// const cheerio = require('cheerio');

// axios({
//     // 크롤링을 원하는 페이지 URL
//     url: 'http://comci.kr:4082/st',
//     method: 'GET',
//     responseType: 'arraybuffer',
// })
//     // 성공했을 경우
//     .then(response => {
//         // 만약 content가 정상적으로 출력되지 않는다면, arraybuffer 타입으로 되어있기 때문일 수 있다.
//         // 현재는 string으로 반환되지만, 만약 다르게 출력된다면 뒤에 .toString() 메서드를 호출하면 된다.
//         const content = iconv.decode(response.data, 'EUC-KR');
//         console.log(content)
//         const $ = cheerio.load(content);
//         const titles = $('#수정일').text();
//         console.log(titles);
//     })
//     // 실패했을 경우
//     .catch(err => {
//         console.error(err);
//     });

// const axios = require('axios');
// const iconv = require('iconv-lite');

// axios({
//     // 크롤링을 원하는 페이지 URL
//     url: 'http://www.yes24.com/24/Category/BestSeller',
//     method: 'GET',
//     responseType: 'arraybuffer',
// })
//     // 성공했을 경우
//     .then(response => {
//         // 만약 content가 정상적으로 출력되지 않는다면, arraybuffer 타입으로 되어있기 때문일 수 있다.
//         // 현재는 string으로 반환되지만, 만약 다르게 출력된다면 뒤에 .toString() 메서드를 호출하면 된다.
//         const content = iconv.decode(response.data, 'EUC-KR');
//         console.log(content);
//     })
//     // 실패했을 경우
//     .catch(err => {
//         console.error(err);
//     });

//     module.exports = {
//         name:"학교시간표",
//         async execute(message, args){
//             const iconv = require("iconv-lite")
//             const axios = require("axios")
//             const cheerio = require("cheerio")
//             const getHTML = async() => {
//                 try{
//                     return await axios.get("http://comci.kr:4082/st", {responseType: "arraybuffer"})
//                 }catch(e){
//                     console.log(e)
//                 }
//             }
//             const parsing = async() => {
//                 const html = await getHTML();
//                 const content = iconv.decode(html.data, "EUC-KR")
//                 const $ = cheerio.load(content)
//                 const schedule1 = $("#수정일").text()
//                 console.log(schedule1)
//             }
    
//             parsing()
//         }
//     }
    