import * as S from "./ContainerAtom";
import Header from "../Header/Header";
import CardHolder from "../Cards/CardHolder";

import ReduxTest from "../ReduxTest/ReduxTest";

const Container = () => {
  return (
    <S.MainContainer style={{ minHeight: "calc(100% - 80px)" }}>
      <Header />
      <CardHolder />
      {/* <ReduxTest /> */}
    </S.MainContainer>
  );
};

export default Container;
