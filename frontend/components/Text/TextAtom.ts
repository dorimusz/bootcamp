import styled from "styled-components";
import { Colors } from "../../enums/colorEnums";

//interface a propok adatasahoz, hogy miket fog el (tipus)
interface TextProp {
  colors?: Colors;
  size?: string;
  align?: string;
  padding?: string;
  margin?: string;
  isHighlighted?: boolean;
}

export const TextHeader = styled.h1<TextProp>`
  padding: ${({ padding }) => padding || "0"};
  margin: ${({ margin }) => margin || "0 1rem"};
  text-align: ${({ align }) => align || "left"};
  font-size: ${({ size }) => size || "42px"};
  color: ${({ colors }) => colors || Colors.WhiteColor};
`;

export const TextPrimary = styled.p<TextProp>`
  margin: ${({ margin }) => margin || "0 1rem"};
  padding: ${({ padding }) => padding || "0"};
  font-size: ${({ size }) => size || "14px"};
  color: ${({ colors, isHighlighted }) =>
    isHighlighted ? Colors.GreenColor : colors || Colors.WhiteColor};
`;
// export const Title = styled.h2`
//   font-weight: 700;
//   color: ${lightBlue};
//   font-size: 28px;
//   line-height: 34.13px;
// `;
