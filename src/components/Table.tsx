import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const TableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`
  width: auto;
  height: 40px;
  table-layout: fixed;
  white-space: nowrap;
  border-collapse: collapse;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  color: #414141;

  .title {
    th {
      padding: 19px 25px;
      border-top: 1px solid var(--Image-Gray, #d9d9d9);
      border-bottom: 1px solid var(--Image-Gray, #d9d9d9);
      border-left: 1px solid var(--Image-Gray, #d9d9d9);
      border-right: 1px solid var(--Image-Gray, #d9d9d9);
      background: var(--Background-Gray, #f9f9fc);
    }
  }

  .item {
    cursor: pointer;

    td {
      padding: 10px;
      background: #fff;
      border-bottom: 1px solid var(--Line-Gray, #d9d9d9);
      border-left: 1px solid var(--Line-Gray, #d9d9d9);
      border-right: 1px solid var(--Image-Gray, #d9d9d9);
      font-weight: 500;
    }
  }
`;

interface TableIProps {
  thElement: React.ReactNode;
  tdElement: React.ReactNode;
  style?: React.CSSProperties;
}

const CommonTable: React.FC<TableIProps> = (props) => {
  const { thElement, tdElement, style } = props;

  return (
    <TableContainer>
      <Table style={{ ...style }}>
        <tbody>
          <tr className="title">{thElement}</tr>
          {tdElement}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
