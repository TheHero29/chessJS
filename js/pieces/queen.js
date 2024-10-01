var Queen = function(config){
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

Queen.prototype.isValidPosition = function(targetPosition){
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDiff = Math.abs(targetRow - currentRow);

    // The queen can move any number of squares vertically, horizontally, or diagonally
    if (colDiff === 0 || rowDiff === 0 || colDiff === rowDiff) {
        return true;
    }

    console.warn("Invalid move for queen");
    return false;
}

Queen.prototype.moveTo = function(targetPosition, board){    
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

