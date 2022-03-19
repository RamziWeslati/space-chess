import { King, Queen, Rook, Bishop, Knight, Pawn } from "."

export enum PieceNotation {
  WP = "White Pawn",
  WN = "White Knight",
  WB = "White Bishop",
  WR = "White Rook",
  WQ = "White Queen",
  WK = "White King",
  BP = "Black Pawn",
  BN = "Black Knight",
  BB = "Black Bishop",
  BR = "Black Rook",
  BQ = "Black Queen",
  BK = "Black King",
}

export const renderPiece = (piece: PieceNotation | null) => {
  if (!piece) return null

  const { BR, BN, BB, BK, BQ, BP, WR, WN, WB, WK, WQ, WP } = PieceNotation
  if (piece === BR) return <Rook color="black" />
  if (piece === BN) return <Knight color="black" />
  if (piece === BB) return <Bishop color="black" />
  if (piece === BK) return <King color="black" />
  if (piece === BQ) return <Queen color="black" />
  if (piece === BP) return <Pawn color="black" />
  if (piece === WR) return <Rook color="white" />
  if (piece === WN) return <Knight color="white" />
  if (piece === WB) return <Bishop color="white" />
  if (piece === WK) return <King color="white" />
  if (piece === WQ) return <Queen color="white" />
  if (piece === WP) return <Pawn color="white" />

  return null
}
