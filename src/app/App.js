import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import store from './store';

import LevelBlock from './components/levelBlock';
import GameBlock from './components/gameBlock/gameBlock';

import createNewGame from './func/createNewGame';

import './App.css';

class App extends React.Component{

    constructor(props){

        super(props);
        this.startNewGame = this.startNewGame.bind(this);
    }

    getgameWrap(){

        return this.props.appState === 0 ?
                  <div className="startWrap">COME ON</div> :
                  <GameBlock level={this.currentGameLevel} game={this.game} />;
    }

    startNewGame() {

        let newAppState = this.props.appState + 1;

        this.currentGameLevel = this.props.levelState;
        this.game = createNewGame(this.currentGameLevel);

        store.dispatch({
            type: 'CLICK_START_GAME',
            appState: newAppState
        });
    }

    render() {

        let gameWrap = this.getgameWrap();

        return(

            <div className="app">

                <div className="appHeader">
                    MINESWEEPER
                </div>

                <div className="gameWrap">

                    <div className="sidebar">
                        <LevelBlock/>

                        <div className='buttonBlock'>
                            <button onClick={this.startNewGame}>NEW GAME</button>
                        </div>
                    </div>

                    {gameWrap}

                </div>
            </div>
        )
    }
};

const mapStateToProps = function(store) {

    return {
        appState: store.appState.appState,
        // gameState: store.gameState.gameState,
        levelState: store.levelState.levelState,
        timerState: store.timerState.timerState
    };
}

export default connect(mapStateToProps)(App);
