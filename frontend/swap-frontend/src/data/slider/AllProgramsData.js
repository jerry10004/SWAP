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
  const [firstProgramInfo, setFirstProgramInfo] = useState([]);

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
    setApplyLoading(false);
    setDdayLoading(false);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program");
    setProgramInfo(response.data);
    setFirstProgramInfo(response.data);
    response.data.map((item, index) => {
      setApplyStartDate((applyStartDate) => [...applyStartDate, moment(response.data[index].applystart_date).format("YY-MM-DD HH:mm")]);
      setApplyEndDate((applyEndDate) => [...applyEndDate, moment(response.data[index].applyend_date).format("YY-MM-DD HH:mm")]);
    });

    response.data.map((item, index) => {
      setApplyStartDate((applyStartDate) => [...applyStartDate, moment(response.data[index].applystart_date).format("YY-MM-DD HH:mm")]);
      setApplyEndDate((applyEndDate) => [...applyEndDate, moment(response.data[index].applyend_date).format("YY-MM-DD HH:mm")]);
      createDday(response.data[index].applyend_date);
    });
    setApplyLoading(true);
    setDdayLoading(true);
  };

  const readByCategory = async (category_id) => {
    setApplyLoading(false);
    setDdayLoading(false);
    var params = new URLSearchParams();
    params.append("category_id", category_id);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/category", params);
    setProgramInfo(response.data);
    setFirstProgramInfo(response.data);
    response.data.map((item, index) => {
      setApplyStartDate((applyStartDate) => [...applyStartDate, moment(response.data[index].applystart_date).format("YY-MM-DD HH:mm")]);
      setApplyEndDate((applyEndDate) => [...applyEndDate, moment(response.data[index].applyend_date).format("YY-MM-DD HH:mm")]);
    });

    response.data.map((item, index) => {
      setApplyStartDate((applyStartDate) => [...applyStartDate, moment(response.data[index].applystart_date).format("YY-MM-DD HH:mm")]);
      setApplyEndDate((applyEndDate) => [...applyEndDate, moment(response.data[index].applyend_date).format("YY-MM-DD HH:mm")]);
      createDday(response.data[index].applyend_date);
    });
    setApplyLoading(true);
    setDdayLoading(true);
  };

  const createDday = (applyenddate) => {
    var date1 = moment(applyenddate);
    var date2 = moment();

    var days = date1.diff(date2, "days") + 1;

    if (date2 > date1) {
      setDday((Dday) => [...Dday, "마감"]);
    } else {
      setDday((Dday) => [...Dday, "D-" + days]);
    }
  };

  const filterOptions = [
    { value: "진행", label: "진행" },
    { value: "전체", label: "전체" },
    { value: "대기", label: "대기" },
    { value: "마감", label: "마감" },
  ];

  const getFilterTerm = (event) => {
    if (applyLoading && ddayLoading) {
      let filterTerm = event.target.value;
      if (filterTerm !== "전체") {
        const newProjectsList = firstProgramInfo.filter((project) => {
          return Object.values(project).join(" ").toLowerCase().includes(filterTerm.toLowerCase());
        });
        console.log("00: ", newProjectsList);
        setProgramInfo(newProjectsList);
      } else {
        setProgramInfo(programInfo);
        console.log("11: ", programInfo);
      }
    }
  };

  return (
    <>
      <Row>
        <Row className="justify-content-md-end  ms-2 mb-xl-0">
          <Col xxl={2} lg={2} md={6} xs={12}>
            <Form.Control as={FormSelect} options={filterOptions} onChange={getFilterTerm} />
          </Col>
        </Row>
        <Row className="mt-4 m-3">
          {ddayLoading && applyLoading
            ? programInfo.map((item, index) => {
                var address = "/program/" + item.id.toString();
                return (
                  <Col lg={3} md={6} sm={12} key={index}>
                    <Card className={`mb-4 card-hover mx-2 main-program-card`}>
                      <Link to={address}>
                        <Image src={programImage} alt="" className="card-img-top rounded-top-md programImage" width="100px" height="170px" />
                      </Link>
                      <Card.Body style={{ height: "6rem" }}>
                        {/* <div className={`lh-1 mb-2 "d-none" `}> */}
                        <span className="text-dark fw-bold">
                          <Badge bg="primary" className="me-3 main-program-badge">
                            {" "}
                            {Dday[index]}{" "}
                          </Badge>
                        </span>
                        {/* </div> */}
                        <h3 className="h4 text-truncate-line-2 " style={{ height: "2.7rem" }}>
                          <Link to={address} className="text-inherit">
                            {item.program_name}
                          </Link>
                        </h3>
                      </Card.Body>
                      <Card.Footer>
                        <Row className="align-items-center g-0">
                          <Col className="col-auto">
                            {/* <Image src={item.instructor_image} className="rounded-circle avatar-xs" alt="" /> */}
                            {/* <Image src={Avatar1} className="rounded-circle avatar-xs" alt="" /> */}
                            <div className={`lh-1  "d-none"`}>
                              <div className="fw-bold">신청마감일자</div>
                              <div className={` mt-1 `}>{applyEndDate[index]}</div>
                            </div>
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
