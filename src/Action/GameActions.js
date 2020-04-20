import * as gameApi from '../Repository/GameRepository';

function fetchGameList(){
    return dispatch =>{
        dispatch({
            type: "SET_GAME_LIST_API_STATUS",
            payload : 'LOADING'
        })
        gameApi.fetchGameList().then( respose =>{
            dispatch({
                type: "SET_GAME_LIST",
                payload : respose.data
            });
            dispatch({
                type: "SET_GAME_LIST_API_STATUS",
                payload : 'SUCCESS'
            })
        }).catch(
            () =>{
                dispatch({
                    type: "SET_GAME_LIST_API_STATUS",
                    payload : 'FAILED'
                });
            }
        )
    }
}

export {fetchGameList};