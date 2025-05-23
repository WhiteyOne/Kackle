const ALL_CHANNELS_BY_SERVER = "channels/getAllChannelsByServer";
const CREATE_CHANNEL = "channels/createChannel";
const DELETE_CHANNEL = "channels/deleteChannel";
const UPDATE_CHANNEL = "channels/updateChannel";
const GET_CHANNEL = "channels/getChannel";  


const allChannels = (channels) => {
    return {
        type: ALL_CHANNELS_BY_SERVER,
        payload: channels
    };
}
const createChannel = (channel) => {
    return {
        type: CREATE_CHANNEL,
        payload: channel
    };
}
const deleteChannel = (channelId) => {
    return {
        type: DELETE_CHANNEL,
        payload: channelId
    };
}
const updateChannel = (channel) => {    
    return {
        type: UPDATE_CHANNEL,
        payload: channel
    };
}
const getChannel = (channel) => {
    return {
        type: GET_CHANNEL,
        payload: channel
    };
}
// GetAllChannelsByServer Thunk -------------
export const allChannelsByServer = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/server/${serverId}/channels/`);
    const data = await response.json();
    dispatch(allChannels(data.Channels))
    return data;
};
// CreateChannel Thunk -------------
export const createChannelThunk = (serverId, channel) => async (dispatch) => {
    const response = await fetch(`/api/server/${serverId}/channels/`, {
        method: "POST",
        body: JSON.stringify(channel)
    });
    const data = await response.json();
    dispatch(createChannel(data));
    return data;
};
// DeleteChannel Thunk -------------
export const deleteChannelThunk = (serverId, channelId) => async (dispatch) => {
    const response = await fetch(`/api/server/${serverId}/channels/${channelId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(deleteChannel(channelId));
    }
};
// UpdateChannel Thunk -------------
export const updateChannelThunk = (serverId, channelId, channel) => async (dispatch) => {
    const response = await fetch(`/api/server/${serverId}/channels/${channelId}`, {
        method: "PUT",
        body: JSON.stringify(channel)
    });
    const data = await response.json();
    dispatch(updateChannel(data));
    return data;
};
// GetChannel Thunk -------------
export const getChannelThunk = (serverId, channelId) => async (dispatch) => {
    const response = await fetch(`/api/server/${serverId}/channels/${channelId}`);
    const data = await response.json();
    dispatch(getChannel(data));
    return data;
};
// GetAllChannelsByServer Reducer -------------
const initialState = {
    allChannels: null,
    singleChannel: null
}
const channelsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_CHANNELS_BY_SERVER: {
            const newState = {...state};
            newState.allChannels = {};
            action.payload.forEach(function(element) {
                newState.allChannels[element.id] = element;
            });
            return newState;
        }
        case CREATE_CHANNEL: {
            const newState = {...state};
            newState.allChannels[action.payload.id] = action.payload;
            return newState;
        }
        case DELETE_CHANNEL: {
            const newState = {...state};
            delete newState.allChannels[action.payload];
            return newState;
        }
        case UPDATE_CHANNEL: {
            const newState = {...state};
            newState.allChannels[action.payload.id] = action.payload;
            return newState;
        }
        case GET_CHANNEL: {
            const newState = {...state};
            newState.singleChannel = action.payload;
            return newState;
        }
        default:
            return state;
    }
}
export default channelsReducer;