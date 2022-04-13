// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { Image, Card, ProgressBar, ListGroup, Badge } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";
import programImage from "assets/images/course/course-javascript.jpg";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";

const AllProgramsData = (props) => {
  const [programInfo, setProgramInfo] = useState([]);

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "name",
        Header: "이름",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <DotBadge bg="success"></DotBadge>
              <h5 className="mb-0">{value}</h5>
            </div>
          );
        },
      },
      { accessor: "email", Header: "이메일" },
      { accessor: "phone", Header: "연락처" },
    ],
    []
  );

  const data = useMemo(() => programInfo);

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

  useLayoutEffect(() => {
    var category_id = parseInt(props.category);
    if (category_id === 0) readTotal();
    else readByCategory(category_id);
  }, []);

  const readTotal = async () => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program");
    setProgramInfo(response.data);
  };

  const readByCategory = async (category_id) => {
    var params = new URLSearchParams();
    params.append("category_id", category_id);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/category", params);
    setProgramInfo(response.data);
  };

  return (
    <>
      <Row>
        {programInfo.map((item, index) => {
          var address = "/program/" + item.id.toString();
          return (
            <Col lg={3} md={6} sm={12} key={index}>
              {/* <CourseCard item={item} /> */}
              <Card className={`mb-4 card-hover mx-2`}>
                <Link to="/program">
                  {/* <Image src={item.image} alt="" className="card-img-top rounded-top-md" /> */}
                  <Image src={programImage} alt="" className="card-img-top rounded-top-md" />
                </Link>
                <Card.Body>
                  <h3 className="h4 mb-2 text-truncate-line-2 ">
                    <Link to={address} className="text-inherit">
                      {item.program_name}
                    </Link>
                    {/* const id = "detail/" + row.original.id.toString(); return (
                  <Link className="text-inherit" to={id}>
                    <div className="d-flex align-items-center">
                      <h5 className="mb-1 text-primary-hover">{value}</h5>
                    </div>
                  </Link>
                  ); */}
                  </h3>
                  <ListGroup as="ul" bsPrefix="list-inline" className="mb-3"></ListGroup>
                  <div className={`lh-1 mt-3 "d-none"`}>
                    <span className="text-dark fw-bold">D-5</span>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Row className="align-items-center g-0">
                    <Col className="col-auto">
                      {/* <Image src={item.instructor_image} className="rounded-circle avatar-xs" alt="" /> */}
                      <Image src={Avatar1} className="rounded-circle avatar-xs" alt="" />
                    </Col>
                    <Col className="col ms-2">
                      <span>{item.name}</span>
                    </Col>
                    <Col className="col-auto">
                      <Tippy content="Add to Bookmarks" animation={"scale"}>
                        <Link to="#" className="text-muted bookmark">
                          <i className="fe fe-bookmark"></i>
                        </Link>
                      </Tippy>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default AllProgramsData;
