// -- ACTION TYPES --
const GET_ALL_SERVERS = "servers/getAllServers";
const CREATE_A_SERVER = "servers/createAServer";
const DELETE_A_SERVER = "servers/deleteAServer";
const GET_ONE_SERVER = "servers/getOneServer";
const UPDATE_SERVER = "servers/updateServer";


// -- ACTION CREATOR --
export const getAllServersAction = (data) => ({
        type: GET_ALL_SERVERS,
        payload: data
});

export const createAServerAction = (server) => ({
    type: CREATE_A_SERVER,
    payload: server,
});

export const deleteAServerAction = (serverId) => ({
    type: DELETE_A_SERVER,
    payload: serverId,
});

export const getOneServerAction = (server) => ({
    type: GET_ONE_SERVER,
    payload: server,
});

export const updateServerAction = (server) => ({
    type: UPDATE_SERVER,
    payload: server,
});

// -- THUNK ACTION --
// ✅✅
export const getAllServersThunk = () => async (dispatch) => {
    try{

        const response = await fetch("/api/server");
        if (response.ok) {
            const data = await response.json();
            dispatch(getAllServersAction(data));
        }else {
            throw response;
        }
    } catch (e){
        console.log(e)
    }
};

// create a post
export const createAServerThunk = (server) => async (dispatch) => {
    try{
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(server)
        }

        const response = await fetch("/api/server", options);
        if (response.ok) {
            const data = await response.json();
            dispatch(createAServerAction(data));
            return data;
        }else {
            throw response;
        }
    } catch (e){
        console.log(e)
    }
};

export const deleteAServerThunk = (serverId) => async (dispatch) => {
    const options = {
        method: "DELETE",
    }
    
    const response = await fetch(`/api/server/${serverId}/hmm`, options);
    
    if (response.ok) {
        console.log("82 of selete server😜", serverId)
        console.log(response)
            dispatch(deleteAServerAction(serverId, options));
        }else {
            throw response;
        }
};

export const getOneServerThunk = (serverId) => async (dispatch) => {

        const response = await fetch(`/api/server/${serverId}`);
        if (response.ok) {
            const data = await response.json();
            dispatch(getOneServerAction(data));
            return data
        }else {
            throw response;
        }
    } 

export const updateServerThunk = (serverId, server) => async (dispatch) => {

        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(server)
        }

        const response = await fetch(`/api/server/${serverId}`, options);
        if (response.ok) {
            const data = await response.json();
            dispatch(updateServerAction(data));
        }else {
            throw response;
        }
    } 

// -- REDUCER --

const initialState = {
    allServers: [],
    byId: {},
    singleServer: null,
}

 const serversReducer = (state = initialState, action) => {
    let newState;
    let newById = {...state.byId};
    let newAllServers = [...state.allServers];

    switch(action.type) {
        case GET_ALL_SERVERS:{
            const serversArr = action.payload;
            newState = { ...state };
            newState.allServers = serversArr;
            for (let serv of serversArr) {
                newById[serv.id] = serv;
            }
            newState.byId = newById;
            return newState;
        }
        case CREATE_A_SERVER: {
            newState = {...state};
            const newServer = action.payload;
            const newServerId = newServer.id;
            // update byId and allServers
            newById[newServerId] = newServer;
            newState.byId = newById;
            newState.allServers = [...newAllServers, newServer];
            return newState
        }
        case DELETE_A_SERVER: {
            const serverId = action.payload;
            newState = {...state};
            // delete from byId     
            delete newById[serverId];
            newState.byId = newById;
            // delete from allServers   
            newAllServers = newAllServers.filter((server) => server.id !== serverId);
            newState.allServers = newAllServers;
            return newState
        }
        case GET_ONE_SERVER: {
            const server = action.payload;
            newState = {...state};
            //update byId
            newById[server.id] = server;
            newState.byId = newById;
            //update singleServer
            newState.singleServer = server;
            return newState
        }
        case UPDATE_SERVER: {
            const updatedServer = action.payload;
            newState = {...state};
            newById[updatedServer.id] = updatedServer;
            newState.byId = newById;
            newState.allServers = newAllServers.map(server => 
                server.id === updatedServer.id ? updatedServer : server) 
            if (newState.singleServer && newState.singleServer.id === updatedServer.id) {
                newState.singleServer = updatedServer;
            }   
             return newState;
        }
        default:
            return state
    }
 };


 export default serversReducer
