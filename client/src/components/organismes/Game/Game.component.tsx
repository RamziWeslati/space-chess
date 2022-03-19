import React from "react"
import { buildInitialBoardPosition } from "../../../service/game/board"
import { PieceNotation, renderPiece } from "../../atoms/Piece/Piece.service"
import Board from "../../molecules/Board"
import { BoardTheme } from "../../molecules/Board/Board.component"

type Props = {
  theme: BoardTheme
}

const Game: React.FC<Props> = ({ theme }) => {
  const initialPieces: (PieceNotation | null)[][] = buildInitialBoardPosition()

  return (
    <Board
      theme={theme}
      population={initialPieces.map((row) =>
        row.map((pieceNotation) => renderPiece(pieceNotation)),
      )}
    />
  )
}

export default Game
