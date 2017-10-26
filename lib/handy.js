function getCurrentFrame(state){
  return state.stack[state.stack.length-1];
}
function getStackLevel(state){
  return state.stack[state.stack.length-1].level;
}

function getCurrentRows(state){
  return state.stack[state.stack.length-1].rows;
}

function getCurrentPossibilities(state){
  return state.stack[state.stack.length-1].possibilities;
}

function getCurrentCursorPosition(state){
  return state.stack[state.stack.length-1].cursorPosition;
}

function quickCopy(rows){
  let newArray = [];
  for(var row of rows){
    let newRow = [];
    for(var num of row){
      newRow.push(num);
    }
    newArray.push(newRow);
  }
  return newArray;
}



exports.getCurrentFrame = getCurrentFrame;
exports.getCurrentRows = getCurrentRows;
exports.getCurrentPossibilities = getCurrentPossibilities;
exports.getCurrentCursorPosition = getCurrentCursorPosition;
exports.quickCopy = quickCopy;
