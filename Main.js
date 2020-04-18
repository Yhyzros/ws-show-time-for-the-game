const WebSocket = require('ws');
const crypto = require('crypto');
const fs = require('fs');
const uuid = () =>([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>(c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16));
const ip = '127.0.0.1';

//Date显时间并截取下来----
let D = Date();
let time = D.substr(16,8);
//有三个点，每个点有两个数字，位置用substr截取为16,8.

const wss = new WebSocket.Server({ port: 17439 });
console.log('['+ time +']Server is running at '+ ip + ':17439.');
console.log('Author by Yhyzros.');
wss.on('connection', (ws) =>{
    ws.send(JSON.stringify({
        body: {
            eventName: 'PlayerMessage'
        },
        header: buildHeader('subscribe')
    }))
    function command(cmd){
        ws.send(JSON.stringify({
            body:{
                origin:{
                    type:"player"
                },
                commandLine:cmd,
                version: 1 
            },
            header: buildHeader('commandRequest')
        }));
    }
    ws.on("message",(msg) =>{
        console.log('onMessgae:', msg);
        if(JSON.parse(msg).body.eventName == "PlayerMessage"){
            let say = JSON.parse(msg).body.properties.Message;
            let sender = JSON.parse(msg).body.properties.Sender;
    if(say == 'test'){
        command('tellraw @s {"rawtext":[{"text":"['+ time +']Tested!!"}]}');
        command('tellraw @s {"rawtext":[{"text":"['+ time +']CAIMEO说我魔改ws库,相信我，我没有QAQ(咳咳."}]}')
    };
        }
    })
});
