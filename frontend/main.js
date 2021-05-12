var sock = new WebSocket("ws://13.235.27.162:5001")

// When connection is established successfully
sock.onopen = function (event) {
    console.log("Connection established successfully!");
    // Taking name input after successfull connections!
    Swal.fire({
        title: '<strong>Socket Connection Established! Welcome!</strong>',
        icon: 'info',
        html: 'Please enter your name:</br> ' +
            '<input id="user_name" type="text"> ',
        confirmButtonText: `Save`
    }).then((result) => {
        if (result.isConfirmed) {
            // Getting and saving name in local storage  // 
            let user_name = document.getElementById("user_name").value
            sessionStorage.setItem("user_name", user_name);
            Swal.fire('Name Entered!', '', 'success')

            // Sending to backend 
            let obj = {
                type: "new-user",
                number: 1,
                from: user_name,
                to: "everybody"
            }
            sock.send(JSON.stringify(obj));
            // // Receive message from server
            // sock.onmessage = function (event) {
            //     console.log(event, "Hello");
            // }
        } else if (result.isDenied) {
            Swal.fire('Something went wrong!', '', 'info')
        }
    })
    // sock.send("hello");
}

function send_button(){
    let user_sending_message = document.getElementById("user_message").value
    let to = document.getElementById("to").value
    let obj = {
        type: "Connected user",
        number:2,
        from: sessionStorage.getItem("user_name"),
        to: to,
        message: user_sending_message
    }

    sock.send(JSON.stringify(obj));

    // Adding to my HTML
    let e = document.createElement('p');
    e.innerHTML = `Me: ${user_sending_message}`
    document.getElementById("chats").appendChild(e);
}

// If any error while connection establishment
sock.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

// Receive message from server
sock.onmessage = function (event) {
    let data = JSON.parse(event.data);
    
    // Changing members details
    document.getElementById("members").innerHTML = ""
    document.getElementById("members").innerHTML = JSON.stringify(data.members) 
    console.log(data)
    // If type is 1 i.e new user added 
    if(data.type == 1){ 
        if(data.to == "everybody"){
            let e = document.createElement('p');
            e.innerHTML = `bot: ${data.message}`
            document.getElementById("chats").appendChild(e);
        }
    }

    if(data.type == 2){
        console.log("2")
        if(data.to == "everybody" || data.to == sessionStorage.getItem("user_name")){

                let e = document.createElement('p');
                e.innerHTML = `${data.from}: ${data.message}`
                document.getElementById("chats").appendChild(e);
        }
        // if(data.to == "everybody"){
        //     let e = document.createElement('p');
        //     e.innerHTML = `${data.from}: ${data.message}`
        //     document.getElementById("chats").appendChild(e);
        // }

    }


}