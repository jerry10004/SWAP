// import node module libraries
import React, { Fragment, useMemo, useState, useLayoutEffect } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Col, Row, Button, Table, Form } from "react-bootstrap";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import { FormSelect } from "components/elements/form-select/FormSelect";

const SurveyListItems = ({ survey_data }) => {
  const [surveyInfo, setSurveyInfo] = useState([]);
  const [surveyList, setSurveyList] = useState([]);

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

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "name",
        Header: "제목",
        Cell: ({ value, row }) => {
          const id = "/swap/admin/survey/detail/" + row.original.id.toString();
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
        accessor: "admin",
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
        accessor: "regdate",
        Header: "생성 일자",
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

  const data = useMemo(() => surveyInfo);

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
    if (filterTerm !== "") {
      const newSurveyList = surveyList.filter((project) => {
        if (project.category_name === filterTerm) return project;
      });
      setSurveyInfo(newSurveyList);
    } else {
      setSurveyInfo(surveyList);
    }
  };

  const { pageIndex, globalFilter } = state;

  useLayoutEffect(() => {
    readSurvey();
  }, []);

  const readSurvey = async () => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "survey");
    setSurveyInfo(response.data);
    setSurveyList(response.data);
  };

  const removeSurvey = async (e) => {
    var removeSurveyId = [];

    e.map((d) => removeSurveyId.push(d.original.id));

    var params = new URLSearchParams();
    params.append("id", removeSurveyId);

    if (window.confirm("삭제 하시겠습니까?")) {
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "survey/deleteConfirm", params);
      if (response.data === 0) {
        alert("사용중인 프로그램이 있어 삭제할 수 없습니다.");
      } else {
        const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "survey/delete", params);
        alert("삭제 되었습니다.");
      }

      readSurvey();
      window.location.reload();
    }
  };

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row className="justify-content-md-between m-3 mb-xl-0">
          <Col xxl={2} lg={2} md={6} xs={12}>
            {/* records filtering options */}
            <Form.Control as={FormSelect} placeholder="카테고리" options={categoryOptions} onChange={getFilterTerm} />
          </Col>
          <Col xl={8} lg={6} md={6} xs={12}>
            {/* search records */}
            <div className="mb-2 mb-lg-4">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="설문지를 검색하세요" />
            </div>
          </Col>
          <Col className="d-flex justify-content-end mb-2 mb-lg-4">
            <Button
              variant="secondary"
              className="danger-button justify-content-end"
              onClick={() => {
                removeSurvey(selectedFlatRows);
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

export default SurveyListItems;
