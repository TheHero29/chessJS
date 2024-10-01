var Rook = function(config){
    this.type = 'rook';
    // this.board = config.board;
    this.constructor(config);
};

Rook.prototype = new Piece({});
Rook.prototype.moveTo = function(targetPosition, board) {
    const targetSquare = targetPosition.col + targetPosition.row;
    // Check if the move is valid and the path is clear
    if (this.isValidMove(targetSquare) && this.isPathClear(targetSquare, board)) {
        const targetPiece = board.getPieceAt(targetPosition);
        if(targetPiece && targetPiece.color !== this.color){
            targetPiece.kill(targetPiece, board);
            // return;
        }        
        this.position = targetSquare;
        this.render();
    } else {
        alert('Invalid move for Rook or path is blocked');
    }
};

// Check if the move is valid for a Rook
Rook.prototype.isValidMove = function(targetSquare) {
    const currentRow = parseInt(this.position[1]);
    const currentCol = this.position.charCodeAt(0);
    const targetRow = parseInt(targetSquare[1]);
    const targetCol = targetSquare.charCodeAt(0);

    // Rook moves in straight lines, either rows or columns must match
    return currentRow === targetRow || currentCol === targetCol;
};


// Check if the path is clear for the Rook to move
Rook.prototype.isPathClear = function(targetSquare, board) {
    const currentRow = parseInt(this.position[1]);
    const currentCol = this.position.charCodeAt(0);
    const targetRow = parseInt(targetSquare[1]);
    const targetCol = targetSquare.charCodeAt(0);

      // Determine the step direction for rows and columns
    const rowStep = currentRow === targetRow ? 0 : Math.sign(targetRow - currentRow);
    const colStep = currentCol === targetCol ? 0 : Math.sign(targetCol - currentCol);

    let row = currentRow + rowStep;
    let col = currentCol + colStep;

    // Traverse the path to check for any pieces blocking the way
    while (row !== targetRow || col !== targetCol) {
        const position = String.fromCharCode(col) + row.toString();

         // If there's a piece in the way, the path is not clear
        if (board.getPieceAt({ col: String.fromCharCode(col), row: row.toString() })) {
            return false;
        }

        row += rowStep;
        col += colStep;
    }

    // If the path is clear, the move is valid
    return true;
};

