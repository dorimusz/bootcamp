import * as S from "./TableAtom";
// import RespisitoryTableRow from "./RepositoryTableRow";

import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/userSelector";

const RepositoryTable = () => {
  //   const { users } = useSelector(userSelector);
  //   console.log(users.length);
  return (
    <S.TableContainer>
      <S.Table>
        <S.TableBody>
          <S.TR>
            <S.TH>User login</S.TH>
            <S.TH>Commit count</S.TH>
          </S.TR>

          {/* {users?.map((userData: any, i: number) => (
            <UserTableRow key={i} userData={userData} />
          ))} */}
        </S.TableBody>
      </S.Table>
    </S.TableContainer>
  );
};

export default RepositoryTable;
