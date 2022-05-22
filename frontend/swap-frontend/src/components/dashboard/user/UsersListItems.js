// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";

import DotBadge from "components/elements/bootstrap/DotBadge";

const UsersListItems = () => {
  const [userInfo, setUserInfo] = useState([]);

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "name",
        Header: "이름",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <DotBadge bg={row.original.status === -2 ? "success" : row.original.status === 0 ? "success" : row.original.status === 1 ? "warning" : "secondary"}></DotBadge>
              <h5 className="mb-0">{value}</h5>
            </div>
          );
        },
      },

      {
        accessor: "student_id",
        Header: "학번",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <Col> {value === 0 ? "" : value}</Col>
            </Fragment>
          );
        },
      },
      { accessor: "email", Header: "이메일" },
      { accessor: "phone", Header: "연락처" },
      {
        accessor: "",
        Header: "소속",
        Cell: ({ value, row }) => {
          return (
            <Fragment>
              <Col>{row.original.status !== 1 ? row.original.department : ""}</Col>
            </Fragment>
          );
        },
      },
      {
        accessor: "department",
        Header: "학부",
        Cell: ({ value, row }) => {
          return (
            <Fragment>
              <Col>{row.original.status === 1 ? value : ""}</Col>
            </Fragment>
          );
        },
      },
      {
        accessor: "major1",
        Header: "1전공",
      },
      {
        accessor: "major2",
        Header: "2전공",
      },
      {
        accessor: "student_class",
        Header: "학년",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <Col> {value === 0 ? "" : value + " 학년"}</Col>
            </Fragment>
          );
        },
      },
      {
        accessor: "semester",
        Header: "학기",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <Col> {value === 0 ? "" : value + " 학기"}</Col>
            </Fragment>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(() => userInfo);

  const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    state,
    gotoPage,
    pageCount,
    prepareRow,
    setGlobalFilter,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
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
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const { pageIndex, globalFilter } = state;

  useLayoutEffect(() => {
    readUser();
  }, []);

  const readUser = async () => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user");

    setUserInfo(response.data);
  };

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row className="justify-content-md-between m-3 mb-xl-0">
          <Col xl={8} lg={6} md={6} xs={12}>
            <div className="mb-2 mb-lg-4">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="사용자를 검색하세요" />
            </div>
          </Col>
        </Row>
      </div>

      <div className="table-responsive ">
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
                    //idx는 각 column
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

export default UsersListItems;
