/* eslint-disable */

/**
 * Created by thanaponsathirathiwat on 10/8/16.
 */
import React from 'react'
import { createStore } from 'redux';
import { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import './Report.css'

/**
 * Redux pure function implemented here to keep track of the current state
 */
let allID = 0;

const historyReport = (state = [], action) => {
    switch (action.type) {
        case 'ADD_HISTORY':
            return [{text: action.text, opDone: action.opDone},...state]
        default:
            return state
    }
}

let store = createStore(historyReport);

let reflectChange = function(nextState){
    let currentState = store.getState();
    if (currentState.length == 0 && nextState.displayVal != 0)
        store.dispatch({type: 'ADD_HISTORY', text: nextState.displayVal, opDone: nextState.opDone});
    else if (currentState.length > 0 && nextState.displayVal != currentState[0].text)
        store.dispatch({type: 'ADD_HISTORY', text: nextState.displayVal, opDone: nextState.opDone});
}

const Report = (props) => {
        return (
            <div className="Report-container">
                <div>
                    <h2>User Log</h2>
                </div>
                <div className="canvas" onChange={reflectChange(props.state)}>
                    { store.getState().map(eachLog => <div key={allID++}>{eachLog.opDone}{eachLog.text}<br/></div>)}
                </div>
            </div>
        )
    }


export default Report



