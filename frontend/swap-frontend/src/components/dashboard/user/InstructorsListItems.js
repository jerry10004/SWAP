// import node module libraries
import React, { Fragment, useMemo, useEffect, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Dropdown, OverlayTrigger, Tooltip, Row, Col, Table, Button } from "react-bootstrap";
import { MoreVertical, Trash, Edit } from "react-feather";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";

const InstructorsListItems = (props) => {
  const [adminInfo, setAdminInfo] = useState([]);

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
      // {
      //   accessor: "delete",
      //   Header: "",
      //   Cell: () => {
      //     return (
      //       <div className="align-middle border-top-0">
      //         <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
      //           <Link to="#">
      //             <Trash
      //               size="15px"
      //               className="dropdown-item-icon"
      //               onClick={() => {
      //                 removeAdmin();
      //               }}
      //             />
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

  const data = useMemo(() => adminInfo);

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

  useLayoutEffect(() => {
    readAdmin();
  }, []);

  const readAdmin = async () => {
    const response = await axios.get("http://localhost:8080/swap/admin");
    setAdminInfo(response.data);
  };

  const removeAdmin = async (e) => {
    var removeAdminId = [];

    e.map((d) => removeAdminId.push(d.original.id));

    var params = new URLSearchParams();
    params.append("id", removeAdminId);

    if (window.confirm("관리자에서 내보내시겠습니까?")) {
      const response = await axios.post("http://localhost:8080/swap/admin/delete", params);
      alert("내보내졌습니다.");
      readAdmin();
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
            {headerGroups?.map((headerGroup) => (
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
        <div>
          <Button
            onClick={() => {
              removeAdmin(selectedFlatRows);
            }}
          >
            관리자에서 내보내기
          </Button>
          {/* <Button
            onClick={() => {
              removeUser(selectedFlatRows);
            }}
          >
            삭제하기
          </Button> */}
        </div>
      </div>

      {/* Pagination @ Footer */}
      <Pagination previousPage={previousPage} pageCount={pageCount} pageIndex={pageIndex} gotoPage={gotoPage} nextPage={nextPage} />
    </Fragment>
  );
};

export default InstructorsListItems;
