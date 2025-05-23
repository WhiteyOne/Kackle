import { useSelector } from "react-redux";
import "./ChannelMessages.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { urlToUse } from "../../config";


let socket;
function GetMessages() {
  const { channelId } = useParams();
  const user = useSelector((state)=> state.session.user)
  const channel = useSelector((state) => state.channel.byId[Number(channelId)])
  const [connected, setConnected] = useState(false);
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const chatroom = channelId;

  const sendChat = async(e) => {
    e.preventDefault();
    if(newMsg){
        const payload = {
            room: chatroom,
            user,
            message: newMsg
        };
        socket.emit("chat", payload)
    }
    setNewMsg("");

};

const handleConnect = async() => {
    const payload = {
        user,
        room: chatroom
    }
    socket.emit("join", payload);
    socket.on("join", async(data)=> {
        const newMessages = [...messages, data];
        setMessages(newMessages);
        setConnected(true)
    })
}

const handleDisconnect = async () => {
  socket.emit("leave", { user, room: chatroom }, () => {
    socket.disconnect();
  });
};

useEffect(()=> {

    socket = io(urlToUse);
    socket.on("chat", (data) => {
      setMessages((messages) => [...messages, data]);
  });
  
  return () => {
    socket.emit("leave", chatroom, () => {
        socket.disconnect();
    });
};
}, [chatroom, user])


return (
  <div className='pageContainer'>
      <h1> {channel.name}</h1>
      <div className='connectButtons'>
          <div>
              <button
                  onClick={handleConnect}> Connect</button>
                <button
                  onClick={handleDisconnect}> Disconnect</button>
          </div>
      </div>
      <div className='message-box'>
          { connected ? messages.map((message, id) => (
              <div className='message-container' key={`${id}`}>
                  <p className='msg'>{message.msg}</p>
                  <p className='msg-user'>{message.user}</p>
              </div>
          )) : <h2 style={{display: 'flex', justifyContent: 'center',}}>Not Connected!</h2>}
      </div>
      <div style={{
          display: 'flex',
          gap: '10px',
          alignContent: 'center'
      }}>
          <input
              className='text-box'
              placeholder='Start Joking around'
              value={newMsg}
              onChange={(e)=> setNewMsg(e.target.value)}
              />
              <button
              onClick={sendChat} >send</button>
      </div>

  </div>
);
}

export default GetMessages;

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import "./ChannelMessages.css";
// import { useEffect, useState } from "react";
// import { getAllMessagesThunk, createAMessageThunk } from "../../redux/channel_messages";
// // import update button
// // import delete button



// function GetMessages() {
//     const { serverId, channelId } = useParams();
//     const dispatch = useDispatch();
//     const navigateTo = useNavigate();
//     const sessionUser = useSelector((state) => state.session.user);
//     const messages = useSelector((state) => state.message);
//     const allMessages = useSelector(state => state.message.allMessages);

//     const [newMessage, setNewMessage] = useState("");

//     useEffect(() => {
//         if (messages.allMessages.length === 0 && serverId && channelId) {
//             dispatch(getAllMessagesThunk(serverId, channelId));
//         }
//     }, [dispatch, messages.allMessages.length, serverId, channelId]);
       

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await dispatch(createAMessageThunk(serverId, channelId, newMessage));
//         setNewMessage("");
//       };

//     useEffect(
//         function(){

//             if (!sessionUser){
//                 navigateTo('/')
//             }
//         }
//     );



//   return (
//     <div className="everything">
//         <span className="h1">
//             <h1>This will be a Server O_0</h1>
//         </span>
        

//         <div className="home-icon"> Home Icon
//             <div className="smaller-div">Other Things</div>
//         </div>
//         <div className="server-icon"> Server Icon
//             <div className="channels">Channels</div>
//         </div>
//         <div className="account-div">Account Icon</div>
//           <h2> Messages! </h2>
//       <ul>
//         {allMessages.map(message => (
//           <li key={message.body} className="server-item">
//               {message.body}
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Type your joke here"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           required
//           maxLength={500}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>

//   );
// }

// export default GetMessages;




// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import "./ChannelMessages.css";
// import { useEffect, useState } from "react";
// import { getAllMessagesThunk, createAMessageThunk } from "../../redux/channel_messages";
// // import update button
// // import delete button

// -------- TESTING WEBSOCKETS --------

