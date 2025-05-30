import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Reactions.css";
import { createAReactionThunk, deleteReactionThunk, getAllReactionsThunk } from "../../redux/reactions";

function Reactions_Modal({messageId}) {
  const dispatch = useDispatch();
//   const { channelId } = useParams();
  const seemojis = useSelector((state) => state.reactions.allReactions);
  const sessionUser = useSelector((state) => state.session.user);
//   const userId = sessionUser.id;
//   const reactionCheck = userId === messageReactions.userId && messageId === messageReactions.messageId 

  // hasReacted should check against the user to see if channel_message_id and user_id already exsist i.e. user_id = sessionUser.id
//   const [hasReacted, setHasReacted] = useState(reactionCheck);
  const [emoji, setEmoji] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getThunks = async () => {
      await dispatch(getAllReactionsThunk(messageId));
      setIsLoaded(true);
    };
    if (!isLoaded) {
      getThunks();
      setIsLoaded(true);
    } 
  }, [dispatch, isLoaded, messageId]);


  const emojiArray = ["😜", "😂", "😉", "🤣", "🤪", "😜", "🥴", "🤤", "🔥"];
  // const messageReactionsDummy = [{ id=1, emoji="😉", channel_message_id=1, user_id=1 }]


 
  const emojiBody = {
    emoji: emoji,
    channel_message_id: messageId,
    user_id: sessionUser.id
  }


 const toggleReaction = async (e, emoji) => {
  e.preventDefault();
    setEmoji(emoji);
    const emojiMatch = seemojis.find(seemoji => seemoji.emoji === emoji);
    if (!emojiMatch) {
      setEmoji;
      dispatch(createAReactionThunk(emojiBody));
    } else {
      dispatch(deleteReactionThunk(messageId, emojiMatch.id))
      dispatch(getAllReactionsThunk(messageId));
  }
   }




  if (!isLoaded) {
    return <h1>Loading. . . </h1>
  } else {

  return (
    <>
      
      {/* this card should show all the reactions given per message /}
            <div className="emoji-display-card">
                {messageReactionsDummy.map}
            </div>
            {/ this card should show all the clickable reactions */}





    
        <ul className="seemoji-list">
            {seemojis.map((seemoji, idx) => (
              
               
              <li className="seemojis" key={`${idx}-${seemoji.id}`}>
                {seemoji.emoji}
              </li>
            ))}     
      </ul>
        
        
             
      <div className="emoji-create-card">
        {emojiArray.map((emoji, idx) => (
          <div key={idx}>
            <button
              
              onClick={(e) => {
                toggleReaction(e, emoji);
              }}
              
            >
              {emoji}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
}
export default Reactions_Modal;