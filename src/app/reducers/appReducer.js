const initialState = {
    appState: 0
};

const appReducer = function(state = initialState, action) {

    switch(action.type) {

        case 'CLICK_START_GAME':
            return Object.assign({}, state, { appState: action.appState });

        default:
            return state;
    }
}

export default appReducer;
