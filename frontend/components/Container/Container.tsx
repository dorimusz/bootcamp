import * as S from "./ContainerAtom";
import Header from "../Header/Header";
import Cards from "../Cards/Cards";

import ReduxTest from "../ReduxTest/ReduxTest";

const Container = () => {
  return (
    <S.MainContainer>
      <Header />
      <Cards />
      {/* <ReduxTest /> */}
    </S.MainContainer>
  );
};

export default Container;
