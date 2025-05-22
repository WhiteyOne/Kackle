
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ChannelMessages.css";
import { useEffect, useState } from "react";
import { getAllMessagesThunk, createAMessageThunk } from "../../redux/channel_messages";
// import update button
// import delete button



function GetMessages() {
    const { serverId, channelId } = useParams();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const messages = useSelector((state) => state.message);
    const allMessages = useSelector(state => state.message.allMessages);

    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (messages.allMessages.length === 0 && serverId && channelId) {
            dispatch(getAllMessagesThunk(serverId, channelId));
        }
    }, [dispatch, messages.allMessages.length, serverId, channelId]);
       

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createAMessageThunk(serverId, channelId, newMessage));
        setNewMessage("");
      };

    useEffect(
        function(){

            if (!sessionUser){
                navigateTo('/')
            }
        }
    );



  return (
    <div className="everything">
        <span className="h1">
            <h1>This will be a Server O_0</h1>
        </span>
        

        <div className="home-icon"> Home Icon
            <div className="smaller-div">Other Things</div>
        </div>
        <div className="server-icon"> Server Icon
            <div className="channels">Channels</div>
        </div>
        <div className="account-div">Account Icon</div>
          <h2> Messages! </h2>
      <ul>
        {allMessages.map(message => (
          <li key={message.body} className="server-item">
              {message.body}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your joke here"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
          maxLength={500}
        />
        <button type="submit">Send</button>
      </form>
    </div>

  );
}

export default GetMessages;