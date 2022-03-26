// import node module libraries
import React, { Fragment, useMemo, useEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { Dropdown, OverlayTrigger, Tooltip, Row, Col, Table } from "react-bootstrap";
import { MoreVertical, Trash, Edit } from "react-feather";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";

// import data files
import { InstructorData } from "data/users/InstructorData";

const InstructorsListItems = () => {
  const [adminInfo, setAdminInfo] = useState();

  useEffect(() => {
    console.log("*********");
    readAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readAdmin = async () => {
    console.log("???===========================");

    // const response = await axios.get("http://localhost:8080/swap/admin");
    const response = await axios.get("http://localhost:8080/swap/admin");
    setAdminInfo(response.data[0]);
    console.log("======response is =======");
    console.log(response);
    console.log("======response.data is =======");
    console.log(response.data);
    console.log("======instructor data is =======");
    console.log(InstructorData);
    console.log("========adminInfo is========");
    console.log(adminInfo);
    console.log("========0.adminInfo is========");
    console.log(adminInfo[0]);
    console.log("========1.adminInfo is========");
    console.log(adminInfo[1]);
    // const datas = useMemo(() => InstructorData, []);
  };

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
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

  const ActionMenu = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <MoreVertical size="15px" className="text-secondary" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Header>SETTINGS</Dropdown.Header>
          <Dropdown.Item eventKey="1">
            {" "}
            <Edit size="18px" className="dropdown-item-icon" /> Edit
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            {" "}
            <Trash size="18px" className="dropdown-item-icon" /> Remove
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "name",
        Header: "이름",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <h5 className="mb-0">{value}</h5>
            </div>
          );
        },
      },
      { accessor: "email", Header: "이메일" },
      { accessor: "phone", Header: "연락처" },
      {
        accessor: "delete",
        Header: "",
        Cell: () => {
          return (
            <div className="align-middle border-top-0">
              <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
                <Link to="#">
                  <Trash size="15px" className="dropdown-item-icon" />
                </Link>
              </OverlayTrigger>
            </div>
          );
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

  const data = useMemo(() => InstructorData, []);

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
    usePagination
  );

  const { pageIndex, globalFilter } = state;

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row>
          <Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Search Instructor" />
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

export default InstructorsListItems;
