export const isLegalPosition = (position: number[], boardSize: number) =>
  position.every((crd) => crd >= 0 && crd < boardSize)

const updateIfLegal = (
  candidatePosition: number[],
  moves: number[][],
  boardSize: number,
) => {
  if (isLegalPosition(candidatePosition, boardSize))
    moves.push(candidatePosition)
}

export const getLegalMovesForPawn = (
  i: number,
  j: number,
  boardSize: number,
  direction: "main" | "reverse",
) => {
  const legalMoves: number[][] = []
  if (direction === "main") {
    updateIfLegal([i - 1, j], legalMoves, boardSize)
  }
  if (direction === "reverse") {
    updateIfLegal([i + 1, j], legalMoves, boardSize)
  }

  return legalMoves
}

export const getLegalMovesForRook = (
  i: number,
  j: number,
  boardSize: number,
) => {
  const legalMoves: number[][] = []
  for (let rowColumnIdx = 0; rowColumnIdx < boardSize; rowColumnIdx++) {
    updateIfLegal([rowColumnIdx, j], legalMoves, boardSize)
    updateIfLegal([i, rowColumnIdx], legalMoves, boardSize)
  }

  return legalMoves
}

export const getLegalMovesForBishop = (
  i: number,
  j: number,
  boardSize: number,
  direction: "main" | "reverse",
) => {
  // TODO fix this and implement reverse
  const legalMoves: number[][] = []
  for (let rowColumnIdx = 0; rowColumnIdx < boardSize; rowColumnIdx++) {
    if (direction === "main") {
      const mainDiagOffset =
        Math.min(i - j, j - i) === 0 ? 0 : Math.max(i - j, j - i)
      const secondDiagOffset =
        Math.min(i - (boardSize - 1 - j), j - i) === 0
          ? 0
          : Math.max(i - (boardSize - 1 - j), j - i)
      updateIfLegal(
        [rowColumnIdx, rowColumnIdx - mainDiagOffset],
        legalMoves,
        boardSize,
      )
      updateIfLegal(
        [boardSize - rowColumnIdx - 1, rowColumnIdx - secondDiagOffset],
        legalMoves,
        boardSize,
      )
    }
  }

  return legalMoves
}

export const getLegalMovesForKnight = (
  i: number,
  j: number,
  boardSize: number, // TODO
) => []

export const getLegalMovesForKing = (
  i: number,
  j: number,
  boardSize: number,
) => {
  const legalMoves: number[][] = []
  updateIfLegal([i + 1, j], legalMoves, boardSize)
  updateIfLegal([i - 1, j], legalMoves, boardSize)
  updateIfLegal([i, j + 1], legalMoves, boardSize)
  updateIfLegal([i, j - 1], legalMoves, boardSize)
  updateIfLegal([i + 1, j + 1], legalMoves, boardSize)
  updateIfLegal([i + 1, j - 1], legalMoves, boardSize)
  updateIfLegal([i - 1, j - 1], legalMoves, boardSize)
  updateIfLegal([i - 1, j + 1], legalMoves, boardSize)

  return legalMoves
}

export const getLegalMovesForQueen = (
  i: number,
  j: number,
  boardSize: number,
  direction: "main" | "reverse",
) => [
  ...getLegalMovesForRook(i, j, boardSize),
  ...getLegalMovesForBishop(i, j, boardSize, direction),
]
