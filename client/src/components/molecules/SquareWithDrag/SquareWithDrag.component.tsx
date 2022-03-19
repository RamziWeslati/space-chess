import React from "react"
import Draggable, { DraggableProps } from "react-draggable"
import { SquareOccupant } from "../../../service/game/board"
import { Color } from "../../../stylesheet"
import Square from "../../atoms/Square"
import { Circle } from "./SquareWithDrag.style"

type Props = {
  color: Color
  dragProps: Partial<DraggableProps>
  squareOccupant: SquareOccupant
  canPlaceElement: boolean
}

const SquareWithDrag: React.FC<Props> = ({
  color,
  dragProps,
  squareOccupant,
  canPlaceElement,
}) => {
  const renderContent = (
    content: SquareOccupant,
    canPlaceElement: boolean,
    squareColor: Color,
  ) => {
    if (content && canPlaceElement)
      return (
        <div>
          <Circle $color={squareColor} />
          {content}
        </div>
      )
    if (content) return <div>{content}</div>
    if (canPlaceElement) return <Circle $opacity />
    return null
  }

  const squareContent = renderContent(squareOccupant, canPlaceElement, color)
  return (
    <Square color={squareOccupant && canPlaceElement ? Color.lightRed : color}>
      {squareContent && <Draggable {...dragProps}>{squareContent}</Draggable>}
    </Square>
  )
}

export default SquareWithDrag
