const initialState = {
    gameState: []
};

const gameReducer = function(state = initialState, action) {

    switch(action.type) {

        case 'CREATE_NEW_GAME':
            return Object.assign({}, state, { gameState: action.gameState });

        case 'CHANGE_BLOCK_STATE_ACTION':

            let
                id = action.changeParam.id,
                newStateObj = {

                    gameState: [
                        ...state.gameState
                    ]
                };

            newStateObj.gameState[id] = {

                ...state.gameState[id],
                blockState: action.changeParam.blockState
            }

            return newStateObj;

        case 'CHANGE_EMPTY_BLOCK_ARR':

            let newState = {
                    gameState: [
                        ...state.gameState
                    ]
                };

            action.emptyArr.map((id) => {

              newState.gameState[id] = {

                  ...state.gameState[id],
                  blockState: 'open'
              }
            });

            return newState;

        default:
            return state;
    }
}

export default gameReducer;
