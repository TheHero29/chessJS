var Bishop = function(config) {
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});

Bishop.prototype.isValidPosition = function(targetPosition, board) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let colDifference = Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDifference = Math.abs(targetPosition.row - currentRow);

    if (colDifference === rowDifference) {
        return this.isPathClear(targetPosition, board);
    }

    console.warn("Invalid move for bishop");
    return false;
}

Bishop.prototype.isPathClear = function(targetPosition, board) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    let targetCol = targetPosition.col;
    let targetRow = targetPosition.row;

    let colStep = targetCol > currentCol ? 1 : -1;
    let rowStep = targetRow > currentRow ? 1 : -1;

    let col = currentCol.charCodeAt(0) + colStep;
    let row = currentRow + rowStep;

    while (col !== targetCol.charCodeAt(0) && row !== targetRow) {
        let position = String.fromCharCode(col) + row;
        if (board.getPieceAt({ col: String.fromCharCode(col), row })) {
            return false; 
        }
        col += colStep;
        row += rowStep;
    }

    return true; 
}

Bishop.prototype.moveTo = function(targetPosition, board) {
    if (this.isValidPosition(targetPosition, board)) {
        const targetPiece = board.getPieceAt(targetPosition);
        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece, board);
        } 
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    } else {
        alert("Invalid move for the bishop!");
        console.warn("Move blocked or invalid for bishop");
    }
}
