const WebSocket = require('ws')
const s = new WebSocket.Server({ port: 5001 })

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
    ws.on('message', function(message) {
        console.log("Received:", message)
            // Sending reply to user
        if (message == "hello") {
            ws.send("Hey there from the server!")
        }
    })
})