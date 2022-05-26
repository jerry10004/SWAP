// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";
import Icon from "@mdi/react";
import { mdiAccountMultipleOutline } from "@mdi/js";

const ApplicantsListItems = (props) => {
  const [userInfo, setUserInfo] = useState([]);
  const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);
  const [program_id, setProgram_id] = useState();
  const [applicant_id, setApplicant_id] = useState([]);
  const [program_status, setProgram_status] = useState();
  const [applicant_status, setApplicant_status] = useState("0");
  const [programQuota, setProgramQuota] = useState();
  const [applicants_num, setApplicants_num] = useState();

  const infinite = "무제한";

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
      {
        accessor: "student_id",
        Header: "학번",
        Cell: ({ value }) => {
          if (value === 0) return "";
          else return value;
        },
      },
      { accessor: "email", Header: "이메일" },
      {
        accessor: "department",
        Header: "학부",
      },
      {
        accessor: "major1",
        Header: "1전공",
      },
      {
        accessor: "student_class",
        Header: "학년",
        Cell: ({ value }) => {
          if (value === 0) return "";
          else return value + " 학년";
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
        accessor: "status",
        Header: "상태",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <DotBadge
                bg={
                  row.original.status === 0
                    ? "warning"
                    : row.original.status === 1
                    ? "success"
                    : row.original.status === 2
                    ? "danger"
                    : row.original.status === 3
                    ? "secondary"
                    : row.original.status === 4
                    ? "primary"
                    : ""
                }
              ></DotBadge>
              {value === 0 ? "참여보류" : value === 1 ? "참여승인" : value === 2 ? "참여불가" : value === 3 ? "미수료" : value === 4 ? "수료" : ""}
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
    params.append("program_id", program_id);

    if (updateApplicantId != "") {
      if (window.confirm("사용자 상태를 수정하시겠습니까?")) {
        const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + program_id + "/update", params);
        readApplicantInformation(props.param4.id);
        readProgramQuota(props.param4.id);
        alert("사용자 상태가 수정되었습니다.");
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
    readProgramStatus(props.param4.id);
    readApplicantInformation(props.param4.id);
    setProgram_id(props.param4.id);
    readProgramQuota(props.param4.id);
  }, []);

  const readProgramStatus = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id);
    setProgram_status(response.data[0].status);
  };

  const readApplicantInformation = async (id) => {
    setApplicantInformationLoading(false);

    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + id);

    setApplicantInformationLoading(true);
    setUserInfo(response.data);
  };

  const readProgramQuota = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id);
    setProgramQuota(response.data[0].quota);
    setApplicants_num(response.data[0].applicants_num);
  };

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row className="pe-3">
          <Col xl={3} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 px-5 py-4 ">
            <div className="d-flex align-items-center fs-5 mt-3">
              <Icon path={mdiAccountMultipleOutline} size={1} />
              신청현황 :{" "}
              <span>
                {" "}
                {applicants_num + "명"} / {programQuota == null || programQuota === 0 || programQuota === "무제한" ? infinite : programQuota + "명"}{" "}
              </span>
            </div>
          </Col>
          <Col xl={6} lg={12} md={6} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Search Students" />
          </Col>

          <Col xl={2} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 px-3 py-4 ">
            {program_status === 0 ? (
              <Form.Select onChange={handleChangeSelect}>
                <option value="0">참여보류</option>
                <option value="1">참여승인</option>
                <option value="2">참여불가</option>
              </Form.Select>
            ) : program_status === 2 ? (
              <Form.Select onChange={handleChangeSelect}>
                <option value="3">미수료</option>
                <option value="4">수료</option>
              </Form.Select>
            ) : (
              ""
            )}
          </Col>
          <Col xl={1} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 py-4 d-flex justify-content-evenly">
            {program_status !== 1 ? (
              <Button
                variant="primary"
                onClick={() => {
                  update(selectedFlatRows);
                }}
              >
                저장
              </Button>
            ) : (
              ""
            )}
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

export default ApplicantsListItems;
