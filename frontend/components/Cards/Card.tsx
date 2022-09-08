import * as S from "./CardsAtom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faKeyboard,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import * as T from "../Text/TextAtom";
import repo from "../../content/repo";

const Card: React.FC<{ repoData: any }> = ({ repoData }) => {
  return (
    <S.Card>
      <S.ContentHolder>
        <S.NameHeading>
          <FontAwesomeIcon
            icon={faDatabase}
            style={{ width: "50px", height: "50px" }}
          />
          <S.TitleHolder>
            <T.TextHeader size="17px" margin=".1rem">
              {repoData.full_name}
            </T.TextHeader>
            <S.OwnerName>{repoData.ownerId}</S.OwnerName>
          </S.TitleHolder>
        </S.NameHeading>
        <S.Description>{repoData.description}</S.Description>

        <S.BigDetailHolder>
          <S.DetailHolder>
            <S.Icon>
              <FontAwesomeIcon
                icon={faKeyboard}
                style={{ width: "20px", height: "20px" }}
              />
            </S.Icon>
            <S.Details>
              {repoData.language ? repoData.language : "tba"}
            </S.Details>
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
              <S.Details>{repoData.stargazer_count}</S.Details>
            </S.DetailHolder>
            <S.DetailHolder>
              <S.GreenWrapper>Contributions: </S.GreenWrapper>
              <S.Details>{repoData.contributionSum}</S.Details>
            </S.DetailHolder>
          </S.DetailHolder>
        </S.BigDetailHolder>
      </S.ContentHolder>
    </S.Card>
  );
};

export default Card;
