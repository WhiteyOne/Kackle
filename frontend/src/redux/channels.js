const ALL_CHANNELS_BY_SERVER = "channel/getAllChannelsByServer";
const CREATE_CHANNEL = "channel/createChannel";
const DELETE_CHANNEL = "channel/deleteChannel";
const UPDATE_CHANNEL = "channel/updateChannel";
const GET_CHANNEL = "channel/getChannel";

const allChannels = (channels) => {
  return {
    type: ALL_CHANNELS_BY_SERVER,
    payload: channels,
  };
};
const createChannel = (channel) => {
  return {
    type: CREATE_CHANNEL,
    payload: channel,
  };
};
const deleteChannel = (channelId) => {
  return {
    type: DELETE_CHANNEL,
    payload: channelId,
  };
};
const updateChannel = (channel) => {
  return {
    type: UPDATE_CHANNEL,
    payload: channel,
  };
};
const getChannel = (channel) => {
  return {
    type: GET_CHANNEL,
    payload: channel,
  };
};
// GetAllChannelsByServer Thunk -------------
export const allChannelsByServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/server/${serverId}/channel`);
  const data = await response.json();
  

  dispatch(allChannels(data));
  return data;
};
// CreateChannel Thunk -------------
export const createChannelThunk = (serverId, channel) => async (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(channel),
  };
  const response = await fetch(`/api/server/${serverId}/channel`, options);
  if (response.ok) {
    const data = await response.json();

    dispatch(createChannel(data));

    return data;
  } else {
    throw response;
  }
};
// DeleteChannel Thunk -------------
export const deleteChannelThunk = (serverId, channelId) => async (dispatch) => {
  const response = await fetch(`/api/server/${serverId}/channel/${channelId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteChannel(channelId));
  }
};
// UpdateChannel Thunk -------------
export const updateChannelThunk =
  (serverId, channelId, channel) => async (dispatch) => {
    console.log(serverId, channelId, channel,"😂")
    const response = await fetch(
      `/api/server/${serverId}/channel/${channelId}`,
      {
        method: "PUT",
        body: JSON.stringify(channel),
      }
    );
    const data = await response.json();
    dispatch(updateChannel(data));
    return data;
  };
// GetChannel Thunk -------------
export const getChannelThunk = (serverId, channelId) => async (dispatch) => {
  const response = await fetch(`/api/server/${serverId}/channel/${channelId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getChannel(data));
    return data;
  } else {
    console.log("Failed to fetch channel.");
    throw response;
  }
};
// GetAllChannelsByServer Reducer -------------
const initialState = {
  allChannels: {},
  singleChannel: null,
};
const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CHANNELS_BY_SERVER: {
      const newState = { ...state, allChannels: {} };
      if (Array.isArray(action.payload)) {
        action.payload.forEach(function (element) {
          newState.allChannels[element.id] = element;
        });
      } else {
        newState.allChannels = {};
      }
      return newState;
    }
    case CREATE_CHANNEL: {
      const newState = { ...state };
      newState.allChannels[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_CHANNEL: {
      const newState = { ...state };
      delete newState.allChannels[action.payload];
      return newState;
    }
    case UPDATE_CHANNEL: {
      const newState = { ...state };
      newState.allChannels[action.payload.id] = action.payload;
      return newState;
    }
    case GET_CHANNEL: {
      console;
      const newState = { ...state, singleChannel: action.payload };

      return newState;
    }
    default:
      return state;
  }
};
export default channelsReducer;