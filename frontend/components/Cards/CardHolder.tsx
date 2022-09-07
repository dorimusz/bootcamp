import * as S from "./CardsAtom";
import Card from "./Card";

import { useSelector } from "react-redux";
import { repositorySelector } from "../../store/repository/repositorySelector";

const Cards = () => {
  const { repository } = useSelector(repositorySelector);
  console.log("redux", repository);
  return (
    <S.CardContainer>
      {repository?.map((repoData: any, i: number) => (
        <Card repoData={repoData} key={repoData.id} />
      ))}

      {/* <Card /> */}
    </S.CardContainer>
  );
};

export default Cards;
