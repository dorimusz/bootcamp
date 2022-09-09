import styled from "styled-components";
import { Colors } from "../../enums/colorEnums";

export const PrimaryButton = styled.button`
  border-radius: 20px;
  height: 2rem;
  width: 10rem;
  background: ${Colors.WhiteColor};
  margin: 0 1.5rem;
  padding: 0.1rem;
  text-align: center;
  vertical-align: middle;
  box-shadow: -2px -5px 5px rgba(122, 77, 255, 0.8),
    2px 4px 4px rgba(249, 247, 248, 0.8);
  &:hover {
    box-shadow: -2px -5px 4px rgba(0, 0, 0, 0.25),
      2px 5px 5px rgba(115, 213, 151, 0.4);
  }
`;
