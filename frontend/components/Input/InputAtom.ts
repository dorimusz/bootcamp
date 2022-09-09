import styled from "styled-components";
import { Colors } from "../../enums/colorEnums";

export const Holder = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;
export const IconHolder = styled.div`
  cursor: pointer;
`;

export const InputHolder = styled.div`
  position: relative;
`;

export const InputField = styled.input`
  border-radius: 25px;
  height: 2rem;
  width: 15rem;
  background: ${Colors.WhiteColor};
  margin: 0 0.1rem;
  padding: 1rem;
  color: ${Colors.DarkBlue};
`;

//InputHolder
// display: flex;
// flex: 1;
// flex-direction: row;
// justify-content: center;
// align-items: center;
