import * as S from "../Header/HeaderAtom";
import * as SS from "../Navigation/NavigationAtom";
import * as T from "../Text/TextAtom";

const Header: React.FC = () => {
  return (
    <S.Header>
      <SS.TitleContainer justifyContent="space-between">
        <T.TextHeader>Title</T.TextHeader>
        <T.TextHeader>Title</T.TextHeader>
      </SS.TitleContainer>
    </S.Header>
  );
};
export default Header;
