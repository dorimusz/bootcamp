import styled from "styled-components";
import { Colors } from "../../enums/colorEnums";

export const CardsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  row-gap: 40px;
  column-gap: 30px;
  justify-content: center;
  heigth: fit-content;
`;

export const Card = styled.div`
  background: ${Colors.DarkBlue};
  width: 27%;
  min-width: 300px;
  height: 220px;
  border-radius: 24px;
  box-shadow: -2px -5px 4px rgba(0, 0, 0, 0.25),
    2px 5px 5px rgba(115, 213, 151, 0.4);
  padding: 1rem;
`;
