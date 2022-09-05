import * as S from "./CardsAtom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faKeyboard,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import * as T from "../Text/TextAtom";
import content from "../Cards/content";
import { Colors } from "../../enums/colorEnums";

const Card = () => {
  return (
    <S.Card>
      <S.ContentHolder>
        <S.NameHeading>
          <FontAwesomeIcon
            icon={faDatabase}
            style={{ width: "50px", height: "50px" }}
          />
          <S.TitleHolder>
            <T.TextHeader size="20px" margin=".1rem">
              {content.name}
            </T.TextHeader>
            <S.OwnerName>{content.owner}</S.OwnerName>
          </S.TitleHolder>
        </S.NameHeading>
        <S.Description>{content.description}</S.Description>

        <S.DetailHolder>
          <S.Icon>
            <FontAwesomeIcon
              icon={faKeyboard}
              style={{ width: "20px", height: "20px" }}
            />
          </S.Icon>
          <S.Details>{content.lang}</S.Details>
        </S.DetailHolder>

        <S.DetailHolder style={{ justifyContent: "space-between" }}>
          <S.DetailHolder>
            <S.GreenWrapper>
              <S.Icon>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ width: "20px", height: "20px" }}
                />
              </S.Icon>
            </S.GreenWrapper>
            <S.Details>{content.star}</S.Details>
          </S.DetailHolder>
          <S.DetailHolder>
            <S.GreenWrapper>Contributions: </S.GreenWrapper>
            <S.Details>{content.conts}</S.Details>
          </S.DetailHolder>
        </S.DetailHolder>
      </S.ContentHolder>
    </S.Card>
  );
};

export default Card;
