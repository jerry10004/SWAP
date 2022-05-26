import React, { Fragment, useMemo, useState, useLayoutEffect } from "react";
import { useTable, useFilters, useSortBy, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Col, Row, Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";
import { FormSelect } from "components/elements/form-select/FormSelect";
import moment from "moment";

const CoursesTable = ({ program_data }) => {
  const [programInfo, setProgramInfo] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [waitProgram, setWaitProgram] = useState([]);
  const [progressProgram, setProgressProgram] = useState([]);
  const [finishProgram, setFinishProgram] = useState([]);
  const infinite = "무제한";

  const categoryOptions = [
    { value: "대회", label: "대회" },
    { value: "봉사", label: "봉사" },
    { value: "캠프", label: "캠프" },
    { value: "행사", label: "행사" },
    { value: "맥북", label: "맥북" },
    { value: "프로젝트/스터디", label: "프로젝트/스터디" },
    { value: "인턴/현장실습", label: "인턴/현장실습" },
    { value: "특강", label: "특강" },
    { value: "기타", label: "기타" },
  ];

  const filterOptions = [
    { value: "최신등록순", label: "최신등록순" },
    { value: "제목순", label: "제목순" },
    { value: "신청인원순", label: "신청인원순" },
    { value: "신청마감일자순", label: "신청마감일자순" },
    { value: "프로그램 진행일자순", label: "프로그램 진행일자순" },
  ];

  useLayoutEffect(() => {
    readProgram();
  }, []);

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "program_name",
        Header: "제목",
        Cell: ({ value, row }) => {
          const id = "/swap/admin/program/detail/" + row.original.id.toString();
          return (
            <Link className="text-inherit" to={id}>
              <div className="d-flex align-items-center">
                <h5 className="mb-1 text-primary-hover">{value}</h5>
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
        accessor: "applystart_date",
        Header: "프로그램 신청일자",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <h5 className="mb-0">
                {" "}
                {moment(value).format("YY-MM-DD HH:mm")} ~ <br />
                {moment(row.original.applyend_date).format("YY-MM-DD HH:mm")}
              </h5>
            </div>
          );
        },
      },
      {
        accessor: "start_date",
        Header: "프로그램 진행일자",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <h5 className="mb-0">
                {moment(value).format("YY-MM-DD HH:mm")} ~ <br />
                {moment(row.original.end_date).format("YY-MM-DD HH:mm")}
              </h5>
            </div>
          );
        },
      },
      {
        accessor: "applicants_num",
        Header: "신청 현황",
        Cell: ({ value, row }) => {
          return (
            <div>
              {value + "명"} / {row.original.quota == null || row.original.quota === 0 || row.original.quota === "무제한" ? infinite : row.original.quota + "명"}
            </div>
          );
        },
      },
      {
        accessor: "status",
        Header: "프로그램 상태",

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

  const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, state, gotoPage, pageCount, prepareRow, setGlobalFilter, selectedFlatRows } = useTable(
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
      useSortBy,
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

  const getFilterTerm = (event) => {
    let filterTerm = event.target.value;
    // programList.map((item) => {
    if (filterTerm !== "") {
      const newProjectsList = programList.filter((project) => {
        if (project.category_name === filterTerm) return project;
      });
      setProgramInfo(newProjectsList);
    } else {
      setProgramInfo(programList);
    }
  };

  const sortChange = (event) => {
    let sortTerm = event.target.value;

    if (sortTerm === "최신등록순") {
      setProgramInfo(
        [...programInfo].sort((a, b) => {
          return b.regdate - a.regdate;
        })
      );
    } else if (sortTerm === "제목순") {
      setProgramInfo(
        [...programInfo].sort((a, b) => {
          return (b.program_name < a.program_name) - (b.program_name > a.program_name);
        })
      );
    } else if (sortTerm === "신청인원순") {
      setProgramInfo(
        [...programInfo].sort((a, b) => {
          return b.applicants_num - a.applicants_num;
        })
      );
    } else if (sortTerm === "신청마감일자순") {
      setProgramInfo(
        [...programInfo].sort((a, b) => {
          return (b.applyend_date < a.applyend_date) - (b.applyend_date > a.applyend_date);
        })
      );
    } else if (sortTerm === "프로그램 진행일자순") {
      setProgramInfo(
        [...programInfo].sort((a, b) => {
          return (b.start_date < a.start_date) - (b.start_date > a.start_date);
        })
      );
    }
  };

  const { pageIndex, globalFilter } = state;

  const readProgram = async () => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program");

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
    setProgramList(response.data);
  };

  const removeProgram = async (e) => {
    var removeProgramId = [];

    e.map((d) => removeProgramId.push(d.original.id));

    var params = new URLSearchParams();
    params.append("id", removeProgramId);

    if (window.confirm("삭제 하시겠습니까?")) {
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/deleteConfirm", params);
      if (response.data === 0) {
        if (window.confirm("현재 진행중인 프로그램 입니다. 그래도 삭제 하시겠습니까?")) {
          const res = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/delete", params);
          const responseFile = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/delete/files", params);
          alert("삭제 되었습니다.");
        }
      } else if (response.data === 2) {
        if (window.confirm("신청한 학생이 있습니다. 그래도 삭제 하시겠습니까?")) {
          const res = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/delete", params);
          const responseFile = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/delete/files", params);
          alert("삭제 되었습니다.");
        }
      } else {
        const res = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/delete", params);
        const responseFile = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/delete/files", params);
        alert("삭제 되었습니다.");
      }
      readProgram();
      window.location.reload();
    }
  };

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row className="justify-content-md-between m-3 mb-xl-0">
          <Col xxl={2} lg={2} md={6} xs={12}>
            <Form.Control as={FormSelect} placeholder="카테고리" options={categoryOptions} onChange={getFilterTerm} />
          </Col>
          <Col xl={5} lg={6} md={6} xs={12}>
            <div className="mb-2 mb-lg-4">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="프로그램을 검색하세요" />
            </div>
          </Col>

          <Col className="d-flex justify-content-end mb-2 mb-lg-4">
            <Button
              variant="secondary"
              className="danger-button justify-content-end"
              onClick={() => {
                removeProgram(selectedFlatRows);
              }}
            >
              삭제하기
            </Button>
          </Col>
          <Col>
            <Form.Control as={FormSelect} placeholder="정렬" options={filterOptions} onChange={sortChange} />
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
