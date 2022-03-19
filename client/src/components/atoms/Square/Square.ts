import styled from "styled-components";
import { Color } from "../../../stylesheet";

type Props = {
  color: Color;
};

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props: Props) => props.color};
`;

export default Square;
