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

const PostsTable = ({ table_data }) => {
  const columns = useMemo(
    () => [
      { accessor: "_id", Header: "ID", show: false },
      {
        accessor: "id",
        Header: "번호",
        Cell: ({ value }) => {
          return (
            <h5 className="mb-0">
              <Link to="#" className="text-inherit">
                {value}
              </Link>
            </h5>
          );
        },
      },

      {
        accessor: "title",
        Header: "프로그램명",
        Cell: ({ value }) => {
          return (
            <h5 className="mb-0">
              <Link to="#" className="text-inherit">
                {value}
              </Link>
            </h5>
          );
        },
      },

      {
        accessor: "date",
        Header: "일시 및 장소",
        Cell: ({ value }) => {
          return (
            <Link to="#" className="text-inherit">
              {value}
            </Link>
          );
        },
      },
      // { accessor: "date", Header: "Date" },

      {
        accessor: "status",
        Header: "상태",
        Cell: ({ value }) => {
          value = value.toLowerCase();
          return (
            <Fragment>
              <DotBadge
                bg={value === "참여대기" ? "warning" : value === "참여승인" ? "success" : value === "수료" ? "info" : value === "미수료" ? "danger" : value === "참여불가" ? "danger" : ""}
              ></DotBadge>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Fragment>
          );
        },
      },
      {
        accessor: "instructor_name",
        Header: "비고",
        Cell: ({ value, row }) => {
          return (
            <div className="d-grid gap-2 d-md-block">
              <Button variant="outline-secondary" className="me-1">
                신청서수정
              </Button>
              <Button variant="outline-danger" className="me-1">
                신청취소
              </Button>
            </div>
          );
        },
      },
      // {
      //   accessor: "shortcutmenu",
      //   Header: "",
      //   Cell: ({ value, row }) => {
      //     return <ActionMenu />;
      //   },
      // },
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
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllRowsSelectedProps }) => <Checkbox {...getToggleAllRowsSelectedProps()} />,
    //       Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
    //     },
    //     ...columns,
    //   ]);
    // }
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

export default PostsTable;
