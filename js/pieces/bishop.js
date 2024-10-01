var Bishop = function(config) {
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});

Bishop.prototype.isValidPosition = function(targetPosition) {
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Calculate the differences in rows and columns
    let colDifference = Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDifference = Math.abs(targetPosition.row - currentRow);

    // Bishop moves diagonally, so the row difference should equal the column difference
    if (colDifference === rowDifference) {
        return true;
    }

    // If the move is not diagonal, it's invalid for a bishop
    console.warn("Invalid move for bishop");
    return false;
}

Bishop.prototype.moveTo = function(targetPosition, board) {
    if (this.isValidPosition(targetPosition)) {
        const targetPiece = board.getPieceAt(targetPosition);
        if(targetPiece && targetPiece.color !== this.color){
            targetPiece.kill(targetPiece, board);
            // return;
        } 
        // Update the bishop's position to the new position
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    } else {
        // Invalid move, do nothing
    }
}

