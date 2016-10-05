export default (size, mines) => {
  const board = [];

  while (board.length < size.y) {
    board.push([]);
    while (board[board.length - 1].length < size.x) {
      board[board.length - 1].push(0);
    }
  }

  const setMine = (x, y) => (board[x][y] = 'mine');
  const isMine = (x, y) => board[x][y] === 'mine';
  const isCellInBoard = (x, y) => (
    x >= 0 && x < size.x &&
    y >= 0 && y < size.y
  );
  const getAdjacentCells = (x, y) => ([
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y - 1 },
    { x: x + 1, y: y - 1 },
  ]);

  mines.forEach(({ x, y }, index) => {
    if (!isCellInBoard(x, y)) {
      throw new Error(`Mine ${index} outside the board`);
    }

    setMine(x, y);
    getAdjacentCells(x, y)
      .filter(cell => isCellInBoard(cell.x, cell.y) && !isMine(cell.x, cell.y))
      .map(cell => (board[cell.x][cell.y] += 1));
  });

  return {
    getCells: () => board,
    isMine,
    isCellInBoard,
    getAdjacentCells,
  };
};
