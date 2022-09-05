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
  justify-content: center;
`;

export const SmallHeading = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleContainer = styled.div<NavProp>`
  display: flex;
  height: 80px;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
`;

export const ListItems = styled.li``;
