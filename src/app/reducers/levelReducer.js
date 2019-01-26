// all level states
//    junior - 9/9/10
//    middle - 16/16/40
//    expert - 16/30/99

const initialState = {
    levelState: 'junior'
};

const levelReducer = function(state = initialState, action) {

    switch(action.type) {

        case 'CHANGE_LEVEL':
            return Object.assign({}, state, { levelState: action.levelState });

        default:
            return state;
    }
}

export default levelReducer;
