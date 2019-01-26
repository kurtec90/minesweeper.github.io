import { combineReducers } from 'redux';

// Reducers
import appReducer from './appReducer';
import levelReducer from './levelReducer';
import gameReducer from './gameReducer';
import timerReducer from './timerReducer';

// Combine Reducers
var reducers = combineReducers({

    appState: appReducer,
    levelState: levelReducer,
    gameState: gameReducer,
    timerState: timerReducer

});

export default reducers;
