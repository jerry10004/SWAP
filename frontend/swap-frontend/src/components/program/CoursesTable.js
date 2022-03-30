// import node module libraries
import React, { Fragment, useMemo, useState, useEffect, useLayoutEffect } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Col, Row, Button, Image, Dropdown, Table, Form } from "react-bootstrap";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";
import SelectFilter from "components/elements/advance-table/SelectFilter";

const CoursesTable = ({ program_data }) => {
  const [programInfo, setProgramInfo] = useState([]);
  var isAll = 0;
  const [waitProgram, setWaitProgram] = useState([]);
  const [progressProgram, setProgressProgram] = useState([]);
  const [finishProgram, setFinishProgram] = useState([]);

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "program_name",
        Header: "제목",
        Cell: ({ value, row }) => {
          return (
            <Link className="text-inherit" to="#">
              {/* <div className="d-lg-flex align-items-center"> */}
              {/* <div>
                  <Image src={row.original.image} alt="" className="img-4by3-lg rounded" />
                </div> */}
              {/* <div className="ms-lg-3 mt-2 mt-lg-0"> */}
              <div className="d-flex align-items-center">
                <h5 className="mb-1 text-primary-hover">{value}</h5>
              </div>
              {/* </div> */}
              {/* </div> */}
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
        Header: "시작 일자",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <h5 className="mb-0">{value}</h5>
            </div>
          );
        },
      },
      {
        accessor: "end_date",
        Header: "마감 일자",
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
        // Filter: SelectColumnFilter,
        // filter: "includes",

        Cell: ({ value, row }) => {
          if (value === 0) {
            value = "대기";
          }
          if (value === 1) {
            value = "진행";
          }
          if (value === 2) {
            value = "종료";
          }
          return (
            <Fragment>
              <DotBadge bg={value === "대기" ? "warning" : value === "진행" ? "success" : value === "종료" ? "danger" : ""}></DotBadge>
              {value}
            </Fragment>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(() => programInfo);

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

  const filterOptions = [
    { value: "대회", label: "대회" },
    { value: "봉사", label: "봉사" },
    { value: "캠프", label: "캠프" },
    { value: "동아리", label: "동아리" },
    { value: "행사", label: "행사" },
    { value: "기타", label: "기타" },
  ];

  useLayoutEffect(() => {
    readProgram();
  }, []);

  const readProgram = async () => {
    const response = await axios.get("http://localhost:8080/swap/program");

    response.data.map((item, i) =>
      item.status === 0
        ? setWaitProgram(waitProgram.push(item))
        : item.status === 1
        ? setProgressProgram(progressProgram.push(item))
        : item.status === 2
        ? setFinishProgram(finishProgram.push(item))
        : ""
    );

    if (program_data === 0) {
      setProgramInfo(waitProgram);
    } else if (program_data === 1) {
      setProgramInfo(progressProgram);
    } else if (program_data === 2) {
      setProgramInfo(finishProgram);
    } else {
      setProgramInfo(response.data);
    }
  };

  const removeProgram = async (e) => {
    var removeProgramId = [];

    e.map((d) => removeProgramId.push(d.original.id));

    var params = new URLSearchParams();
    params.append("id", removeProgramId);

    if (window.confirm("삭제 하시겠습니까?")) {
      const response = await axios.post("http://localhost:8080/swap/program/delete", params);
      alert("삭제 되었습니다.");
      readProgram();
      window.location.reload();
    }
  };

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row className="justify-content-md-between m-3 mb-xl-0">
          <Col xxl={2} lg={2} md={6} xs={12}>
            {/* <Form.Control as={FormSelect} placeholder="카테고리" options={filterOptions} /> */}
            {/* records filtering options */}
            <SelectFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="카테고리" options={filterOptions} />
            {/* <SelectFilter filter={selectFilter} setFilter={setSelectFilter} options={filterOptions} /> */}
          </Col>
          <Col xl={8} lg={6} md={6} xs={12}>
            {/* search records */}
            <div className="mb-2 mb-lg-4">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="프로그램 이름으로 검색하세요" />
            </div>
          </Col>
          <Col className="d-flex justify-content-end mb-2 mb-lg-4">
            <Button
              className="danger-button justify-content-end"
              onClick={() => {
                removeProgram(selectedFlatRows);
              }}
            >
              삭제하기
            </Button>
          </Col>
        </Row>
      </div>

      <div className="table-responsive border-0 overflow-y-hidden">
        <Table {...getTableProps()} className="text-nowrap">
          <thead className="table-light">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                  </th>
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
