import _ from 'lodash';

function GameReducer( state = {}, action){
    switch(action.type){
        case 'SET_GAME_LIST':
            return {
                ...state,
                gameList : action.payload,
            }
        default:
            return state;
    }
}

function getGameList(state){
    return _.get(state.GameReducer,'gameList',[]);
}

export { getGameList, GameReducer };