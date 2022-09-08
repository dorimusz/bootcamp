import * as S from "./ContainerAtom";
import Header from "../Header/Header";

import ReduxTest from "../ReduxTest/ReduxTest";

//React.FC(functional components that take a props argument and return JSX) and NextPage(just the page type of a nextjs project - not component!) type
// container modifications made it possible to have children - a component of choice can be given
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <S.MainContainer style={{ minHeight: "calc(100% - 80px)" }}>
      {/* <Header  /> */}
      {children}
      {/* <ReduxTest /> */}
    </S.MainContainer>
  );
};

export default Container;
