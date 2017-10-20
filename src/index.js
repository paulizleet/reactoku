import React from 'react';
import ReactDOM from 'react-dom';
import {getPossibilities} from '../lib/solver.js';
import {isBoardSolved} from '../lib/solver.js';
import {tryReplace} from '../lib/solver.js';
import {findNull} from '../lib/solver.js';
import {getCurrentRows} from '../lib/handy.js';
import {getCurrentPossibilities} from '../lib/handy.js';
import {getCurrentCursorPosition} from '../lib/handy.js';

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
        rows: rows,
        cursorPosition: [0,0],
        possibilities: []
      }]

      //weight: 2
    };
  }
  solve(){
    console.log("solving");

    while(!isBoardSolved(getCurrentRows(this.state))){
      var rows = getCurrentRows(this.state);
      var coor = findNull(rows);
      var possibilities = getPossibilities(rows, coor)

      if(possibilities == []){
        this.setState({stack: this.state.stack.pop()});
      } else {
        rows[coor[0]][coor[1]] = possibilities.pop();
        var newstate = this.state.stack
        console.log(newstate);
        newstate.push({
                        rows: rows,
                        cursorPosition: coor,
                        possibilities: possibilities
                      } );
        console.log(newstate);

        this.setState({stack: newstate})
      }


    // solveSudoku(this);
    // for(var i = 0; i < 9; i++){
    //   console.log(this.state.rows[i].join(" "));
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
          <button onClick={() => this.solve()}>Solve</button>
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
}

function renderSudoku(){

  ReactDOM.render(

    <Sudoku />,
    document.getElementById('root')

  );
}

renderSudoku();
