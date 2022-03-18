import { Bishop } from "./Bishop"
import { King } from "./King"
import { Knight } from "./Knight"
import { Pawn } from "./Pawn"
import { Queen } from "./Queen"
import { Rook } from "./Rook"

type PieceProps = {
  color: "white" | "black"
  rotate?: boolean
}

export type { PieceProps }
export { King, Queen, Rook, Bishop, Knight, Pawn }
