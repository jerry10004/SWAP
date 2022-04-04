// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Dropdown, Image, Row, Col, Table, Button } from "react-bootstrap";
import { MoreVertical, Trash, Edit } from "react-feather";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";

const StudentsListItems = (props) => {
  const [userInfo, setUserInfo] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);
  const [program_id, setProgram_id] = useState();

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
      { accessor: "phone", Header: "연락처" },
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
        Cell: ({ value }) => {
          return (
            <select id="applicant_status" className="applicant_status" name="program_category" disabled>
              <option value="" selected hidden>
                {value === 0 ? "참여보류" : "참여승인"}
              </option>
              <option value="0">참여승인</option>
              <option value="1">참여보류</option>
            </select>
          );
        },
      },
    ],
    []
  );
  const edit = () => {
    setIsEdit(true);

    const target = document.getElementsByClassName("applicant_status");

    for (let i = 0; i < target.length; i++) {
      target[i].disabled = false;
    }
  };

  const update = () => {
    setIsEdit(false);

    const target = document.getElementsByClassName("applicant_status");
    for (let i = 0; i < target.length; i++) {
      target[i].disabled = true;
    }

    console.log(program_id);

    if (window.confirm("강의를 수정하시겠습니까?")) {
      axios({
        url: "http://localhost:8080/swap/applicant/applicants/" + program_id + "/update",
        method: "post",
        data: {
          id: 1,
          status: 5,
        },
      }).then(function (res) {
        // readAllLecture();
        // setSelectedLecture(null);
        // seteditLecture(false);
        // seteditcalendar(false);
        alert("강의가 수정되었습니다.");
      });
    }
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

  // useLayoutEffect(() => {
  //   readUser();
  // }, []);
  useLayoutEffect(() => {
    console.log(props.param4.id);
    readApplicantInformation(props.param4.id);
    setProgram_id(props.param4.id);
  }, []);

  const readApplicantInformation = async (id) => {
    setApplicantInformationLoading(false);
    console.log("id is", id);
    const response = await axios.get("http://localhost:8080/swap/applicant/applicants/" + id);
    console.log("~이거를보자~~~~`");
    console.log(response.data);
    setApplicantInformationLoading(true);
    setUserInfo(response.data);
  };

  // const readUser = async () => {
  //   const response = await axios.get("http://localhost:8080/swap/user/students");
  //   setUserInfo(response.data);
  // };

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Search Students" />
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
      {isEdit === false ? (
        <div className="d-flex justify-content-end me-4">
          <Button variant="primary" onClick={edit}>
            수정
          </Button>
        </div>
      ) : (
        <div className="d-flex justify-content-end me-4">
          <Button variant="success" onClick={update}>
            완료
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default StudentsListItems;
