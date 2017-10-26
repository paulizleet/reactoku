import React from 'react';
import ReactDOM from 'react-dom';
import {getPossibilities} from '../lib/solver.js';
import {isBoardSolved} from '../lib/solver.js';
import {tryReplace} from '../lib/solver.js';
import {findNull} from '../lib/solver.js';
import {prettyBoard} from '../lib/solver.js';
import {getCurrentFrame} from '../lib/handy.js';
import {getCurrentRows} from '../lib/handy.js';
import {getCurrentPossibilities} from '../lib/handy.js';
import {getCurrentCursorPosition} from '../lib/handy.js';
import {quickCopy} from '../lib/handy.js';

import './index.css';


class Row extends React.Component{

  renderNumber(r, c, i){
    let num = (r*9)+c;
    return   (<Number
              value={i}
              onChange={(e) => this.props.onChange(e)}
              />)
  }

  render(){
    let i = this.props.rowNum
    return(
    <div className="row">

      {this.renderNumber(i, 0, this.props.numbers[0])}
      {this.renderNumber(i, 1, this.props.numbers[1])}
      {this.renderNumber(i, 2, this.props.numbers[2])}
      {this.renderNumber(i, 3, this.props.numbers[3])}
      {this.renderNumber(i, 4, this.props.numbers[4])}
      {this.renderNumber(i, 5, this.props.numbers[5])}
      {this.renderNumber(i, 6, this.props.numbers[6])}
      {this.renderNumber(i, 7, this.props.numbers[7])}
      {this.renderNumber(i, 8, this.props.numbers[8])}

    </div>
  );
  }

}

class Number extends React.Component{

  render(){
    return (
    <input
      className="number"
      value={this.props.value == null ? "-" : this.props.value}
      onChange={() => this.props.onChange(event)}
      />
    )
  }
}

class Sudoku extends React.Component{

  constructor(){
    super();
    var boardString = '-1--2-3----4--3-5--2------6--57---2----1----8-7--98---3----5-9----9--2-5--6------'
    var rows = []


    for(var i = 0; i < 9; i++){
      var slice = boardString.slice(i*9, i*9+9).split("");

      rows.push(slice.map(function(x){return x == "-" ? null : parseInt(x)}));
    }
    //this.handleChange = this.handleChange.bind(this);
    this.state = {
      stack: [{
        level: 0,
        rows: rows,
        cursorPosition: [-1, -1],
        possibilities: []
      }]

      //weight: 2
    };
  }
  solve(){
    console.log("solving");

    renderSudoku();
    let frame = getCurrentFrame(this.state);

    prettyBoard(frame.rows);

    if(frame.cursorPosition[0] == -1){

      let cursorAndPossibilities = findNull(frame.rows)
      frame.cursorPosition = cursorAndPossibilities[0];
      frame.possibilities = cursorAndPossibilities[1];
    }

    if(frame.possibilities.length != 0){

      frame.rows[frame.cursorPosition[0]][frame.cursorPosition[1]] = frame.possibilities.pop();

      let newRows = quickCopy(frame.rows);

      let newframe = {
                      level: frame.level+1,
                      rows: newRows,
                      cursorPosition: [-1, -1],
                      possibilities: []
                    }
      this.state.stack.push(newframe);

    } else {
      this.state.stack.pop()
    }
  }

  handleSubmit(event, num){
    event.preventDefault();
    console.log(event);
    console.log(num);
    console.log("Something changed!")
  }
  changeNumber(x, y, i){
    console.log(this);
    this.state.row[x][y] = i;
  }

  renderRow(i) {
    return <Row className='row'
      rowNum={i}
      numbers={getCurrentRows(this.state)[i]}
      onChange={(e, num) => this.handleChange(e, num)}
    />
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <button onClick={() => this.start()}>Solve</button>

        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
        {this.renderRow(6)}
        {this.renderRow(7)}
        {this.renderRow(8)}
      </form>
    )
  }

  renderSudoku(){
    console.log("rendering");
    ReactDOM.render(

      <Sudoku />,
      document.getElementById('root')

    );
  }
}

function renderSudoku(){
  console.log("rendering");
  ReactDOM.render(

    <Sudoku />,
    document.getElementById('root')

  );
}

renderSudoku();
//setInterval(renderSudoku, 1000);
