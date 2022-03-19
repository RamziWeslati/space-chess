import styled from "styled-components"
import { Color } from "../../../stylesheet"

type Props = {
  $opacity?: boolean
  $color?: Color
}

export const Circle = styled.div`
  height: 50%;
  width: 50%;
  background-color: ${(props: Props) => props.$color ?? Color.lightGray};
  opacity: ${(props: Props) => (props.$opacity ? 0.3 : "inherit")};
  border-radius: 50%;
`
