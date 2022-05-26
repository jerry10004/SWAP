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
import programImage from "assets/images/Default_img.png";

const Bookmark = () => {
  const [toggleBookmark, setToggleBookmark] = useState(false);
  const [alllikeData, setAllLikeData] = useState([]);
  const [likedPrograms, setLikedPrograms] = useState([]);

  var ID = parseInt(window.sessionStorage.getItem("id"));

  useLayoutEffect(() => {
    readLikedPrograms();
  }, []);

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

  const readLikedPrograms = async () => {
    var params = new URLSearchParams();
    params.append("user_id", ID);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/bookmark", params);
    setLikedPrograms(response.data);
    console.log("Liked Programs: ", response.data);
  };

  const deleteLike = async (programID) => {
    var params = new URLSearchParams();
    params.append("user_id", ID);
    params.append("program_id", programID);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "like/delete", params);
    window.location.reload();
  };

  return (
    <>
      <Card>
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">저장한 프로그램</h3>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            {likedPrograms.map((item, index) => {
              var address = "/swap/program/" + item.id.toString();
              return (
                <Col lg={4} md={12} sm={12} key={index}>
                  <Card className={`mb-4 card-hover mx-2 main-program-card`}>
                    <Link to={address}>
                      {/* <Image src={programImage} alt="" className="card-img-top rounded-top-md programImage" width="100px" height="170px" /> */}
                      {item.file_name ? (
                            <Image
                              src={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + item.file_name}
                              alt=""
                              className="card-img-top rounded-top-md programImage"
                              width="100px"
                              height="170px"
                            />
                          ) : (
                            <Image src={programImage} alt="" className="card-img-top rounded-top-md programImage" width="100px" height="170px" />
                          )}
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
                        <Col className="col ms-2"></Col>
                        <Col className="col-auto">
                          <Tippy content="찜 삭제하기" animation={"scale"}>
                            <Button onClick={() => deleteLike(item.id)} type="button" className="p-0 bg-transparent border-0 text-primary">
                              <i className="fe fe-trash"></i>
                            </Button>
                          </Tippy>
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Bookmark;
