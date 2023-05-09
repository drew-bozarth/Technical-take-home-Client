/*
Drew Bozarth
dbozarth@chapman.edu
Technical-Take-Home : Client : App.js
App.js shows the login interface users at met with upon loading the react app
It has fields Username, Password, and Room Name followed by a Join Room button
The Join Button is restricted to only work once all fields are filled out
I had a separate react project working on login validation without a database 
but I had trouble combining that project with this one. I think with a database
I could implement proper authentication into this app.
If the fields are valid, the button press will set the showChat flag to true
causing the chat component to render and the login will disappear
*/
import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  // using react useStates to update the form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    // Only allow to join room if all fields have input
    if (username !== "" && password !== "" && room !== "") {
      socket.emit("join_room", username, room);
      setShowChat(true);
    }
  };
  // below is the UI for the login form with the boolean check on showChat to either show
  //   the login or the chat component
  // the button has an onclick method to call the joinRoom function
  // Pass the props socket, username and room name to chat component
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat Room</h3>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room Name"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;