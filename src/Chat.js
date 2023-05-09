/*
Drew Bozarth
dbozarth@chapman.edu
Technical-Take-Home : Client : Chat.js

*/
import React, { useEffect, useState } from "react";
// uses ScrollToBottom so that when chats are coming in the app will automatically
//   scroll to the most recent messages as they come in
import ScrollToBottom from "react-scroll-to-bottom";

// The Chat component that will send and receive messages with socket.io and display the chat interface
// accepts propss socket, username and room
function Chat({ socket, username, room }) {
  // state for current message to mutate the state of the current message being sent or received
  // this will be set whenever text is typed into the message box, and sent when the send button is pressed
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userList, setUserList] = useState([]);

  // the function is asynchronus so it will wait for the message to be sent before continuing
  const sendMessage = async () => {
    if (currentMessage !== "") {
      // create data type to hold the info for the room, author, message and time of each message
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      // calls to the socket event in ./server/index.js and passes the messageData object
      await socket.emit("send_message", messageData);
      // add this message to the end of the existing message list
      setMessageList((list) => [...list, messageData]);
      // clear the input box after a message is sent
      setCurrentMessage("");
    }
  };
  // when a new user is connected in ./server/index.js it will call updateUserList socket event and pass the list of current users
  // This will take the list from the server and transfer it to an array in this file
  useEffect(() => {
    socket.on("updateUsersList", (users) => {
        console.log(users);
        // set to empty list first
        setUserList((list) => []);
        // for each user in the current list, add each element to global list
        users.forEach(function (user) {
          setUserList((list) => [...list, user]);
        });
    });
  }, [socket]);

  // When receiving a socket event with the data object, it will add that message object
  //   to the end of the list of messages in the chat room
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  // below is the UI components for the Chat interface
  // The Online user list was the last thing I implemented so it is not very pretty 
  //   but it is functional.
  // The send message button in the footer also has an onKeyPress event so that hitting
  //   the enter key will also send the message being typed.
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Room: {room}</p>
      </div>
      <div className="chat-list">
        <p>Online:</p>
      </div>
      <div>
        {userList.map((person) => {
          return (
            <p>{person}</p>
          );
        })}
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;