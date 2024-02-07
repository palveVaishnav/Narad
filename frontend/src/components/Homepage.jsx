import { useState, useEffect } from "react";
import "../Assets/style/index.css";
import "../Assets/style/style.css";
import "../Assets/style/home.css";
// import "/socket.io/socket.io.js";

// const path = require('path');
export function Homepage() {
    const [currentUser, setCurrentUser] = useState(1);

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "/socket.io/socket.io.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    function sendMessage() {
        // eslint-disable-next-line no-undef
        const socket = io();
        const input = document.getElementById('message-input');
        const messages = document.getElementById('message-container');
        const form = document.getElementById('form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (input.value) {
                socket.emit('inputedMessage', input.value);
                input.value = '';
            }
        });

        socket.on('inputedMessage', (msg) => {
            const messageElement = document.createElement('div');
            messageElement.className = `message user${currentUser}`;
            messageElement.textContent = msg;
            messages.appendChild(messageElement);
            messages.scrollTop = messages.scrollHeight;
            //setCurrentUser(3 - currentUser); // Switch between 1 and 2
        })

        // const messageText = input.value.trim();
        // if (messageText !== '') {
        //     const messageElement = document.createElement('div');
        //     messageElement.className = `message user${currentUser}`;
        //     messageElement.textContent = messageText;

        //     messages.appendChild(messageElement);
        //     input.value = '';
        //     messages.scrollTop = messages.scrollHeight;

        //     // Switch user for the next message
        //     setCurrentUser(3 - currentUser); // Switch between 1 and 2
        // }
    }
    return (
        <div className="homePage">
            <div className="UserSection">
                <div className="userInfo">
                    <img src="../Assets/images/user.png" alt="user image" className="userImage" />
                    <p className="userName">userName</p>
                </div>
                <div className="roomPanel">
                    <h2>Room Panel</h2>
                    <button className="roomButton createRoom">
                        <a href="create.php">Create</a>
                    </button>
                    <button className="roomButton joinRoom">
                        <a href="join.php">Join</a>
                    </button>
                </div>
                <div className="previousRooms">
                    <h2>Your Rooms</h2>
                    <div className="roomCard">
                        <img className="previousRoomImage" src="../Assets/images/man.png" alt="Room Image" />
                        <p className="previousRoom">Rooms</p>
                    </div>
                </div>
            </div>
            <div className="chatSection">
                <div className="currentRoom">
                    <img src="../Assets/images/programmer.png" alt="" className="currentRoomIcon" />
                    <h2 className="currentRoomName">Room Name</h2>
                </div>
                <div id="chat-container">
                    <div id="message-container"></div>
                </div>
                <form id="form" action="" className="input-container">
                    <input type="text" id="message-input" placeholder="Type your message..." />
                    <button id="send-button" onClick={sendMessage}>Send</button>
                </form>

            </div>
        </div>
        // <script src="/socket.io/socket.io.js"></script>
    );
}
