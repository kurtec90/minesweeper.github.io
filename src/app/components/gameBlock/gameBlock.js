import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import store from '../../store';

import Timer from '../timer.js';
import createNewGame from '../../func/createNewGame';
import getEmptyBlockArr from '../../func/getEmptyBlockArr';

import './gameBlock.css';

class GameBlock extends React.Component{

    constructor(props){

        super(props);

        this.searchMine = this.searchMine.bind(this);
        this.signIsMine = this.signIsMine.bind(this);
    }

    componentWillMount(){

        this.startNewGame(this.props.level);
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.appState !== nextProps.appState) {
            this.startNewGame(nextProps.level);
        }
    }

    shouldComponentUpdate(nextProps){

        if (this.props.appState !== nextProps.appState && this.props.gameState === nextProps.gameState) {
            return false;
        }

        return true;
    }

    startNewGame(level){

        let newGame = createNewGame(level);

        this.saveMineCount(newGame);

        store.dispatch({
            type: 'CREATE_NEW_GAME',
            gameState: newGame
        })
    }

    saveMineCount(gameArr){

        let mineArr = [];

        mineArr = gameArr.filter((item) => {
            return item.isMine;
        });

        this.mineCount = mineArr.length;
    }

    getMinefield(){

        let
            minefield = [],
            searchMine = this.searchMine,
            signIsMine = this.signIsMine;

        this.props.gameState.map((item, i) => {

            let
                content = item.blockState === 'close' || item.blockState === 'mine' ?
                  '' : item.content === 0 ?
                  '' : item.content;

            minefield.push(
                <div
                    className={"oneBlock " + item.blockState}
                    onClick={searchMine}
                    onContextMenu={signIsMine}
                    id={item.id}
                    key={item.id}>

                    {content}

                </div>);
        })

        return minefield;
    }

    searchMine(e) {

        e.preventDefault();

        let
            id = e.target.id,
            block = this.props.gameState[id];

        if (block.blockState === 'mine') {
            return;
        }

        if (block.isMine) {
            this.endGame('crash');
            return;
        }

        if (block.content === 0 && block.blockState === 'close') {

            let emptyBlockArr = getEmptyBlockArr(id, this.props.gameState, this.props.level)

            this.changeEmptyBlockArr(emptyBlockArr);
        }

        this.changeBlockGame(id, 'open')
    }

    signIsMine(e){

        e.preventDefault();

        switch (this.props.gameState[e.target.id].blockState) {

          case 'open':
            return;

          case 'mine':
            this.mineCount++;
            this.changeBlockGame(e.target.id, 'close')
            break;

          case 'close':
            this.mineCount--;
            this.changeBlockGame(e.target.id, 'mine')
            break;

          default:
            return;
        }
    }

    changeBlockGame(id, newState){

        store.dispatch({
            type: 'CHANGE_BLOCK_STATE_ACTION',
            changeParam: {
              id: id,
              blockState: newState
            }
        })
    }

    changeEmptyBlockArr(arr){

        store.dispatch({
            type: 'CHANGE_EMPTY_BLOCK_ARR',
            emptyArr: arr
        })
    }

    endGame(param) {

      switch (param) {
        case 'crash':

          break;

        case 'win':

          break;

        default:
          break;

      }

        alert('LOSER');
    }

    render() {

        return(

            <div className="gameBlock">

                <div className="gamePanel">

                    <div className="mineCount">
                        {this.mineCount}
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
