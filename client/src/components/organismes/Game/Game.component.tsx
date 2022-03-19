import React, { useMemo, useState } from "react"
import {
  buildInitialBoardPosition,
  SquareOccupantNotation,
} from "../../../service/game/board"
import Board from "../../molecules/Board"
import { BoardTheme } from "../../molecules/Board/Board.component"
import { curryPossibleMovesFromPosition } from "./Game.service"

type Props = {
  theme: BoardTheme
}

export type UpdateParams = {
  updatedPosition: SquareOccupantNotation[][]
}

const Game: React.FC<Props> = ({ theme }) => {
  const [position, setPosition] = useState<SquareOccupantNotation[][]>(
    buildInitialBoardPosition,
  )
  const getLegalMovesForPiece = useMemo(
    () => curryPossibleMovesFromPosition(position),
    [position],
  )

  return (
    <Board
      theme={theme}
      population={position}
      getLegalMovesForPiece={getLegalMovesForPiece}
      updateGame={({ updatedPosition }) => setPosition(updatedPosition)}
    />
  )
}

export default Game
