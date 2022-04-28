// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { Image, Card, ProgressBar, ListGroup, Badge, Form } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import moment from "moment";

import "tippy.js/animations/scale.css";
// import custom components
import DotBadge from "components/elements/bootstrap/DotBadge";
import programImage from "assets/images/CSEE.png";
import { FormSelect } from "components/elements/form-select/FormSelect";

const AllProgramsData = (props) => {
  const [programInfo, setProgramInfo] = useState([]);
  const [applyLoading, setApplyLoading] = useState(false);
  const [ddayLoading, setDdayLoading] = useState(false);

  const [applyStartDate, setApplyStartDate] = useState([]);
  const [applyEndDate, setApplyEndDate] = useState([]);
  const [Dday, setDday] = useState([]);
  const dday = [];

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
    response.data.map((item, index) => {
      setApplyStartDate((applyStartDate) => [...applyStartDate, moment(response.data[index].applystart_date).format("YY.MM.DD HH:mm")]);
      setApplyEndDate((applyEndDate) => [...applyEndDate, moment(response.data[index].applyend_date).format("YY.MM.DD HH:mm")]);
    });

    response.data.map((item, index) => {
      setApplyStartDate((applyStartDate) => [...applyStartDate, moment(response.data[index].applystart_date).format("YY.MM.DD HH:mm")]);
      setApplyEndDate((applyEndDate) => [...applyEndDate, moment(response.data[index].applyend_date).format("YY.MM.DD HH:mm")]);
      createDday(response.data[index].applyend_date);
    });
    setApplyLoading(true);
    setDdayLoading(true);
  };

  const createDday = (applyenddate) => {
    var date1 = moment(applyenddate);
    var date2 = moment();

    var days = date1.diff(date2, "days");

    if (date2 > date1) {
      setDday((Dday) => [...Dday, "마감"]);
    } else {
      setDday((Dday) => [...Dday, "D-" + days]);
    }
  };

  const readByCategory = async (category_id) => {
    console.log("======: ", category_id);
    var params = new URLSearchParams();
    params.append("category_id", category_id);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/category", params);
    setProgramInfo(response.data);
  };

  const filterOptions = [
    // { value: "전체", label: "전체" },
    { value: "시작전", label: "시작전" },
    { value: "진행중", label: "진행중" },
    { value: "마감", label: "마감" },
  ];

  const getFilterTerm = (event) => {
    let filterTerm = event.target.value;
    console.log("filter", filterTerm);
    if (filterTerm !== "") {
      const newProjectsList = programInfo.filter((project) => {
        console.log("project", project);
        return Object.values(project).join(" ").toLowerCase().includes(filterTerm.toLowerCase());
      });
      setProgramInfo(newProjectsList);
    } else {
      setProgramInfo(programInfo);
    }
  };

  return (
    <>
      <Row>
        <Row className="justify-content-md-end  ms-2 mb-xl-0">
          <Col xxl={2} lg={2} md={6} xs={12}>
            <Form.Control as={FormSelect} placeholder="전체" options={filterOptions} onChange={getFilterTerm} />
          </Col>
        </Row>
        <Row className="mt-4 m-3">
          {ddayLoading && applyLoading
            ? programInfo.map((item, index) => {
                var address = "/program/" + item.id.toString();
                return (
                  <Col lg={3} md={6} sm={12} key={index}>
                    <Card className={`mb-4 card-hover mx-2`}>
                      <Link to={address}>
                        <Image src={programImage} alt="" className="card-img-top rounded-top-md programImage" width="100px" height="170px" />
                      </Link>
                      <Card.Body style={{ height: "10rem" }}>
                        <h3 className="h4 mb-2 text-truncate-line-2 " style={{ height: "2.5rem" }}>
                          <Link to={address} className="text-inherit">
                            {item.program_name}
                          </Link>
                        </h3>
                        <ListGroup as="ul" bsPrefix="list-inline" className="mb-3"></ListGroup>
                        <div className={`lh-1 mt-3 "d-none"`}>
                          <span className="text-dark fw-bold">
                            <Badge bg="warning" className="me-3">
                              {" "}
                              {Dday[index]}{" "}
                            </Badge>
                          </span>
                        </div>
                        <div className={`lh-1 mt-2 "d-none"`}>
                          <div className="fw-bold">신청마감일자</div>
                          <div className={` mt-1 `}>{applyEndDate[index]}</div>
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <Row className="align-items-center g-0">
                          <Col className="col-auto">
                            {/* <Image src={item.instructor_image} className="rounded-circle avatar-xs" alt="" /> */}
                            {/* <Image src={Avatar1} className="rounded-circle avatar-xs" alt="" /> */}
                          </Col>
                          <Col className="col ms-2">{/* <span>{item.name}</span> */}</Col>
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
              })
            : ""}
        </Row>
      </Row>
    </>
  );
};

export default AllProgramsData;
