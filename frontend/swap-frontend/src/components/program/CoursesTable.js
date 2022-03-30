// import node module libraries
import React, { Fragment, useMemo, useState, useEffect, useLayoutEffect } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { Col, Row, Button, Image, Dropdown, Table, Form } from "react-bootstrap";
import { XCircle, MoreVertical } from "react-feather";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";

// import custom components
import { FormSelect } from "components/elements/form-select/FormSelect";

const CoursesTable = ({ courses_data }) => {
  const [programInfo, setProgramInfo] = useState([]);
  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "program_name",
        Header: "제목",
        Cell: ({ value, row }) => {
          return (
            <Link className="text-inherit" to="#">
              <div className="d-lg-flex align-items-center">
                <div>
                  <Image src={row.original.image} alt="" className="img-4by3-lg rounded" />
                </div>
                <div className="ms-lg-3 mt-2 mt-lg-0">
                  <h4 className="mb-1 text-primary-hover">{value}...</h4>
                </div>
              </div>
            </Link>
          );
        },
      },

      {
        accessor: "category_name",
        Header: "카테고리",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <h5 className="mb-0">{value}</h5>
            </div>
          );
        },
      },
      {
        accessor: "start_date",
        Header: "날짜",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <h5 className="mb-0">{value}</h5>
            </div>
          );
        },
      },
      {
        accessor: "name",
        Header: "작성자",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <h5 className="mb-0">{value}</h5>
            </div>
          );
        },
      },
      {
        accessor: "status",
        Header: "상태",

        Cell: ({ value, row }) => {
          return (
            <Fragment>
              <DotBadge bg={value === 0 ? "warning" : value === 1 ? "success" : ""}></DotBadge>
              {/* {value.charAt(0).toUpperCase() + value.slice(1)} */}
            </Fragment>
          );
        },
      },
      // {
      //   accessor: "action",
      //   Header: "설정",
      //   Cell: ({ value }) => {
      //     if (value === 2) {
      //       return (
      //         <Fragment>
      //           <Button href="#" variant="outline" className="btn-outline-white btn-sm">
      //             Reject
      //           </Button>{" "}
      //           <Button href="#" variant="success" className="btn-sm">
      //             Approved
      //           </Button>
      //         </Fragment>
      //       );
      //     }
      //     if (value === 1) {
      //       return (
      //         <Button href="#" variant="secondary" className="btn-sm">
      //           Change Status
      //         </Button>
      //       );
      //     }
      //   },
      // },
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

  const data = useMemo(() => programInfo);

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

  const filterOptions = [
    { value: "대회", label: "대회" },
    { value: "봉사", label: "봉사" },
    { value: "캠프", label: "캠프" },
    { value: "동아리", label: "동아리" },
    { value: "행사", label: "행사" },
    { value: "기타", label: "기타" },
  ];

  useLayoutEffect(() => {
    console.log("*********");
    readProject();
  }, []);

  const readProject = async () => {
    console.log("???===========================");

    const response = await axios.get("http://localhost:8080/swap/program");
    setProgramInfo(response.data);
    console.log("======response is =======");
    console.log(response);
    console.log("======response.data is =======");
    console.log(response.data);
    console.log("========programInfo is========");
    console.log(programInfo);
    console.log("========0.programInfo is========");
    console.log(programInfo[0]);
    console.log("========1.programInfo is========");
    console.log(programInfo[1]);
    // const datas = useMemo(() => InstructorData, []);
  };

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to="#"
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
            <XCircle size="18px" /> Reject with Feedback
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <Fragment>
      <div className=" overflow-hidden">
        {/* <Row>
          <Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 py-4 px-5 ">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Search Course" />
          </Col>
        </Row> */}
        <Row className="justify-content-md-between m-3 mb-xl-0">
          <Col xl={6} lg={6} md={6} xs={12}>
            {/* search records */}
            <div className="mb-2 mb-lg-4">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="프로그램 이름으로 검색하세요" />
            </div>
          </Col>
          <Col xxl={2} lg={2} md={6} xs={12}>
            <Form.Control as={FormSelect} placeholder="카테고리" options={filterOptions} />
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

export default CoursesTable;
