// -- ACTION TYPES --
const GET_ALL_REACTIONS = "reactions/getAllReactions";
const CREATE_A_REACTION = "reactions/createAReaction";
const DELETE_A_REACTION = "reactions/deleteAReaction";


// -- ACTION CREATOR --
export const getAllReactionsAction = (data) => ({
        type: GET_ALL_REACTIONS,
        payload: data
});

export const createAReactionAction = (reaction) => ({
    type: CREATE_A_REACTION,
    payload: reaction,
});
export const deleteAReactionAction = (reaction) => ({
    type: DELETE_A_REACTION,
    payload: reaction,
})


// -- THUNK ACTION --
export const getAllReactionsThunk = (messageId) => async (dispatch) => {
    try{
        const options = {
            method: "GET",
        }
        const response = await fetch(`/api/channel_message/${messageId}/reaction`, options);
        if (response.ok) {
            const data = await response.json();
            // console.log("where are my messg", data)
            dispatch(getAllReactionsAction(data));
        }else {
            throw response;
        }
    } catch (e){
        console.log(e)

    }
};

// create a reaction
export const createAReactionThunk = (emojiBody) => async (dispatch) => {
    try{
         

        const {channel_message_id} = emojiBody;
        // console.log(message, "ayo?")
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(emojiBody)
        }

        const response = await fetch(`/api/channel_message/${channel_message_id}/reaction`, options);
        if (response.ok) {
            const data = await response.json();
            dispatch(createAReactionAction(data));
        }else {
            throw response;
        }
    } catch (e){
        console.log(e)
    }
};

// delete a reaction 

export const deleteReactionThunk = (reaction_id, channel_message_id) => async (dispatch) => {
    try {
    console.log('this is how we:', reaction_id)
    const response = await fetch(`/api/channel_message/${channel_message_id}/reaction`, {
    method: "DELETE",
    });
    if (response.ok) {
        
        dispatch(deleteAReactionAction(reaction_id));
    }
} catch (e){
    console.log(e)
}
};

// -- REDUCER --

const initialState = {
    allReactions: [],
    byId: {},
}

 const reactionsReducer = (state = initialState, action) => {
    let newState;
    let newById = {...state.byId};
    let newAllReactions = [...state.allReactions];
    let reactionArr;
    let newReaction;
    let newReactionId;
    switch(action.type) {
        case GET_ALL_REACTIONS:
            reactionArr = action.payload;
            // console.log("before", messageArr)
            newState = { ...state };
            newState.allReactions = reactionArr;
            for (let rec of reactionArr) {
                newById[rec.id] = rec;
            }
            newState.byId = newById;
            return newState;
        case CREATE_A_REACTION:
            newState = {...state};
            newReaction = action.payload;
            newReactionId = newReaction.id;
            // update byId and allReactions
            newById[newReactionId] = newReaction;
            newState.byId = newById;
            newState.allReactions = [...newAllReactions, newReaction];
            return newState
        case DELETE_A_REACTION:
            newState = { ...state };
            delete newState.allReactions[action.payload];
            return newState;
        default:
            return state
    }
 };


 export default reactionsReducer