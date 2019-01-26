const initialState = {
    timerState: 0
};

const timerReducer = function(state = initialState, action) {

    switch(action.type) {

        case 'NEXT_SECOND':
            return Object.assign({}, state, { timerState: action.timerState });

        case 'ZEROING':
            return Object.assign({}, state, { timerState: action.timerState });

        default:
            return state;
    }
}

export default timerReducer;
