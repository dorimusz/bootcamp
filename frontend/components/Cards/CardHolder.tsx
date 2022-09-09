import * as S from "./CardsAtom";
import Card from "./Card";
import Link from "next/link";

import { useSelector } from "react-redux";
import { repositorySelector } from "../../store/repository/repositorySelector";

const Cards = () => {
  const { repository } = useSelector(repositorySelector);
  // console.log("redux", repository);

  const { filter } = useSelector(repositorySelector);
  console.log("@@state", filter);

  return (
    <S.CardContainer>
      {repository
        ?.filter(
          (repository: any) => filter === "" || repository.language === filter
        )
        .map((repoData: any, i: number) => (
          <Link
            href={{
              pathname: "/contribution/[repoId]",
              query: { repoId: repoData.id },
            }}
          >
            <S.A>
              <Card repoData={repoData} key={repoData.id} />
            </S.A>
          </Link>
        ))}

      {/* <Card /> */}
    </S.CardContainer>
  );
};

export default Cards;
