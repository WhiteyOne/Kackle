// TEMP TO GET TO MESSAGES CAN BE OVERWRITEN 

// -- ACTION TYPES --
const GET_ALL_CHANNELS = "channels/getAllChannels";



// -- ACTION CREATOR --
export const getAllChannelsAction = (data) => ({
        type: GET_ALL_CHANNELS,
        payload: data
});



// -- THUNK ACTION --
export const getAllChannelsThunk = (serverId) => async (dispatch) => {
    try{

        const response = await fetch(`/api/server/${serverId}/channels`);
        if (response.ok) {
            const data = await response.json();
            // console.log("where are my channels", data)
            dispatch(getAllChannelsAction(data));
        }else {
            throw response;
        }
    } catch (e){
        console.log(e)
    }
};


// -- REDUCER --

const initialState = {
    allChannels: [],
    byId: {},
}

 const channelReducer = (state = initialState, action) => {
    let newState;
    let newById = {...state.byId};
    // let newAllChannels = [...state.allChannels];
    switch(action.type) {
        case GET_ALL_CHANNELS:
            const channelsArr = action.payload;
            // console.log("before", channelsArr)
            newState = { ...state };
            newState.allChannels = channelsArr;
            for (let chan of channelsArr) {
                newById[chan.id] = chan;
            }
            newState.byId = newById;
            return newState;
    
        default:
            return state
    }
 };


 export default channelReducer
