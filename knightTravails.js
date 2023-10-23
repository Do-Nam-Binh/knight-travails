const posRegistry = new Map();

const chessPos = (x, y) => {
  const xPos = x;
  const yPos = y;
  let lastMove;
  const name = () => `${x}, ${y}`;

  knightMoves = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  const getLastMove = () => {
    return lastMove;
  };

  const setLastMove = (move) => {
    lastMove = move || lastMove;
  };

  const createMoves = () => {
    return knightMoves
      .map((move) => nextMove(move[0], move[1]))
      .filter((square) => square !== undefined);
  };

  const nextMove = (xOffset, yOffset) => {
    const [newX, newY] = [xPos + xOffset, yPos + yOffset];
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      return chessPos(newX, newY);
    }
  };

  if (posRegistry.has(name())) {
    return posRegistry.get(name());
  } else {
    newPos = { name, getLastMove, setLastMove, createMoves };
    posRegistry.set(name(), newPos);
    return newPos;
  }
};

const knightTravails = (start, goal) => {
  posRegistry.clear();

  const origin = chessPos(...start);
  const target = chessPos(...goal);

  const queue = [origin];
  while (!queue.includes(target)) {
    const currentPos = queue.shift();
    const enqueueList = currentPos.createMoves();

    enqueueList.map((square) => square.setLastMove(currentPos));
    queue.push(...enqueueList);
  }

  const path = [target];
  while (!path.includes(origin)) {
    const lastMove = path[0].getLastMove();
    path.unshift(lastMove);
  }

  path.forEach((square) => console.log(square.name(), " "));
};

knightTravails([0, 0], [7, 2]);
