// -- ACTION TYPES --
const GET_ALL_SERVERS = "servers/getAllServers";
const CREATE_A_SERVER = "servers/createAServer";


// -- ACTION CREATOR --
export const getAllServersAction = (data) => ({
        type: GET_ALL_SERVERS,
        payload: data
});

export const createAServerAction = (server) => ({
    type: CREATE_A_SERVER,
    payload: server,
})


// -- THUNK ACTION --
export const getAllServersThunk = () => async (dispatch) => {
    try{

        const response = await fetch("/api/server");
        if (response.ok) {
            const data = await response.json();
            // console.log("where are my servers", data)
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
        console.log(server, "ayo?")
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(server)
        }

        const response = await fetch("/api/server", options);
        if (response.ok) {
            const data = await response.json();
            // console.log("where are my servers", data)
            dispatch(createAServerAction(data));
        }else {
            throw response;
        }
    } catch (e){
        console.log(e)
    }
};

// -- REDUCER --

const initialState = {
    allServers: [],
    byId: {},
}

 const serversReducer = (state = initialState, action) => {
    let newState;
    let newById = {...state.byId};
    let newAllServers = [...state.allServers];
    switch(action.type) {
        case GET_ALL_SERVERS:
            const serversArr = action.payload;
            // console.log("before", serversArr)
            newState = { ...state };
            newState.allServers = serversArr;
            for (let serv of serversArr) {
                newById[serv.id] = serv;
            }
            newState.byId = newById;
            return newState;
        case CREATE_A_SERVER:
            newState = {...state};
            const newServer = action.payload;
            const newServerId = newServer.id;
            // update byId and allServers
            newById[newServerId] = newServer;
            newState.byId = newById;
            newState.allServers = [...newAllServers, newServer];
            return newState
        default:
            return state
    }
 };


 export default serversReducer
