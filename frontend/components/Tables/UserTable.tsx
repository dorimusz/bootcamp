import * as S from "./TableAtom";
import * as I from "../Image/ImageAtom";
import UserTableRow from "./UserTableRow";

import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/userSelector";

const UserTable = () => {
  const { users } = useSelector(userSelector);
  //   console.log(users.length);
  return (
    <S.TableContainer>
      <S.Table>
        <S.TR>
          <S.TH>Avatar</S.TH>
          <S.TH>Login</S.TH>
          <S.TH>Type</S.TH>
        </S.TR>

        {users?.map((userData: any, i: number) => (
          <S.TR key={i}>
            <S.DataCell>
              <I.RoundAvatar src={userData.avatar_url} />
            </S.DataCell>
            <S.DataCell>{userData.login}</S.DataCell>
            <S.DataCell>{userData.type}</S.DataCell>
          </S.TR>
        ))}
      </S.Table>
    </S.TableContainer>
  );
};

export default UserTable;
