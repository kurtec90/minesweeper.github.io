const initialState = {
    gameState: 0
};

const gameReducer = function(state = initialState, action) {

    switch(action.type) {

        case 'CLICK_ACTION':
            return Object.assign({}, state, { gameState: action.gameState });

        default:
            return state;
    }
}

export default gameReducer;
