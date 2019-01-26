import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import store from './../../store';

import bgClose from './bgClose.png';

import Timer from './../timer.js';

import './gameBlock.css';

class GameBlock extends React.Component{

    constructor(props){

        super(props);

        this.game = this.props.game;

        this.searchMine = this.searchMine.bind(this);
        this.signIsMine = this.signIsMine.bind(this);
    }

    componentWillReceiveProps(nextProps){

        if (this.props.appState !== nextProps.appState) {
          this.game = nextProps.game;
        }
    }

    getMineCount(){

        let mineCount = this.game.filter(function (item) {
            return item.isMine === true;
        });

        return mineCount.length;
    }


    getMinefield(){

        let
            minefield = [],
            searchMine = this.searchMine,
            signIsMine = this.signIsMine;

        this.game.forEach(function(item, i) {

            minefield.push(
                <div
                    className={"oneBlock " + item.blockState}
                    onClick={searchMine}
                    onContextMenu={signIsMine}
                    id={i}
                    key={i}>

                    {item.blockState === 'open' && item.content !== 0 ? item.content : ''}

                </div>);

        })

        return minefield;
    }

    searchMine(e) {

        e.preventDefault();

        this.changeBlockGame(e.target.id, 'open')
    }


    signIsMine(e){

        e.preventDefault();

        this.changeBlockGame(e.target.id, 'mine')
    }

    changeBlockGame(id, newState){

        let
            newGameState = this.props.gameState + 1;

        this.game[id].blockState = newState;

        store.dispatch({
            type: 'CLICK_ACTION',
            gameState: newGameState
        })
    }

    render() {
console.log(this.props.game);
        return(

            <div className="gameBlock">

                <div className="gamePanel">

                    <div className="mineCount">
                        {this.getMineCount()}
                    </div>

                    <Timer/>

                </div>

                <div className="gamezone">
                    <div className={"minefield " + this.props.level}>
                        {this.getMinefield()}
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = function(store) {

    return {
        appState: store.appState.appState,
        gameState: store.gameState.gameState
    };
}

export default connect(mapStateToProps)(GameBlock);
