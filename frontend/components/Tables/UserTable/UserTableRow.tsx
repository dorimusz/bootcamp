import * as S from "../TableAtom";
import * as I from "../../Image/ImageAtom";

const UserTableRow: React.FC<{ userData: any }> = ({ userData }) => {
  // console.log("@@", userData);
  return (
    <S.TR>
      <S.DataCell>
        <I.RoundAvatar src={userData.avatar_url} />
      </S.DataCell>
      <S.DataCell>{userData.login}</S.DataCell>
      <S.DataCell>{userData.type}</S.DataCell>
    </S.TR>
  );
};

export default UserTableRow;
