import * as S from "./TableAtom";

//user login can be reached after server/db relations are fixed

const UserTableRow: React.FC<{ contributionData: any }> = ({
  contributionData,
}) => {
  console.log("@@", contributionData);
  return (
    <S.TR>
      <S.DataCell>{contributionData.userId}</S.DataCell>
      <S.DataCell>{contributionData.repository.full_name}</S.DataCell>
    </S.TR>
  );
};

export default UserTableRow;
