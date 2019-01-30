import React from 'react';
import { connect } from 'react-redux';

import store from './../store';

import levelParam from './../levelParam';

class LevelBlock extends React.Component{

    constructor(props){

        super(props);
    }

    getRadioRows(){

        let
            currentChecked = this.props.levelState,
            changeStateFunc = this.changeLevel,
            rows = [];

        levelParam.forEach(function(item, i){

            let
                newRow =
                    <div key={i}>
                        <input type="radio" name="level" value={item.name}
                            checked={item.name === currentChecked}
                            onChange={changeStateFunc} />

                        <label> {item.name.toUpperCase()} </label>
                    </div>;

            rows.push(newRow);
        })

        return rows;
    }

    changeLevel(e) {

        store.dispatch({
            type: 'CHANGE_LEVEL',
            levelState: e.target.value
        })
    }

    render() {

        //update checked radio rows
        let radioRows = this.getRadioRows();

        return(

            <div className="levelBlock">
                {radioRows}
            </div>
        )
    }
};

const mapStateToProps = function(store) {

    return {
        levelState: store.levelState.levelState
    };
}

export default connect(mapStateToProps)(LevelBlock);
