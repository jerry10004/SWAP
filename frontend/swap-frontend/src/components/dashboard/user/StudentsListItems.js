// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Dropdown, Row, Col, Table } from "react-bootstrap";
import { MoreVertical, Edit } from "react-feather";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";

const StudentsListItems = () => {
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
              <DotBadge bg="warning"></DotBadge>
              <h5 className="mb-0">{value}</h5>
            </div>
          );
        },
      },

      {
        accessor: "student_id",
        Header: "학번",
      },

      { accessor: "email", Header: "이메일" },
      { accessor: "phone", Header: "연락처" },
      {
        accessor: "department",
        Header: "학부",
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
          return value + " 학년";
        },
      },
      {
        accessor: "semester",
        Header: "학기",
        Cell: ({ value }) => {
          return value + " 학기";
        },
      },

      {
        accessor: "shortcutmenu",
        Header: "",
        Cell: () => {
          return <ActionMenu />;
        },
      },
    ],
    []
  );

  const ActionMenu = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <MoreVertical size="15px" className="text-secondary" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Header>SETTINGS</Dropdown.Header>
          <Dropdown.Item eventKey="1">
            <Edit size="18px" className="dropdown-item-icon" /> 활동내역 보기
          </Dropdown.Item>
          {/* <Dropdown.Item eventKey="2">
            {" "}
            <Trash size="18px" className="dropdown-item-icon" /> 탈퇴시키기
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

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
    useRowSelect
  );

  const { pageIndex, globalFilter } = state;

  useLayoutEffect(() => {
    readUser();
  }, []);

  const readUser = async () => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/students");
    setUserInfo(response.data);
  };

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row>
          <Col xl={8} lg={12} md={12} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="학생을 검색하세요" />
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

export default StudentsListItems;
