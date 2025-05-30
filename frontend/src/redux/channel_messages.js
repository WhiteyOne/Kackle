// -- ACTION TYPES --
const GET_ALL_MESSAGES = "messages/getAllMessages";
const CREATE_A_MESSAGE = "messages/createAMessage";


// -- ACTION CREATOR --
export const getAllMessagesAction = (data) => ({
        type: GET_ALL_MESSAGES,
        payload: data
});

export const createAMessageAction = (message) => ({
    type: CREATE_A_MESSAGE,
    payload: message,
})


// -- THUNK ACTION --
export const getAllMessagesThunk = (serverId, channelId) => async (dispatch) => {
    try{

        const response = await fetch(`/api/server/${serverId}/channel/${channelId}/messages` );
        if (response.ok) {
            const data = await response.json();
            // console.log("where are my messg", data)
            dispatch(getAllMessagesAction(data));
        }else {
            throw response;
        }
    } catch (e){
        console.log(e)

    }
};

// create a post
export const createAMessageThunk = (serverId, channelId, messageBody) => async (dispatch) => {
    try{
        const message = {
            body: messageBody,
            channel_id: channelId
        };
        // console.log(message, "ayo?")
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(message)
        }

        const response = await fetch(`/api/server/${serverId}/channel/${channelId}/messages`, options);
        if (response.ok) {
            const data = await response.json();
            dispatch(createAMessageAction(data));
        }else {
            throw response;
        }
    } catch (e){
        console.log(e)
    }
};

// -- REDUCER --

const initialState = {
    allMessages: [],
    byId: {},
}

 const messagesReducer = (state = initialState, action) => {
    let newState;
    let newById = {...state.byId};
    let newAllMessages = [...state.allMessages];
    let messageArr;
    let newMessage;
    let newMessageId;
    switch(action.type) {
        case GET_ALL_MESSAGES:
            messageArr = action.payload;
            // console.log("before", messageArr)
            newState = { ...state };
            newState.allMessages = messageArr;
            for (let msg of messageArr) {
                newById[msg.id] = msg;
            }
            newState.byId = newById;
            return newState;
        case CREATE_A_MESSAGE:
            newState = {...state};
            newMessage = action.payload;
            newMessageId = newMessage.id;
            // update byId and allServers
            newById[newMessageId] = newMessage;
            newState.byId = newById;
            newState.allMessages = [...newAllMessages, newMessage];
            return newState
        default:
            return state
    }
 };


 export default messagesReducer
