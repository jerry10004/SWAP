// import node module libraries
import React, { Fragment, useMemo } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Col, Row, Table, Button } from "react-bootstrap";

// Import required custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
// import Checkbox from "components/elements/advance-table/Checkbox";
import DotBadge from "components/elements/bootstrap/DotBadge";
import moment from "moment";
import axios from "axios";

const ReadyProgramTable = ({ table_data }) => {
  var index;

  const cancelApply = async (applicant_id, program_id) => {
    var params = new URLSearchParams();
    params.append("applicant_id", applicant_id);
    params.append("program_id", program_id);
    if (window.confirm("정말 신청을 취소하시겠습니까?")) {
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "applicant/delete", params);
      alert("신청이 취소되었습니다.");
      window.location.reload();
    }
  };
  // program의 applicants num --
  // applicant에서 삭제
  const columns = useMemo(
    () => [
      { accessor: "_id", Header: "ID", show: false },
      {
        Header: "번호",
        Cell: ({ value, row }) => {
          index = Number(row.id) + 1;
          return (
            <h5 className="mb-0">
              <Link to="#" className="text-inherit">
                {index}
              </Link>
            </h5>
          );
        },
      },

      {
        accessor: "program_name",
        Header: "프로그램명",
        Cell: ({ value, row }) => {
          const id = "/swap/program/" + row.original.program_id.toString();
          return (
            <h5 className="mb-0">
              <Link className="text-inherit" to={id}>
                {value}
              </Link>
            </h5>
          );
        },
      },

      {
        accessor: "start_date",
        Header: "시작일자",
        Cell: ({ value }) => {
          return (
            <Link to="#" className="text-inherit">
              {moment(value).format("YY-MM-DD HH:mm")}
            </Link>
          );
        },
      },

      {
        accessor: "end_date",
        Header: "종료일자",
        Cell: ({ value }) => {
          return (
            <Link to="#" className="text-inherit">
              {moment(value).format("YY-MM-DD HH:mm")}
            </Link>
          );
        },
      },

      {
        accessor: "status_name",
        Header: "상태",
        Cell: ({ value }) => {
          value = value.toLowerCase();
          return (
            <Fragment>
              <DotBadge
                bg={value === "참여보류" ? "warning" : value === "참여승인" ? "success" : value === "수료" ? "info" : value === "미수료" ? "danger" : value === "참여불가" ? "danger" : ""}
              ></DotBadge>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Fragment>
          );
        },
      },
      {
        accessor: "a",
        Header: "비고",
        Cell: ({ value, row }) => {
          return (
            <div className="d-grid d-md-block">
              <Link to="#">
                <Button variant="outline-danger" className="me-1" onClick={() => cancelApply(row.original.applicant_id, row.original.program_id)}>
                  신청취소
                </Button>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(() => table_data, [table_data]);

  const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, state, gotoPage, pageCount, prepareRow, setGlobalFilter } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
          else return false;
        }),
      },
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect
  );

  const { pageIndex, globalFilter } = state;

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row>
          <Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 py-4 px-5 ">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Search Course" />
          </Col>
        </Row>
      </div>

      <div className="table-responsive border-0 overflow-y-hidden">
        <Table {...getTableProps()} className="text-nowrap">
          <thead className="table-light">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* Pagination @ Footer */}
      <Pagination previousPage={previousPage} pageCount={pageCount} pageIndex={pageIndex} gotoPage={gotoPage} nextPage={nextPage} />
    </Fragment>
  );
};

export default ReadyProgramTable;
