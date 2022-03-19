import React from "react"
import Square from "../../atoms/Square"
import { Color } from "../../../stylesheet"
import { BoardContainer, RowContainer } from "./Board.style"

type BoardTheme = {
  light: Color
  dark: Color
}

type SquareMode = keyof BoardTheme

type Props = {
  population: JSX.Element[][]
  theme: BoardTheme
}

const renderRow = (
  population: JSX.Element[],
  theme: BoardTheme,
  startColor: SquareMode,
) => {
  const startSquare = theme[startColor]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const endSquare = Object.entries(theme).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([colorKey, _]) => colorKey !== startColor,
  )![1]
  return population.map((element, i) => (
    <Square
      // eslint-disable-next-line react/no-array-index-key
      key={`square-${i}`}
      data-testid="board-square"
      color={i % 2 ? startSquare : endSquare}
    >
      {element}
    </Square>
  ))
}

const Board: React.FC<Props> = ({ population, theme }) => {
  return (
    <BoardContainer>
      {population.map((rowPopulation, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <RowContainer key={`row-${i}`}>
          {renderRow(rowPopulation, theme, i % 2 ? "dark" : "light")}
        </RowContainer>
      ))}
    </BoardContainer>
  )
}

export default Board
