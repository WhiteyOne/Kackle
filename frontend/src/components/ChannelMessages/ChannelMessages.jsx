import { useSelector } from "react-redux";
import "./ChannelMessages.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { urlToUse } from "../../config";
import Reactions_Modal from "../Reactions/Reactions";

let socket;
function GetMessages() {
  const { channelId } = useParams();
  const user = useSelector((state) => state.session.user);
  const channel = useSelector((state) => state.channels.allChannels[Number(channelId)]);
  const [connected, setConnected] = useState(false);
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const chatroom = channelId;
  const [editMessageId, setEditMessageId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteMessageId, setDeleteMessageId] = useState(null);

  const openEdit = (message) => {
    setEditMessageId(message.id);
    setEditText(message.msg);
  };

  const cancelEdit = () => {
    setEditMessageId(null);
    setEditText("");
  };

  const submitEdit = () => {
    if (editText.trim() !== "") {
      socket.emit("update_message", {
        message_id: editMessageId,
        new_body: editText,
        room: chatroom,
        user,
      });
    }
    cancelEdit();
  };

  const openDelete = (messageId) => {
    setDeleteMessageId(messageId);
  };

  const cancelDelete = () => {
    setDeleteMessageId(null);
  };

  const confirmDelete = () => {
    socket.emit("delete_message", {
      message_id: deleteMessageId,
      room: chatroom,
      user,
    });
    cancelDelete();
  };

  const sendChat = async (e) => {
    e.preventDefault();
    if (newMsg.trim()) {
      const payload = {
        room: chatroom,
        user,
        message: newMsg,
      };
      socket.emit("chat", payload);
    }
    setNewMsg("");
  };

  const handleConnect = async () => {
    const payload = {
      user,
      room: chatroom,
    };
    socket.emit("join", payload);
    socket.on("join", async (data) => {
      const newMessages = [...messages, data];
      setMessages(newMessages);
      setConnected(true);
    });
  };

  const handleDisconnect = async () => {
    socket.emit("leave", { user, room: chatroom }, () => {
      socket.disconnect();
    });
  };

  useEffect(() => {
    socket = io(urlToUse);

    socket.on("chat", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on("message_deleted", (data) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== data.message_id)
      );
    });

    socket.on("message_updated", (data) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === data.message_id ? { ...msg, msg: data.new_body } : msg
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [chatroom, user]);

<<<<<<< HEAD
  
=======
  if (!channel) {
    return <div>Loading channel...</div>;
  }
>>>>>>> 2bba975c880c979e4c31ae5a1652fd3dd72c5332

  return (
    <div className="pageContainer">
      <h1>{channel.name}</h1>
      <div className="connectButtons">
        <div>
          <button onClick={handleConnect}>Connect</button>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      </div>
      <div className="message-box">
        {connected ? (
          messages.map((message, id) => (
            <div className="message-container" key={message.id || id}>
              {editMessageId === message.id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div>
                    <button onClick={submitEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="msg">{message.msg}</p>
                  <p className="msg-user">{message.user}</p>
                  {user.username === message.user && (
                  
                  <div className="message-controls">
                  <h1>{`${message.id} - ${id}`}</h1>
                      <button onClick={() => openEdit(message)}>Edit</button>
                      <button onClick={() => openDelete(message.id)}>
                        Delete
                      </button>
                      <div>
                        <Reactions_Modal messageId={message.id} />
                      </div>
                    </div>
                  )}
                </>
              )}

              {deleteMessageId === message.id && (
                <div>
                  <p>Are you sure you want to delete this message?</p>
                  <button onClick={confirmDelete}>Yes, Delete</button>
                  <button onClick={cancelDelete}>Cancel</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <h2>Not Connected!</h2>
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignContent: "center",
          marginTop: "12px",
        }}
      >
        <input
          className="text-box"
          placeholder="Start Joking around"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button onClick={sendChat}>send</button>
      </div>
    </div>
  );
}

export default GetMessages;
