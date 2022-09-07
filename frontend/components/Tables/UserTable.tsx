import * as S from "./TableAtom";
import UserTableRow from "./UserTableRow";

import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/userSelector";

const UserTable = () => {
  const { users } = useSelector(userSelector);
  //   console.log(users.length);
  return (
    <S.TableContainer>
      <S.Table>
        <S.TableBody>
          <S.TR>
            <S.TH>Avatar</S.TH>
            <S.TH>Login</S.TH>
            <S.TH>Type</S.TH>
          </S.TR>

          {users?.map((userData: any, i: number) => (
            <UserTableRow key={i} userData={userData} />
          ))}
        </S.TableBody>
      </S.Table>
    </S.TableContainer>
  );
};

export default UserTable;
