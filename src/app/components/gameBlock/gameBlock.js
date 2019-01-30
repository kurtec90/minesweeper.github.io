import React from 'react';
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

    componentWillUpdate() {

        if (this.mineCount === 0) {
            this.changeForWin();
        }
    }

    startNewGame(level){

        let newGame = createNewGame(level);

        this.endGame = null;

        this.saveMineCount(newGame);

        store.dispatch({
            type: 'CREATE_NEW_GAME',
            gameState: newGame
        })
    }

    changeForWin(){

        let

            mine = this.props.gameState.filter((item) => {
              return item.isMine;
            }),
            mineUser = this.props.gameState.filter((item) => {
              return item.isMine && item.blockState === 'mine';
            });

        if (mine.length === mineUser.length + 1) {
            this.endGame = 'win';
        }
    }

    saveMineCount(gameArr){

        let mineArr = [];

        mineArr = gameArr.filter((item) => {
            return item.isMine;
        });

        this.mineCount = mineArr.length;
    }


    changeMineCount(arr){

      let count = 0;

      arr.forEach((item) => {
          if (this.props.gameState[item].blockState === 'mine') {
            count++;
          }
      });

      this.mineCount = this.mineCount + count;
    }

    getMinefield(){

        let
            minefield = [],
            searchMine = this.searchMine,
            signIsMine = this.signIsMine;

        this.props.gameState.forEach((item, i) => {

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

        if (this.endGame !== null) {
            return;
        }

        let
            id = e.target.id,
            block = this.props.gameState[id];

        if (block.blockState === 'mine') {
            return;
        }

        if (block.isMine) {

            this.endGame = 'crash';
            this.changeBlockGame(id, 'mine');
            return;
        }

        if (block.content === 0 && block.blockState === 'close') {

            let emptyBlockArr = getEmptyBlockArr(id, this.props.gameState, this.props.level)

            this.changeEmptyBlockArr(emptyBlockArr);
        }

        this.changeBlockGame(id, 'open');
    }

    signIsMine(e){

        e.preventDefault();

        if (this.endGame !== null) {
            return;
        }

        let
            id = e.target.id;

        switch (this.props.gameState[id].blockState) {

          case 'open':
            break;

          case 'mine':
            this.mineCount++;
            this.changeBlockGame(id, 'close')
            break;

          case 'close':
            this.mineCount--;
            this.changeBlockGame(id, 'mine')
            break;

          default:
            break;
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

        this.changeMineCount(arr);

        store.dispatch({
            type: 'CHANGE_EMPTY_BLOCK_ARR',
            emptyArr: arr
        })
    }

    getEndGameBlock() {

        if (this.endGame !== null) {

            let text = this.endGame === 'crash' ?
                'CRASH GAME':
                'WIN GAME';

            return <div className="endGameBlock">{text}</div>;
        }
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

                {this.getEndGameBlock()}

            </div>
        )
    }
};

const mapStateToProps = function(store) {

    return {
        appState: store.appState.appState,
        gameState: store.gameState.gameState
        // timerState: store.timerState.timerState
    };
}

export default connect(mapStateToProps)(GameBlock);
