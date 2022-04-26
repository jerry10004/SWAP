// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { Image, Card, ProgressBar, ListGroup, Badge } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import moment from "moment";

import "tippy.js/animations/scale.css";
// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";
import programImage from "assets/images/CSEE.png";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";
import { DivideSquare } from "react-feather";

const AllProgramsData = (props) => {
  const [programInfo, setProgramInfo] = useState([]);
  const [applyLoading, setApplyLoading] = useState(false);
  const [ddayLoading, setDdayLoading] = useState(false);

  const [applyStartDate, setApplyStartDate] = useState([]);
  const [applyEndDate, setApplyEndDate] = useState([]);
  // const [dDay, setDday] = useState([]);
  const [Dday, setDday] = useState();
  const Applystartdate = [];
  const Applyenddate = [];
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

    console.log("!!!!!!! ");
    console.log(response.data);

    response.data.map((item, index) => {
      // setStartDate( (startDate) => [...startDate, moment(response.data.start_date).format("YY.MM.DD HH:mm")]);
      // setEndDate((endDate) => [...startDate, moment(response.data.end_date).format("YY.MM.DD HH:mm"));
      console.log("ssssss ", response.data[1].applystart_date);
      Applystartdate.push(moment(response.data[index].applystart_date).format("YY.MM.DD HH:mm"));
      Applyenddate.push(moment(response.data[index].applyend_date).format("YY.MM.DD HH:mm"));
      // dday.push(Dday(apply))
      Dday2(response.data[index].applyend_date);
    });

    setApplyLoading(true);
    // if (applyLoading) {
    //   response.data.map((item, index) => {
    //     Dday((dday) => [...dday, response.data[index].dday]);
    //   });
    // }

    // if (applyLoading) {
    //   Applystartdate.map((item) => {
    //     console.log("item is: ", item);
    //     setApplyStartDate(applyStartDate.concat(item));
    //     console.log("now is : ", applyStartDate);
    //   });
    //   Applyenddate.map((item2) => {
    //     setApplyEndDate(applyEndDate.concat(item2));
    //   });
    //   dday.map((item3) => {
    //     setDday(dDay.concat(item3));
    //   });
    // }
    setDdayLoading(true);
  };

  const Dday2 = (applyenddate) => {
    var date1 = moment(applyenddate);
    // console.log(date1);
    var date2 = moment();
    // console.log(date2);
    //var duration = moment.duration(date2.diff(date1, 'days'));
    var days = date1.diff(date2, "days");

    if (date2 > date1) {
      setDday("마감");
      // dday.push("마감");
    } else {
      setDday("D-" + days);
      // dday.push("D-" + days);
    }
    // console.log("start: ", Applystartdate);
    // console.log("end: ", Applyenddate);
    // console.log("dday: ", dday[1]);
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
        {ddayLoading
          ? programInfo.map((item, index) => {
              var address = "/program/" + item.id.toString();
              console.log("hehere: ", applyEndDate[0]);

              return (
                <Col lg={3} md={6} sm={12} key={index}>
                  {/* <CourseCard item={item} /> */}
                  <Card className={`mb-4 card-hover mx-2`}>
                    <Link to="/program">
                      {/* <Image src={item.image} alt="" className="card-img-top rounded-top-md" /> */}
                      <Image src={programImage} alt="" className="card-img-top rounded-top-md programImage" width="100px" height="170px" />
                    </Link>
                    <Card.Body style={{ height: "10rem" }}>
                      <h3 className="h4 mb-2 text-truncate-line-2 " style={{ height: "2.5rem" }}>
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
                        <span className="text-dark fw-bold">
                          <Badge bg="warning" className="me-3">
                            {" "}
                            {Dday}{" "}
                          </Badge>
                        </span>
                      </div>
                      <div className={`lh-1 mt-2 "d-none"`}>
                        <div className="fw-bold">
                          신청마감일자 {/* {Applystartdate[1]} ~ {Applyenddate[1]} */}
                          {/* {Applystartdate[2]} ~ {Applyenddate[2]} */}
                        </div>
                        <div className={` mt-1 `}>2022-03-28 14:22:00</div>
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
    </>
  );
};

export default AllProgramsData;
