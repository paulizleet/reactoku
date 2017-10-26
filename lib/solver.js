

function solve(board){
  //let board = getBoard(board_string);
  console.log(board)
  // let rows = board.state.rows;
  // rows[0][0] = "hello";
  // board.setState({rows: rows});

  return solveThisBoard(board);
}

function solveThisBoard(board){
  //prettyBoard(board);
  //board.setState({rows: board})
  let coor = true;

  while(coor != false){
    coor = findNull(board);
    if(coor == undefined){break}
    if(coor != false){
      return tryReplace(board, coor);
    }

  }
  return board;
}

function tryReplace(board, coor){
  var isSolved = false;
  var possibilities = getPossibilities(board, coor);
  for(var i = coor[0]; i < 10 ; i++){
    if(possibilities.includes(i)){
      console.log(i);
        board[coor[i]][coor[j]] = i;
        isSolved = solveThisBoard(board);
        if( isSolved != false ){break};
        board[coor[0]][coor[1]] = null;
      }
    }

  return false
}

function findNull(board, curs1 = 0, curs2 = 0){
  var possibilityWeight = 1;

  while(possibilityWeight <= 9){

    console.log("getting null");
      for(let i = 0; i < 9; i ++){
        for(let j = 0; j < 9; j++){
          if(board[i][j] == null){
            console.log("got one");
            let possibilities = getPossibilities(board, [i,j]);
            if(possibilities.length <= possibilityWeight){
              return [[i,j], possibilities];
            }
          }
        }
      }
    possibilityWeight++;
    }
  console.log("No empty squares");
  return false
}

function getPossibilities(board, coor){
  let nonPossibilities = []
  nonPossibilities = nonPossibilities.concat(
      getRow(board, coor[0]).filter(function(number){
        return number != null;
      }));
  nonPossibilities = nonPossibilities.concat(
      getColumn(board, coor[1]).filter(function(number){
        return number != null;
      }));

  nonPossibilities = nonPossibilities.concat(
      getSuperBox(board, Math.floor(coor[0]/3), Math.floor(coor[1]/3))
      .filter(function(number){
        return number != null;
      }));

    return [1,2,3,4,5,6,7,8,9].filter(function(number){
      return !nonPossibilities.includes(number)
    })

}

function getRow(board, i){
  return board[i];
}

function getColumn(board, i){
  let col = [];
  for(row of board){col.push(row[i])};
  return col
}

function getSuperBox(board, x, y){
  let superBox = [];
  if( x > 2 || x < 0 || y > 2 || y < 0){
    return null;
  }
  for(let i = 0; i < 3 ; i++){
    superBox = superBox.concat(board[i+(3*x)].slice((3*y), (3*y)+3))
  }
  return superBox
}

function getBoard(boardString){
  let newBoard = [];
  for(let i = 0; i < 9; i++){
    let row = boardString.slice(i*9,(i*9) + 9);
    newBoard.push(row.split("").map(
      function(num){
        if(num == "-"){
          return null;
        }
        return Number(num);
      }
    ))
  }
  return newBoard;
}

function prettyBoard(board){

  for(row of board){
    let str = ""
    for(letter of row){
      if(letter == null){
        str += "-"
      }else {
      str += letter;
    }

    }
    console.log(str);

  }
}

function isBoardSolved(board){

  return checkRows(board) && checkColumns(board) && checkSuperBoxes(board);
}

function checkRows(board){
  console.log("Checking rows");
  console.log(board);

  for(row of board){
    if(row.sort() != [1,2,3,4,5,6,7,8,9]){return false}
  }
  return true
}

function checkColumns(board){
  //This is going to be inefficnent
  for(let i = 0; i < 9; i++){
    if(getColumn(board, i).sort() != [1,2,3,4,5,6,7,8,9]){return false};
  }
  return true;
}

function checkSuperBoxes(board){
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if(getSuperBox(board, i, j).sort() != [1,2,3,4,5,6,7,8,9]){return false};
    }
  }
  return true;
}

//prettyBoard(solve("-1--2-3----4--3-5--2------6--57---2----1----8-7--98---3----5-9----9--2-5--6------"))

//prettyBoard(solve("-1--2-3----4--3-5--2------6--57---2----1----8-7--98---3----5-9----9--2-5--6------"))

exports.getPossibilities = getPossibilities;
exports.solveSudoku= solve;
exports.isBoardSolved = isBoardSolved;
exports.tryReplace = tryReplace;
exports.findNull = findNull;
exports.prettyBoard = prettyBoard;
