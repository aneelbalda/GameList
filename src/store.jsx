import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { ApiStatusReducer } from './Reducer/ApiStatusReducer';
import { GameReducer } from './Reducer/GameReducer';

const combinedReducer = combineReducers({ApiStatusReducer,GameReducer});

export const rootReducer = (state, action) =>{
    return combinedReducer(state, action);
}
// let middlewares = [thunk, logger];
let middlewares = [thunk];


const store = createStore(rootReducer,{}, compose(applyMiddleware(...middlewares)));

export default store;