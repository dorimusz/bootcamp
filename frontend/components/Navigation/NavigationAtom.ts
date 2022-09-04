import styled from "styled-components";
import { Colors } from "../../enums/colorEnums";

interface NavProp {
  justifyContent?: string;
}
export const NavItemWrapper = styled.ul`
  width: 100%;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flext-start;
`;

export const NavContainer = styled.nav`
  position: absolute;
  width: 200px;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: ${Colors.DarkBlue};
`;

export const TitleContainer = styled.div<NavProp>`
  display: flex;
  height: 80px;
  justifycontent: ${({ justifyContent }) => justifyContent || "center"};
  align-center: center;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  background: ${Colors.GreenColor};
`;

export const ListItems = styled.li``;
