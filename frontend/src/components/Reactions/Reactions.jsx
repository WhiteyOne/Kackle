import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"





function Reactions_Modal({ message_id }) {
    const dispatch = useDispatch();
    const messageReactions = useSelector((state) => state)
    const sessionUser = useSelector((state) => state.session.user);

    // const reactionCheck = sessionUser.id === messageReactions.user_id && messageReactions.channel_message_id === message_id
    // hasReacted should check against the user to see if channel_message_id and user_id already exsist i.e. user_id = sessionUser.id
    const [hasReacted, setHasReacted] = useState(reactionCheck)
    const [emoji, setEmoji] = useState(null)

    const emojiArray = ["😜", "😂", "😉", "🤣", "🤪", "😜", "🥴", "🤤", "🔥"]
    const messageReactionsDummy = [{ id=1, emoji="😉", channel_message_id=1, user_id=1 }]

    const addReaction = async (e, reaction) => {
        e.preventDefault();
        setEmoji(emoji)
        if (hasReacted) {
            setEmoji
        } else {
            dispatch(postMessageReactionThunk(reaction))
        }
    }

    return (
        <>
            {/* this card should show all the reactions given per message */}
            <div className="emoji-display-card">
                {messageReactionsDummy.map}
            </div>
            {/* this card should show all the clickable reactions */}
            <div className="emoji-create-card">
                {emojiArray.map((emoji, idx) => (
                    <div>
                        <button onClick={(e) => { addReaction(e, emoji) }} key={`${emoji} -${idx}- ${Date().now}`}>{emoji}</button>
                    </div>
                ))}
            </div>
        </>
    )
}
