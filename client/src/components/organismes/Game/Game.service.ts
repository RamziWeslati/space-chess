import { SquareOccupantNotation } from "../../../service/game/board"
import {
  getLegalMovesForBishop,
  getLegalMovesForKing,
  getLegalMovesForKnight,
  getLegalMovesForPawn,
  getLegalMovesForQueen,
  getLegalMovesForRook,
} from "../../../service/game/moves"
import { PieceNotation } from "../../atoms/Piece/Piece.service"

export const curryPossibleMovesFromPosition =
  (position: SquareOccupantNotation[][]) => (i: number, j: number) => {
    const pieceNotation = position[i][j]

    const { BR, BN, BB, BK, BQ, BP, WR, WN, WB, WK, WQ, WP } = PieceNotation
    if (pieceNotation === BP || pieceNotation === WP)
      return getLegalMovesForPawn(i, j, position.length, "main")
    if (pieceNotation === BR || pieceNotation === WR)
      return getLegalMovesForRook(i, j, position.length)
    if (pieceNotation === BB || pieceNotation === WB)
      return getLegalMovesForBishop(i, j, position.length, "main")
    if (pieceNotation === BN || pieceNotation === WN)
      return getLegalMovesForKnight(i, j, position.length)
    if (pieceNotation === BQ || pieceNotation === WQ)
      return getLegalMovesForQueen(i, j, position.length, "main")
    if (pieceNotation === BK || pieceNotation === WK)
      return getLegalMovesForKing(i, j, position.length)
    return []
  }
