import * as S from "../Header/HeaderAtom";
import * as SS from "../Navigation/NavigationAtom";
import * as T from "../Text/TextAtom";

const Header: React.FC = () => {
  return (
    <S.Header>
      <SS.TitleContainer justifyContent="space-between">
        <SS.SmallHeading
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <T.TextHeader size="25px">Title</T.TextHeader>
          <T.TextHeader size="25px">Title</T.TextHeader>
          {/* second text header = input filed */}
        </SS.SmallHeading>
      </SS.TitleContainer>
    </S.Header>
  );
};
export default Header;
