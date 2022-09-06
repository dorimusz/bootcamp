import styled from "styled-components";
import { Colors } from "../../enums/colorEnums";

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 300px;
  margin: 0;
  padding: 0 2rem;
`;

export const Table = styled.table`
  padding: 1rem;
  min-width: 700px;
  color: ${Colors.WhiteColor};
  border-radius: 25px;
  background: ${Colors.DarkBlue};
`;

export const TR = styled.tr`
  text-align: center;
`;
export const TH = styled.th`
  padding: 1rem 0.5rem;
  font-size: 18px;
`;
export const DataCell = styled.td`
  padding: 0.4rem;
  font-weight: 400;
  border: solid 1px ${Colors.WhiteColor};
`;
