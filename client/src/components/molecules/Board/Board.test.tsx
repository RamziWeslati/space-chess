import { render, screen } from "@testing-library/react"
import Board from "."
import { Color } from "../../../stylesheet"

describe("<Board />", () => {
  const props = {
    population: Array(8).fill(Array(8).fill(<span>A</span>)),
    theme: {
      dark: Color.lightGreen,
      light: Color.lightYellow,
    },
  }

  it("should render", () => {
    render(<Board {...props} />)
  })

  it("should render all population", () => {
    render(<Board {...props} />)
    expect(screen.getAllByTestId("board-square")).toHaveLength(8 * 8)
  })

  it("should render empty squares when null populated", () => {
    render(<Board {...props} />)
    expect(screen.getAllByTestId("board-square")).toHaveLength(8 * 8)
  })
})
