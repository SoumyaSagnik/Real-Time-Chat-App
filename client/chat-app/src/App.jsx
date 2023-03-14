import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const createNewRoom = () => {
    if (username !== "") {
      socket.emit("join_room", socket.id);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="intro">
          <div>
            <h3>Join a Chat</h3>
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room id..."
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div className="btns">
            <button onClick={joinRoom}>Join Room</button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default App;
