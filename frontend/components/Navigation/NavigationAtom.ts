import styled from "styled-components";
import { Colors } from "../../enums/colorEnums";

interface NavProp {
  justifyContent?: string;
  color?: string;
  pathName?: string;
}

export const NavItemWrapper = styled.ul`
  width: 100%;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flext-start;
`;

//position: absolute, height: 100vh
export const NavContainer = styled.nav`
  position: fixed;
  width: 200px;
  height: 100%;
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
  padding: 1rem 0;
`;

export const ListItems = styled.li``;

export const LinkText = styled.a<NavProp>`
  color: ${(props) =>
    props.href === props.pathName ? Colors.GreenColor : Colors.WhiteColor};
  &:hover {
    color: ${Colors.RedColor};
  }
`;
