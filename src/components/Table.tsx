import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const TableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  overflow: auto;
  width: ${window.innerWidth}px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`
  width: auto !important;
  height: 40px;
  table-layout: fixed;
  white-space: nowrap;
  border-collapse: collapse;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
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
    td {
      padding: 19px 25px;
      background: #fff;
      border-bottom: 1px solid var(--Line-Gray, #d9d9d9);
      border-left: 1px solid var(--Line-Gray, #d9d9d9);
      border-right: 1px solid var(--Image-Gray, #d9d9d9);
      font-weight: 500;
    }
  }
`;

interface TableIProps {}

const CommonTable: React.FC<TableIProps> = (props) => {
  return (
    <TableContainer>
      <Table>
        <tbody>
          <tr className="title">
            <th>게시판</th>
            <th>카테고리</th>
            <th>이름</th>
            <th>휴대폰번호</th>
            <th>일시</th>
            <th>답변여부</th>
            <th>답변</th>
          </tr>
          <tr className="item">
            <td>견적문의</td>
            <td>라벨 인쇄</td>
            <td>박소진</td>
            <td>01025721701</td>
            <td>24.01.24.10:00</td>
            <td>준비중</td>
            <td>답변1</td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
