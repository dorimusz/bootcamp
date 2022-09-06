import * as S from "./TableAtom";

const UserTableRow = (userData: any, key: number) => {
  // console.log("@@", userData);
  return (
    <S.TR key={key}>
      <S.DataCell>{userData.avatar_url}</S.DataCell>
      <S.DataCell>{userData.login}</S.DataCell>
      <S.DataCell>{userData.type}</S.DataCell>
    </S.TR>
  );
};

export default UserTableRow;
