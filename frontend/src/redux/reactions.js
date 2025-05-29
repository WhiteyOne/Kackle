// // -- ACTION TYPES --
// const GET_ALL_REACTIONS = "reactions/getAllReactions";
// const CREATE_A_REACTION = "reactions/createAReaction";
// const DELETE_A_REACTION = "reactions/deleteAReaction";


// // -- ACTION CREATOR --
// export const getAllReactionsAction = (data) => ({
//         type: GET_ALL_REACTIONS,
//         payload: data
// });

// export const createAReactionAction = (reaction) => ({
//     type: CREATE_A_REACTION,
//     payload: reaction,
// });
// export const deleteAReactionAction = (reaction) => ({
//     type: DELETE_A_REACTION,
//     payload: reaction,
// })


// // -- THUNK ACTION --
// export const getAllReactionsThunk = (serverId, channelId, messageId, reactionId) => async (dispatch) => {
//     try{

//         const response = await fetch(`/api/server/${serverId}/channel/${channelId}/message/${messageId}/reactions` );
//         if (response.ok) {
//             const data = await response.json();
//             // console.log("where are my messg", data)
//             dispatch(getAllReactionsAction(data));
//         }else {
//             throw response;
//         }
//     } catch (e){
//         console.log(e)

//     }
// };

// // create a reaction
// export const createAReactionThunk = (serverId, channelId, messageId, reactionBody) => async (dispatch) => {
//     try{
//         const reaction = {
//             body: reactionBody,
//             channel_id: channelId,
//             message_id: messageId
//         };
//         // console.log(message, "ayo?")
//         const options = {
//             method: "POST",
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(reaction)
//         }

//         const response = await fetch(`/api/server/${serverId}/channel/${channelId}/message/${messageId}/reactions`, options);
//         if (response.ok) {
//             const data = await response.json();
//             dispatch(createAReactionAction(data));
//         }else {
//             throw response;
//         }
//     } catch (e){
//         console.log(e)
//     }
// };

// // delete a reaction 

// export const deleteReactionThunk = (serverId, channelId, messageId, reactionId) => async (dispatch) => {
//     const reponse = await fetch(`/api/server/${serverId}/channel/${channelId}/message/${messageId}/reactions/${reactionId}`, {
//     });
//     if (response.ok) {
//         dispatch(deleteReaction(reactionId));
//     }
// }

// // -- REDUCER --

// const initialState = {
//     allReactions: [],
//     byId: {},
// }

//  const reactionsReducer = (state = initialState, action) => {
//     let newState;
//     let newById = {...state.byId};
//     let newAllReactions = [...state.allReactions];
//     switch(action.type) {
//         case GET_ALL_REACTIONS:
//             const reactionArr = action.payload;
//             // console.log("before", messageArr)
//             newState = { ...state };
//             newState.allReactions = reactionArr;
//             for (let rec of reactionArr) {
//                 newById[rec.id] = rec;
//             }
//             newState.byId = newById;
//             return newState;
//         case CREATE_A_REACTION:
//             newState = {...state};
//             const newReaction = action.payload;
//             const newReactionId = newReaction.id;
//             // update byId and allServers
//             newById[newReactionId] = newReaction;
//             newState.byId = newById;
//             newState.allReactions = [...newAllReactions, newReaction];
//             return newState
//         case DELETE_A_REACTION:
//             newState = { ...state };
//             delete newState.allReactions[action.payload];
//             return newState;
//         default:
//             return state
//     }
//  };


//  export default reactionsReducer
