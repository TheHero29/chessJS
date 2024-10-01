var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};

Knight.prototype = new Piece({});

Knight.prototype.isValidPosition = function(targetPosition){
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Convert target position to row and column
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Calculate the absolute differences in column and row
    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDiff = Math.abs(targetRow - currentRow);

    // Check if the move is valid (L-shape)
    if ((colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2)) {
        return true;
    }

    // If the move is not valid, log a warning and return false
    console.warn("Invalid move for knight");
    return false;
}

Knight.prototype.moveTo = function(targetPosition, board){    
    if(this.isValidPosition(targetPosition)){
        const targetPiece = board.getPieceAt(targetPosition);
        if(targetPiece && targetPiece.color !== this.color){
            targetPiece.kill(targetPiece, board);
            // return;
        } 

        this.position = targetPosition.col + targetPosition.row;
        this.render();
    }else{
        //NOOP
    }
}
