// import { csrfFetch } from "../csrf.js";


// *GET ALL & GET ONE*



const ALL_SERVERS = "servers/getAllServers";

const servers = (servers) => {
    return {
        type: ALL_SERVERS,
        payload: servers
    };
};


// GetAllServers Thunk -------------

export const allServers = () => async (dispatch) => {
    const response = await csrfFetch("/api/servers");
    const data = await response.json();
    dispatch(servers(data.Servers))
    return data;
};

// GetAllServers Reducer -------------

const initialState = {
    allServers: null,
    singleServer: null,
    userServers: []
}

 const serversReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_SERVERS: {
            const newState = {...state};
            newState.servers = {};
            action.payload.forEach(function(element) {
                newState.servers[element.id] = element;
            });
            return newState;
        }}
 };

 
 export default serversReducer