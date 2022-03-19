import React, { useState } from "react"
import { isEqual } from "lodash"
import { Color } from "../../../stylesheet"
import { BoardContainer, RowContainer } from "./Board.style"
import { DraggableData, DraggableEvent, DraggableProps } from "react-draggable"
import {
  SquareOccupantNotation,
  useBoardWithDrag,
} from "../../../service/game/board"
import SquareWithDrag from "../SquareWithDrag"
import { isLegalPosition } from "../../../service/game/moves"
import { UpdateParams } from "../../organismes/Game/Game.component"
import { renderPiece } from "../../atoms/Piece/Piece.service"
import { cloneDeep } from "lodash"

export type BoardTheme = {
  light: Color
  dark: Color
}

type SquareMode = keyof BoardTheme

type Props = {
  theme: BoardTheme
  population: SquareOccupantNotation[][]
  getLegalMovesForPiece: (i: number, j: number) => number[][]
  updateGame: (params: UpdateParams) => void
}

type RenderRowParams = {
  rowNumber: number
  population: SquareOccupantNotation[]
  theme: BoardTheme
  startColor: SquareMode
  draggableProps: Partial<DraggableProps>
  legalMoves: number[][]
  computeLegalMoves: (i: number, j: number) => void
  curryOnDragStop: (
    position: number[],
  ) => (e: DraggableEvent, data: DraggableData) => void
}

const renderRow = ({
  rowNumber,
  theme,
  startColor,
  population,
  draggableProps,
  legalMoves,
  computeLegalMoves,
  curryOnDragStop,
}: RenderRowParams) => {
  const startSquare = theme[startColor]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const endSquare = Object.entries(theme).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([colorKey, _]) => colorKey !== startColor,
  )![1]
  return population.map((element, i) => {
    const squareColor = i % 2 ? startSquare : endSquare
    return (
      // eslint-disable-next-line react/jsx-key
      <SquareWithDrag
        data-testid="board-square"
        color={squareColor}
        squareOccupant={renderPiece(element)}
        dragProps={{
          ...draggableProps,
          onStart: () => computeLegalMoves(rowNumber, i),
          onStop: curryOnDragStop([rowNumber, i]),
        }}
        canPlaceElement={
          !!legalMoves.find((position) => isEqual(position, [rowNumber, i]))
        }
      />
    )
  })
}

const Board: React.FC<Props> = ({
  population,
  theme,
  getLegalMovesForPiece,
  updateGame,
}) => {
  const [legalMoves, setlegalMoves] = useState<number[][]>([])
  const { boardRef, draggableProps } = useBoardWithDrag(population.length)
  const clearLegalMoves = () => setlegalMoves([])
  const computeLegalMoves = (i: number, j: number) => {
    const computedLegalMoves = getLegalMovesForPiece(i, j)

    if (isEqual(computedLegalMoves, legalMoves)) clearLegalMoves()
    else setlegalMoves(computedLegalMoves)
  }
  const curryOnDragStop =
    (oldPosition: number[]) => (e: DraggableEvent, data: DraggableData) => {
      clearLegalMoves()
      const [i, j] = oldPosition

      const [stepWidth, stepHeight] = draggableProps.grid ?? [1, 1]
      const newPosition = [
        i + data.lastY / stepHeight,
        j + data.lastX / stepWidth,
      ]
      if (
        isLegalPosition(newPosition, population.length) &&
        !isEqual(newPosition, oldPosition)
      ) {
        const updatedPosition = cloneDeep(population)
        updatedPosition[newPosition[0]][newPosition[1]] =
          updatedPosition[oldPosition[0]][oldPosition[1]]
        updatedPosition[oldPosition[0]][oldPosition[1]] = null

        updateGame({ updatedPosition })
      }
    }

  return (
    <BoardContainer ref={boardRef}>
      {population.map((rowPopulation, i) => (
        // eslint-disable-next-line react/jsx-key
        <RowContainer>
          {renderRow({
            rowNumber: i,
            population: rowPopulation,
            theme,
            startColor: i % 2 ? "dark" : "light",
            draggableProps,
            legalMoves,
            computeLegalMoves,
            curryOnDragStop,
          })}
        </RowContainer>
      ))}
    </BoardContainer>
  )
}

export default Board
