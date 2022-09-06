import * as S from "./CardsAtom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faKeyboard,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import * as T from "../Text/TextAtom";
import repo from "../../content/repo";
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
              {repo.name}
            </T.TextHeader>
            <S.OwnerName>{repo.owner}</S.OwnerName>
          </S.TitleHolder>
        </S.NameHeading>
        <S.Description>{repo.description}</S.Description>

        <S.DetailHolder>
          <S.Icon>
            <FontAwesomeIcon
              icon={faKeyboard}
              style={{ width: "20px", height: "20px" }}
            />
          </S.Icon>
          <S.Details>{repo.lang}</S.Details>
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
            <S.Details>{repo.star}</S.Details>
          </S.DetailHolder>
          <S.DetailHolder>
            <S.GreenWrapper>Contributions: </S.GreenWrapper>
            <S.Details>{repo.conts}</S.Details>
          </S.DetailHolder>
        </S.DetailHolder>
      </S.ContentHolder>
    </S.Card>
  );
};

export default Card;
