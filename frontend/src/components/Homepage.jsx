import { useState, useEffect } from "react";
import "../Assets/style/index.css";
import "../Assets/style/style.css";
import "../Assets/style/home.css";

import io from "socket.io-client";

// Create a socket connection outside of the component
const socket = io();

export function Homepage() {
    const [currentUser, setCurrentUser] = useState(1);

    // Setup event listeners outside of the component
    useEffect(() => {
        const form = document.getElementById('form');
        form.addEventListener('submit', handleSubmit);

        socket.on('inputedMessage', handleMessage);

        // Cleanup function to remove event listeners
        return () => {
            form.removeEventListener('submit', handleSubmit);
            socket.off('inputedMessage', handleMessage);
        };
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        const input = document.getElementById('message-input');
        if (input.value) {
            socket.emit('inputedMessage', input.value);
            input.value = '';
        }
    }

    function handleMessage(msg) {
        const messages = document.getElementById('message-container');
        const messageElement = document.createElement('div');
        messageElement.className = `message user${currentUser}`;
        messageElement.textContent = msg;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
        setCurrentUser(3 - currentUser); // Switch between 1 and 2
    }

    function sendMessage() {
        // You can implement this function if needed
        // For now, it's left empty
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
    );
}
