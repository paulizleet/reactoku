function getCurrentRows(state){
  return state.stack[state.stack.length-1].rows;
}

function getCurrentPossibilities(state){
  return state.stack[state.stack.length-1].possibilities;
}

function getCurrentCursorPosition(state){
  return state.stack[state.stack.length-1].cursorPosition;
}



exports.getCurrentRows = getCurrentRows;
exports.getCurrentPossibilities = getCurrentPossibilities;
exports.getCurrentCursorPosition = getCurrentCursorPosition;
