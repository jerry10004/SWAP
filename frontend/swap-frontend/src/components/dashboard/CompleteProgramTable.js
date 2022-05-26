// import node module libraries
import React, { Fragment, useMemo } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Table, Button } from "react-bootstrap";

// Import required custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
// import Checkbox from "components/elements/advance-table/Checkbox";
import DotBadge from "components/elements/bootstrap/DotBadge";
import moment from "moment";
import axios from "axios";

const CompleteProgramTable = ({ table_data }) => {
  var index;
  const navigate = useNavigate();

  const confirmSurvey = async (program_id, link) => {
    var user_id = parseInt(window.sessionStorage.getItem("id"));
    var params = new URLSearchParams();
    params.append("user_id", user_id);
    params.append("program_id", program_id);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "applicant/confirm/survey", params);
    if (response.data === -1) alert("이미 작성한 설문지 입니다.");
    else navigate(link);
  };

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
        Header: "이수여부",
        Cell: ({ value }) => {
          value = value.toLowerCase();
          return (
            <Fragment>
              <DotBadge bg={value === "미수료" ? "secondary" : value === "수료" ? "primary" : ""}></DotBadge>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Fragment>
          );
        },
      },
      {
        accessor: "a",
        Header: "비고",
        Cell: ({ value, row }) => {
          var a = String(row.original.program_id);
          console.log(typeof a);

          var link = "/swap/program/" + a + "/survey";
          return (
            <div className="d-grid d-md-block">
              {row.original.survey_form === null ? (
                ""
              ) : (
                <Button variant="outline-primary" className="me-1" onClick={() => confirmSurvey(row.original.program_id, link)}>
                  설문지 작성
                </Button>
              )}
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

export default CompleteProgramTable;
