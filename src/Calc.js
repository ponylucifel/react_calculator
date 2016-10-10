import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import './Calc.css';
import Report from './Report'

/* eslint-disable */


var executeOp = function(prevVal, op, currentVal){
    if(op =='div')
        return prevVal/currentVal;
    if(op == 'mul')
        return prevVal*currentVal;
    if(op == 'add')
        return prevVal+currentVal;
    if(op == 'sub')
        return prevVal-currentVal;
}

var report = {};

var Calc = React.createClass({
    getInitialState: function() {
        return {displayText: '0', bank: 0, prev: 0, op: ''};
    },
    onClick: function(event) {
        var value;
        var bank;
        var prev = this.state.prev;
        var op = this.state.op;
        switch (event.target.value){
            case 'clear':
                value = '0';
                bank = 0;
                prev = 0;
                break;
            case 'flip':
                value = -1*parseFloat(this.state.displayText);
                break;
            case 'perc':
                value = parseFloat(this.state.displayText)/100;
                bank = 0;
                break;
            case 'div':
                op = 'div';
                if(this.state.op != ''){
                    prev = executeOp(this.state.prev, this.state.op, parseFloat(this.state.displayText));
                    value = prev;
                    report = {displayVal:value, opDone: this.state.prev+ ' ' + this.state.op + ' ' + this.state.displayText + ' = '};
                } else{
                    prev = parseFloat(this.state.displayText);
                    value = this.state.displayText;
                }

                bank = 0;
                break;
            case 'mul':
                op = 'mul';
                if(this.state.op != ''){
                    prev = executeOp(this.state.prev, this.state.op, parseFloat(this.state.displayText));
                    value = prev;
                    report = {displayVal:value, opDone: this.state.prev+ ' ' + this.state.op + ' ' + this.state.displayText + ' = '};
                } else{
                    prev = parseFloat(this.state.displayText);
                    value = this.state.displayText;
                }
                bank = 0;
                break;
            case 'sub':
                op = 'sub';
                if(this.state.op != ''){
                    prev = executeOp(this.state.prev, this.state.op, parseFloat(this.state.displayText));
                    value = prev;
                    report = {displayVal:value, opDone: this.state.prev+ ' ' + this.state.op + ' ' + this.state.displayText + ' = '};
                } else{
                    prev = parseFloat(this.state.displayText);
                    value = this.state.displayText;
                }
                bank = 0;
                break;
            case 'add':
                op = 'add';
                if(this.state.op != ''){
                    prev = executeOp(this.state.prev, this.state.op, parseFloat(this.state.displayText));
                    value = prev;
                    report = {displayVal:value, opDone: this.state.prev+ ' ' + this.state.op + ' ' + this.state.displayText + ' = '};
                } else{
                    prev = parseFloat(this.state.displayText);
                    value = this.state.displayText;
                }
                bank = 0;
                break;
            case 'equal':
                value = this.state.displayText;
                if(this.state.prev != 0) {
                    value = executeOp(this.state.prev, this.state.op, parseFloat(this.state.displayText));
                    report = {displayVal:value, opDone: this.state.prev+ ' ' + this.state.op + ' ' + this.state.displayText + ' = '};
                }
                bank = 0;
                prev = 0;
                op = '';
                break;
            case 'dot':
                value = this.state.displayText +'.';
                break;
            default:
                if(this.state.bank == 0) {
                    value = event.target.value;
                    bank = parseInt(event.target.value);
                }
                else {
                    value = this.state.displayText + event.target.value;
                    bank = parseFloat(value);
                }
                break;
        }
        //console.log("current value: "+ value +" bank: "+bank+" previous: "+prev+" op: "+op);
        //console.log('report: ' + report);
        if(op == '')
            this.setState({displayText: value, bank: bank, prev: 0, op: ''});
        else
            this.setState({displayText: value, bank: bank, prev: prev, op: op});
    },
    render: function() {
        return (
            <div className="page-container">
                <div className="Calc-container">
                    <div>
                        <h2>React Calculator</h2>
                    </div>
                    <div className="Calc-display">
                        <h2>{this.state.displayText}</h2>
                    </div>
                    <div className="Calc-buttons">
                        <div className="firstRow">
                            <Button onClick={this.onClick} value="clear">AC</Button>
                            <Button onClick={this.onClick} value="flip">+/-</Button>
                            <Button onClick={this.onClick} value="perc">%</Button>
                            <Button id="operators" onClick={this.onClick} value="div">/</Button>
                        </div>
                        <div>
                            <Button onClick={this.onClick} value="7">7</Button>
                            <Button onClick={this.onClick} value="8">8</Button>
                            <Button onClick={this.onClick} value="9">9</Button>
                            <Button id="operators" onClick={this.onClick} value="mul">x</Button>
                        </div>
                        <div>
                            <Button onClick={this.onClick} value="4">4</Button>
                            <Button onClick={this.onClick} value="5">5</Button>
                            <Button onClick={this.onClick} value="6">6</Button>
                            <Button id="operators" onClick={this.onClick} value="sub">-</Button>
                        </div>
                        <div>
                            <Button onClick={this.onClick} value="1">1</Button>
                            <Button onClick={this.onClick} value="2">2</Button>
                            <Button onClick={this.onClick} value="3">3</Button>
                            <Button id="operators" onClick={this.onClick} value="add">+</Button>
                        </div>
                        <div>
                            <Button className="zero" onClick={this.onClick} value="0">0</Button>
                            <Button onClick={this.onClick} value="dot">.</Button>
                            <Button id="operators" onClick={this.onClick} value="equal">=</Button>
                        </div>
                    </div>
                    <Report state={report}/>
                </div>

            </div>

        )
    }
});
export default Calc;
