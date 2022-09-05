import styled from "styled-components";
import { Colors } from "../../enums/colorEnums";

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  min-height: calc(100vh - 160px);
  height: fit-content;
`;
//min-height: calc(100vh - 160px); 160px = mainContainer 80padding and Header height 80px

//The card itself
export const Card = styled.div`
  background: ${Colors.DarkBlue};
  width: 30%;
  min-width: 390px;
  min-height: 250px;
  border-radius: 24px;

  padding: 0.4rem;
  &:hover {
    box-shadow: -2px -5px 4px rgba(0, 0, 0, 0.25),
      2px 5px 5px rgba(115, 213, 151, 0.4);
  }
`;

//the whole content on the card
export const ContentHolder = styled.div`
  padding: 1rem;
  color: ${Colors.WhiteColor};
`;

//the icon, name and owner of the repo
export const NameHeading = styled.div`
  display: flex;
`;

export const Icon = styled.div`
  display: inline-block;
`;

export const TitleHolder = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const OwnerName = styled.h3`
  font-weight: 400;
  font-size: 16px;
`;

//the description
export const Description = styled.p`
  padding: 20px 0;
  font-size: 13px;
  letter-spacing: 0.03rem;
`;

//language info, bottom of the card
export const DetailHolder = styled.div`
  display: flex;
`;

export const Details = styled.p`
  font-weight: 700;
  padding-left: 0.7rem;
`;

export const GreenWrapper = styled.div`
  font-weight: 500;
  color: ${Colors.GreenColor};
`;
