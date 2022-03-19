import { PieceNotation } from "../../components/atoms/Piece/Piece.service"

export const buildInitialBoardPosition = (): (PieceNotation | null)[][] => {
  const { BR, BN, BB, BK, BQ, BP, WR, WN, WB, WK, WQ, WP } = PieceNotation
  const blackPieces = [BR, BN, BB, BK, BQ, BB, BN, BR]
  const blackPawns = Array(8).fill(BP)
  const whitePawns = Array(8).fill(WP)
  const whitePieces = [WR, WN, WB, WK, WQ, WB, WN, WR]

  return [
    blackPieces,
    blackPawns,
    ...Array(4).fill(Array(8).fill(null)),
    whitePawns,
    whitePieces,
  ]
}
