import * as S from "./TableAtom";
import ContributionTableRow from "./ContributionTableRow";

import { useSelector } from "react-redux";
import { contributionSelector } from "../../store/contribution/contributionSelector";

const ContributionTable = () => {
  const { contribution } = useSelector(contributionSelector);
  console.log("@@conts", contribution.length);

  return (
    <S.TableContainer>
      <S.Table>
        <S.TableBody>
          <S.TR>
            <S.TH>User login</S.TH>
            <S.TH>Commit count</S.TH>
          </S.TR>

          {contribution?.map((contributionData: any, i: number) => (
            <ContributionTableRow
              contributionData={contributionData}
              key={contributionData.id}
            />
          ))}

          {/* {users?.map((userData: any, i: number) => (
            <UserTableRow key={i} userData={userData} />
          ))} */}
        </S.TableBody>
      </S.Table>
    </S.TableContainer>
  );
};

export default ContributionTable;
