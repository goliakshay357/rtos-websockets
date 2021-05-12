const WebSocket = require('ws')
const s = new WebSocket.Server({
    port: 5001
})

var members = []

var groups = []

// Runs on connection established
s.on('connection', (ws) => {
    // Send group details
    var obj = {
        active_groups: groups,
        active_members: members
    }
    ws.send(JSON.stringify(obj))
    // THis is triggered when someone send message from client specified
    ws.on('message', function (message) {
        console.log("Received:", message)
        // Sending reply to user
        let data = JSON.parse(message)

        //------------ New user details -----------------
        if (data.number == 1) {
            members.push(data.from)
            // Send hello message
            let obj = {
                type: 1,
                to: "everybody",
                from: data.from,
                message: `Welcome to chat, ${data.from} 😃`,
                members: members
            }

            s.clients.forEach(function e(client) {
                client.send(JSON.stringify(obj))
            })
            // console.log("Sending")
            // ws.send(JSON.stringify(obj))
        }

        if(data.number == 2){
            let obj = {
                type: 2,
                to: data.to,
                from: data.from,
                message: data.message,
                members: members
            }
            s.clients.forEach(function e(client) {
                client.send(JSON.stringify(obj))
            })
        }
    })
})