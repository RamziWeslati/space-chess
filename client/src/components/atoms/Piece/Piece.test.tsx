import { render } from "@testing-library/react"
import type { PieceProps } from "."
import * as Piece from "."

describe("<Piece />", () => {
  it("shoud render", () => {
    const pieceProps: PieceProps = {
      color: "black",
      rotate: true,
    }
    for (const PieceComponent of Object.values(Piece)) {
      render(<PieceComponent {...pieceProps} />)
    }
  })
})
