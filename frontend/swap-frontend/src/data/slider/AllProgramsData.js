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
import programImage from "assets/images/CSEE.png";
import { FormSelect } from "components/elements/form-select/FormSelect";

const AllProgramsData = (props) => {
  const [term, setTerm] = useState("진행");
  const [termLoading, setTermLoading] = useState(true);

  const getFilterTerm = (event) => {
    setTermLoading(false);
    setTerm(event.target.value);
    setTermLoading(true);
  };

  const createDday = (applyenddate) => {
    var date1 = moment(applyenddate);
    var date2 = moment();

    var days = date1.diff(date2, "days") + 1;

    if (date2 > date1) {
      return "마감";
    } else {
      return "D-" + days;
    }
  };

  const filterOptions = [
    { value: "진행", label: "진행" },
    { value: "전체", label: "전체" },
    { value: "대기", label: "대기" },
    { value: "마감", label: "마감" },
  ];

  return (
    <>
      <Row>
        <Row className="justify-content-md-end  ms-2 mb-xl-0">
          <Col xxl={2} lg={2} md={6} xs={12}>
            <Form.Control as={FormSelect} options={filterOptions} onChange={getFilterTerm} />
          </Col>
        </Row>
        <Row className="mt-4 m-3">
          {termLoading
            ? props.category_data
                .filter((project) => Object.values(project).join(" ").toLowerCase().includes(term.toLowerCase()))
                .map((item, index) => {
                  var address = "/program/" + item.id.toString();
                  return (
                    <Col lg={3} md={6} sm={12} key={index}>
                      <Card className={`mb-4 card-hover mx-2 main-program-card`}>
                        <Link to={address}>
                          <Image src={programImage} alt="" className="card-img-top rounded-top-md programImage" width="100px" height="170px" />
                        </Link>
                        <Card.Body style={{ height: "6rem" }}>
                          <span className="text-dark fw-bold">
                            <Badge bg="primary" className="me-3 main-program-badge">
                              {" "}
                              {createDday(item.applyend_date)}
                            </Badge>
                          </span>
                          <h3 className="h4 text-truncate-line-2 " style={{ height: "2.7rem" }}>
                            <Link to={address} className="text-inherit">
                              {item.program_name}
                            </Link>
                          </h3>
                        </Card.Body>
                        <Card.Footer>
                          <Row className="align-items-center g-0">
                            <Col className="col-auto">
                              <div className={`lh-1  "d-none"`}>
                                <div className="fw-bold">신청마감일자</div>
                                <div className={` mt-1 `}>{item.applyend_date}</div>
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
