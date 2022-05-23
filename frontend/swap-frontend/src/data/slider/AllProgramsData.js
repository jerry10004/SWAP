// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button, FormText } from "react-bootstrap";
import axios from "axios";
import { Image, Card, ProgressBar, ListGroup, Badge, Form } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import moment from "moment";

import "tippy.js/animations/scale.css";
// import custom components
import programImage from "assets/images/Default_img.png";
import { FormSelect } from "components/elements/form-select/FormSelect";

const AllProgramsData = (props) => {
  const [term, setTerm] = useState("진행");
  const [searchTerm, setSearchTerm] = useState("");
  const [termLoading, setTermLoading] = useState(true);
  const [toggleBookmark, setToggleBookmark] = useState(false);
  const [alllikeData, setAllLikeData] = useState([]);
  const [userInfo, setUserInfo] = useState();

  var ID = parseInt(window.sessionStorage.getItem("id"));

  useLayoutEffect(() => {
    readApplicantInformation(ID);
  }, []);

  const getFilterTerm = (event) => {
    setTermLoading(false);
    setTerm(event.target.value);
    setTermLoading(true);
  };

  const getSearchTerm = (event) => {
    setSearchTerm(event.target.value);
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

  const categoryOptions = [
    { value: "진행", label: "신청 진행" },
    { value: "전체", label: "전체" },
    { value: "대기", label: "신청 대기" },
    { value: "마감", label: "신청 마감" },
  ];

  const readAllLike = async (userID) => {
    var params = new URLSearchParams();
    params.append("user_id", userID);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "like/readAllLike", params);
    response.data.map((item) => {
      if (!alllikeData.includes(item)) {
        setAllLikeData((prevState) => [...prevState, item.program_id]);
      }
    });
  };

  const deleteLike = async (userID, programID) => {
    setAllLikeData(alllikeData.filter((item) => item !== programID));
    var params = new URLSearchParams();
    params.append("user_id", userID);
    params.append("program_id", programID);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "like/delete", params);
  };

  const addLike = async (userID, programID) => {
    setAllLikeData((prevState) => [...prevState, programID]);
    var params = new URLSearchParams();
    params.append("user_id", userID);
    params.append("program_id", programID);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "like/add", params);
  };

  const readApplicantInformation = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    setUserInfo(response.data[0]);
    if (response.data[0].status === 1) {
      readAllLike(ID);
    }
  };

  const onToggle = (programID) => {
    if (userInfo.status === 0) {
      alert("관리자는 찜 기능을 사용하실 수 없습니다. ");
    } else {
      if (alllikeData.includes(programID)) {
        deleteLike(ID, programID);
      } else {
        addLike(ID, programID);
      }
    }
  };

  return (
    <>
      <Row>
        <Row className="justify-content-md-between  ms-2 mb-xl-0">
          <Col xl={8} lg={6} md={6} xs={12}>
            {/* search records */}
            <input type="search" className="form-control mx-3" placeholder="프로그램을 검색하세요" onChange={getSearchTerm} />
          </Col>
          <Col xxl={2} lg={2} md={6} xs={12}>
            <Form.Control as={FormSelect} options={categoryOptions} onChange={getFilterTerm} />
          </Col>
        </Row>
        <Row className="mt-4 m-3">
          {termLoading ? (
            term === "전체" ? (
              props.category_data
                .filter((project) => Object.values(project).join(" ").toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => {
                  var address = process.env.REACT_APP_DEFAULT_URL+"program/" + item.id.toString();

                  return (
                    <Col lg={3} md={6} sm={12} key={index}>
                      <Card className={`mb-4 card-hover mx-2 main-program-card`}>
                        <Link to={address}>
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
                                <div className={` mt-1 `}>{moment(item.applyend_date).format("YY-MM-DD HH:mm")}</div>
                              </div>
                            </Col>
                            <Col className="col ms-2">{/* <span>{item.name}</span> */}</Col>
                            <Col className="col-auto">
                              <Tippy content="프로그램 찜하기" animation={"scale"}>
                                <Button onClick={() => onToggle(item.id)} type="button" className="p-0 bg-transparent border-0 text-primary">
                                  {alllikeData.includes(item.id) ? <i className="fas fa-bookmark"></i> : <i className="far fa-bookmark"></i>}
                                </Button>
                              </Tippy>
                            </Col>
                          </Row>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })
            ) : (
              Object.values(props.category_data)
                .filter((project) => Object.values(project).join(" ").toLowerCase().includes(term.toLowerCase()))
                .filter((project) => Object.values(project).join(" ").toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => {
                  var address = process.env.REACT_APP_DEFAULT_URL+"program/" + item.id.toString();
                  return (
                    <Col lg={3} md={6} sm={12} key={index}>
                      <Card className={`mb-4 card-hover mx-2 main-program-card`}>
                        <Link to={address}>
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
                                <div className={` mt-1 `}>{moment(item.applyend_date).format("YY-MM-DD HH:mm")}</div>
                              </div>
                            </Col>
                            <Col className="col ms-2">{/* <span>{item.name}</span> */}</Col>
                            <Col className="col-auto">
                              <Tippy content="프로그램 찜하기" animation={"scale"}>
                                <Button onClick={() => onToggle(item.id)} type="button" className="p-0 bg-transparent border-0 text-primary">
                                  {alllikeData.includes(item.id) ? <i className="fas fa-bookmark"></i> : <i className="far fa-bookmark"></i>}
                                </Button>
                              </Tippy>
                            </Col>
                          </Row>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })
            )
          ) : (
            <></>
          )}
        </Row>
      </Row>
    </>
  );
};

export default AllProgramsData;
