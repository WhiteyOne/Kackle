// import { csrfFetch } from "../csrf";

// *GET ALL & GET ONE*



// Action Type -------------

const GET_ALL_SERVERS = "servers/getAllservers";
 

// Action Creator -------------

export const getAllServersAction = (data) => ({
        type: GET_ALL_SERVERS,
        payload: data
    });



// GetAllServers Thunk -------------

export const getallServersThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/server");
    if (response.ok) {
        const data = await response.json();

        console.log("where are my servers", data)

        dispatch(getAllServersAction(data));

    } else {
        throw response;
    }    
};

// Reducers -------------

const initialState = {
    allServers: [],
    byId: {},
}

 const serversReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_ALL_SERVERS: {
            const serversArr = action.payload;

                console.log("before", serversArr)

            newState = {...state};
            newState.allServers = serversArr;
            let newByIdGetAllServers = {};
            for (let serv of serversArr) {
                newByIdGetAllServers[serv.id] = serv;
            }
            newState.byId = newByIdGetAllServers;
            return newState;
        }
        default:
            return state
    }
};
 


    export default serversReducer