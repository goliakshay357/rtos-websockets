var sock = new WebSocket("ws://localhost:5001")

// When connection is established successfully
sock.onopen = function(event) {
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
                localStorage.setItem("user_name", user_name);
                Swal.fire('Name Entered!', '', 'success')

                // Sending to backend 
                let obj = {
                    type: "new-user",
                    number: 1,
                    name: user_name
                }
                sock.send(obj);

            } else if (result.isDenied) {
                Swal.fire('Something went wrong!', '', 'info')
            }
        })
        // sock.send("hello");
}


// If any error while connection establishment
sock.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

// Receive message from server
sock.onmessage = function(event) {
    console.log(event);
}