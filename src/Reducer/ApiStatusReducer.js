import _ from 'lodash';
function ApiStatusReducer( state = {}, action){
    switch(action.type){
        case 'SET_GAME_LIST_API_STATUS':
            return {
                ...state,
                gameApiStatus : action.payload,
            }
        default:
            return state;
    }
}

function getApiStatus(state, apiName){
    return _.get(state,['ApiStatusReducer',apiName]);
}

export { getApiStatus, ApiStatusReducer };