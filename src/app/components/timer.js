import React from 'react';
import { connect } from 'react-redux';

import store from './../store';

class Timer extends React.Component{

    constructor(props){

        super(props);

        this.isOnTimer = false;
    }

    componentWillReceiveProps(nextProps){

        if (this.props.appState !== nextProps.appState) {
            this.clearTimer();
        }
    }

    startTimer(){

        let
            getTime = () => {return this.props.timerState + 1;};

        this.isOnTimer = true;

        this.timerId = setInterval(() => {

            store.dispatch({
              type: 'NEXT_SECOND',
              timerState: getTime()
            })

        }, 1000);
    }

    clearTimer() {

        clearInterval(this.timerId);

        this.isOnTimer = false;

        store.dispatch({
          type: 'ZEROING',
          timerState: 0
        })
    }

    render() {

        if (this.isOnTimer === false) {
            this.startTimer();
        }

        return(

            <div className="timerBlock">
                {this.props.timerState}
            </div>

        )
    }
};

const mapStateToProps = function(store) {

    return {
        appState: store.appState.appState,
        timerState: store.timerState.timerState
    };
}

export default connect(mapStateToProps)(Timer);
