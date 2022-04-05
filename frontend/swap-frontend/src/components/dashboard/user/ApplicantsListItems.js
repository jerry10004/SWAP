// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";

const StudentsListItems = (props) => {
  const [userInfo, setUserInfo] = useState([]);
  const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);
  const [program_id, setProgram_id] = useState();
  const [applicant_id, setApplicant_id] = useState([]);
  const [applicant_status, setApplicant_status] = useState("1");

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "name",
        Header: "이름",
        Cell: ({ value }) => {
          return (
            <div className="d-flex align-items-center">
              <h5 className="mb-0">{value}</h5>
            </div>
          );
        },
      },

      { accessor: "email", Header: "이메일" },

      {
        accessor: "student_id",
        Header: "학번",
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
        accessor: "department",
        Header: "학부",
      },
      {
        accessor: "major1",
        Header: "1전공",
      },

      {
        accessor: "status",
        Header: "상태",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <DotBadge bg={row.original.status === 2 ? "warning" : "success"}></DotBadge>
              {value === 2 ? "참여보류" : "참여승인"}
            </div>
          );
        },
      },
    ],
    []
  );

  const update = async (e) => {
    var updateApplicantId = [];
    var updateApplicantStatus = [];
    var params = new URLSearchParams();

    e.map((d) => {
      updateApplicantId.push(d.original.id);
      updateApplicantStatus.push(applicant_status);
    });

    params.append("id", updateApplicantId);
    params.append("status", updateApplicantStatus);
    console.log("선택된 status: ", applicant_status);
    console.log("id 리스트: ", updateApplicantStatus.toString);

    if (updateApplicantId != "") {
      if (window.confirm("강의를 수정하시겠습니까?")) {
        const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + program_id + "/update", params);
        readApplicantInformation(props.param4.id);
        alert("강의가 수정되었습니다.");
      }
    }
  };

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

  const handleChangeSelect = (e) => {
    setApplicant_status(e.target.value);
  };

  useLayoutEffect(() => {
    console.log(props.param4.id);
    readApplicantInformation(props.param4.id);
    setProgram_id(props.param4.id);
  }, []);

  const readApplicantInformation = async (id) => {
    setApplicantInformationLoading(false);
    console.log("id is", id);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + id);
    console.log("~이거를보자~~~~`");
    console.log(response.data);

    console.log("id 입니다. ", applicant_id);
    setApplicantInformationLoading(true);
    setUserInfo(response.data);
  };

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row>
          <Col xl={6} lg={12} md={6} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Search Students" />
          </Col>
          <Col xl={3} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
            <Form.Select onChange={handleChangeSelect}>
              <option value="1">참여승인</option>
              <option value="2">승인보류</option>
            </Form.Select>
          </Col>
          <Col xl={3} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
            <Button
              variant="primary"
              onClick={() => {
                update(selectedFlatRows);
              }}
            >
              저장
            </Button>
          </Col>
          {/* <Form.Group className="mb-3 w-26 ">
            <FormSelect options={templateOptions} id="application-template" name="application_form" onChange={handleChange} placeholder="신청서 템플릿 선택" />
          </Form.Group> */}
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
