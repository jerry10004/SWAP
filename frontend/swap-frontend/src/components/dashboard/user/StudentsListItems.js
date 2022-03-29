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
              {/* <Image src={row.original.image} alt="" className="rounded-circle avatar-md me-2" /> */}
              <h5 className="mb-0">{value}</h5>
            </div>
          );
        },
      },
      { accessor: "phone", Header: "연락처" },
      { accessor: "email", Header: "이메일" },

      // { accessor: "image", Header: "", show: false },
      {
        accessor: "student_id",
        Header: "학번",
        // Cell:({value}) =>{
        //  if(value===0)? return("") : return({value});
        // }
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
        accessor: "major2",
        Header: "2전공",
      },
      // {
      //   accessor: "delete",
      //   Header: "",
      //   Cell: () => {
      //     return (
      //       <div className="align-middle border-top-0">
      //         <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
      //           <Link to="#">
      //             <Trash size="15px" className="dropdown-item-icon" />
      //           </Link>
      //         </OverlayTrigger>
      //       </div>
      //     );
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

  // const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, state, gotoPage, pageCount, prepareRow, setGlobalFilter } = useTable(
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
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
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
    const response = await axios.get("http://localhost:8080/swap/user");
    console.log(response.data);
    setUserInfo(response.data);
  };
  const [addId, setAddId] = useState([2, 3]);

  const createAdmin = async (e) => {
    var addAdminId = [];

    e.map((d) => addAdminId.push(d.original.id));

    var params = new URLSearchParams();
    params.append("adminId", addAdminId);

    if (window.confirm("관리자로 추가하시겠습니까?")) {
      const response = await axios.post("http://localhost:8080/swap/admin/add", params);
      alert("추가 되었습니다");
    }
  };

  // const removeAdmin = async (e) => {
  //   if (window.confirm("삭제하시겠습니까?")) {
  //     axios({
  //       url: process.env.REACT_APP_RESTAPI_HOST + "administrator/del_date/" + id,
  //       method: "put",
  //       data: {
  //         email: email,
  //         token: window.sessionStorage.getItem("token"),
  //         manageID: window.sessionStorage.getItem("id"),
  //       },
  //     }).then(function (res) {
  //       alert("변경되었습니다.");
  //       readAdmin();
  //     });
  //   }
  // };

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
            <Edit size="18px" className="dropdown-item-icon" /> 관리자로 보내기
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            {" "}
            <Trash size="18px" className="dropdown-item-icon" /> 탈퇴시키기
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <Fragment>
      <div className=" overflow-hidden">
        <Row>
          <Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
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
                    //idx는 각 column
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div>
          <Button
            onClick={() => {
              createAdmin(selectedFlatRows);
            }}
          >
            관리자 추가
          </Button>
          <Button>삭제하기</Button>
        </div>
      </div>

      {/* Pagination @ Footer */}
      <Pagination previousPage={previousPage} pageCount={pageCount} pageIndex={pageIndex} gotoPage={gotoPage} nextPage={nextPage} />
    </Fragment>
  );
};

export default StudentsListItems;
