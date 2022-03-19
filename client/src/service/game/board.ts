import { useCallback, useState } from "react"
import { DraggableProps } from "react-draggable"
import { PieceNotation } from "../../components/atoms/Piece/Piece.service"

export type SquareOccupant = JSX.Element | null
export type SquareOccupantNotation = PieceNotation | null

export const buildInitialBoardPosition = (): SquareOccupantNotation[][] => {
  const { BR, BN, BB, BK, BQ, BP, WR, WN, WB, WK, WQ, WP } = PieceNotation
  const blackPieces = [BR, BN, BB, BK, BQ, BB, BN, BR]
  const blackPawns = Array(8)
    .fill(0)
    .map(() => BP)
  const whitePawns = Array(8)
    .fill(0)
    .map(() => WP)
  const whitePieces = [WR, WN, WB, WK, WQ, WB, WN, WR]

  return [
    blackPieces,
    blackPawns,
    ...Array(4)
      .fill(0)
      .map(() =>
        Array(8)
          .fill(0)
          .map(() => null),
      ),
    whitePawns,
    whitePieces,
  ]
}

export const useBoardWithDrag = (boardDimensions: number) => {
  const [draggableProps, setDraggableProps] = useState<Partial<DraggableProps>>(
    {},
  )

  const boardRef = useCallback(
    (node) => {
      if (node) {
        const boardWidth = node.clientWidth ?? 0
        const boardHeight = node.clientHeight ?? 0
        const draggableProps: Partial<DraggableProps> = {
          grid: [boardHeight / boardDimensions, boardWidth / boardDimensions],
        }
        setDraggableProps(draggableProps)
      }
    },
    [boardDimensions],
  )

  return { draggableProps, boardRef }
}
