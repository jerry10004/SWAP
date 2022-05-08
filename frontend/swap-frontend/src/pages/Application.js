// import node module libraries
import React, { Fragment, useState, useLayoutEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { Col, Row, Container, Card, Form, Button, ListGroup, Badge, Image } from "react-bootstrap";
// import imgA from "assets/images/application/application-01.png";
import DefaultImg from "assets/images/Default_img.png";
import FormRender from "./FormRender";
import moment from "moment";

// import custom components
import axios from "axios";

import "assets/scss/application.scss";

// import layouts
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/Footer";

const Application = () => {
  const id = useParams();
  const [userInfo, setUserInfo] = useState();
  const [programInfo, setProgramInfo] = useState();
  const [programInfoLoading, setProgramInfoLoading] = useState(false);

  const [applicantInformation, setApplicantInformation] = useState(null);
  const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);

  const [startdate, setStartDate] = useState();
  const [enddate, setEndDate] = useState();
  const [Applystartdate, setApplyStartDate] = useState();
  const [Applyenddate, setApplyEndDate] = useState();
  const [dday, setDday] = useState();
  const [daysLeft, setdaysLeft] = useState(true);
  const [quotaLeft, setquotaLeft] = useState(true);
  const [status, setStatus] = useState();
  const [poster, setPoster] = useState();

  var ID = parseInt(window.sessionStorage.getItem("id"));
  var programID = parseInt(id["id"]);

  const infinite = "무제한";

  const navigate = useNavigate();

  useLayoutEffect(() => {
    readApplicantInformation(ID);
    readProgramInformation();
  }, []);

  const readApplicantInformation = async (id) => {
    setApplicantInformationLoading(false);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    setApplicantInformation(response.data);
    setApplicantInformationLoading(true);
    setStatus(response.data[0].status);
  };

  const readProgramInformation = async () => {
    setProgramInfoLoading(false);
    var params = new URLSearchParams();

    if (id["id"] != null) {
      params.append("id", id["id"]);
      const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id["id"]);

      setProgramInfo(response.data[0]);
      setProgramInfoLoading(true);

      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].file_type === 1) {
          setPoster(response.data[i].file_name);
        }
      }

      setStartDate(moment(response.data[0].start_date).format("YY-MM-DD HH:mm"));
      setEndDate(moment(response.data[0].end_date).format("YY-MM-DD HH:mm"));
      setApplyStartDate(moment(response.data[0].applystart_date).format("YY-MM-DD HH:mm"));
      setApplyEndDate(moment(response.data[0].applyend_date).format("YY-MM-DD HH:mm"));
      Dday(response.data[0].applyend_date);

      if (response.data[0].applicants_num >= response.data[0].quota && (response.data[0].quota != 0 || response.data[0].quota != "무제한")) {
        setquotaLeft(false);
      } else {
        setquotaLeft(true);
      }
    }
  };

  const Dday = async (Applyenddate) => {
    var date1 = moment(Applyenddate);
    var date2 = moment();

    var days = date1.diff(date2, "days") + 1;

    if (date2 > date1) {
      setdaysLeft(false);
      setDday("마감");
    } else {
      setdaysLeft(true);
      setDday("D-" + days);
    }
  };

  const props = { userid: ID, programid: programID, daysleft: daysLeft, quotaleft: quotaLeft, count: 0, Status: status };

  return (
    <Fragment>
      {applicantInformationLoading & programInfoLoading ? (
        <div>
          <NavbarDefault />

          <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary ">
            <Container>
              <Row className="align-items-center ">
                <Col xl={7} lg={7} md={12} sm={12}>
                  <div>
                    <h1 className="text-white display-4 fw-semi-bold">{programInfo.program_name}</h1>
                    <div className="d-flex flex-row align-middle">
                      <Badge bg="warning" className="me-3">
                        {" "}
                        {dday}{" "}
                      </Badge>
                      <span className="text-white me-1">
                        <i className="fe fe-users"></i>
                      </span>
                      <span className="fw-bold text-white"> 신청기간 - </span>
                      <span className="text-white">
                        {" "}
                        {Applystartdate} ~ {Applyenddate}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          <div className="py-6 mt-lg-n18">
            <Container>
              <Row>
                <Col xl={8} lg={8} md={12} sm={12}>
                  {/*  Card */}
                  <Card className="mb-4 mb-lg-4">
                    {/*  Card header */}
                    <Card.Header>
                      <h3 className="mb-0">신청서</h3>
                    </Card.Header>
                    {/*  Card body */}
                    <Card.Body>
                      <Form className="row  " id="application">
                        <Col sm={12} md={12} className="mb-4 ">
                          <Form.Group controlId="nameoncard">
                            <Form.Label>신청자 정보</Form.Label>
                            {applicantInformation[0].status === 0 ? (
                              <div>{applicantInformation[0].name}</div>
                            ) : (
                              <div>
                                {applicantInformation[0].name}/ {applicantInformation[0].student_id} / {applicantInformation[0].department}/{applicantInformation[0].major1}
                              </div>
                            )}
                          </Form.Group>
                        </Col>
                      </Form>
                      <FormRender param={props} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4} md={12} sm={12}>
                  {/*  Card */}
                  <Card className="border-0 mb-3">
                    {/*  Card body */}
                    <div className="p-3 text-center">
                      {poster ? (
                        <Image width="100%" object-fit="contain" src={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + poster} alt="" />
                      ) : (
                        <Image width="100%" object-fit="contain" src={DefaultImg} alt="" />
                      )}
                    </div>
                    <hr className="m-0" />
                    <div className="p-5">
                      {/*  List */}
                      <ListGroup as="ul" className="mb-0" bsPrefix="list-unstyled">
                        <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                          <span className="text-success me-1">
                            <i className="fe fe-user"></i>
                          </span>
                          <span className="fw-bold text-dark"> 모집인원 - </span>
                          <span>
                            {" "}
                            {programInfo.applicants_num + "명"} / {programInfo.quota == null || programInfo.quota === 0 ? infinite : programInfo.quota + "명"}{" "}
                          </span>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                          <span className="text-success me-1">
                            <i className="fe fe-calendar"></i>
                          </span>
                          <span>
                            <span className="fw-bold text-dark"> 날짜 - </span>
                            <span>
                              {" "}
                              {startdate} ~ {enddate}{" "}
                            </span>
                          </span>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                          <span className="text-success me-1">
                            <i className="fe fe-grid"></i>
                          </span>
                          <span>
                            <span className="fw-bold text-dark"> 카테고리 - </span>
                            <span>{programInfo.category_name}</span>
                          </span>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                    <hr className="m-0" />
                    {programInfo.manager_name != null ? (
                      <div className="p-5">
                        <div className=" fw-bold text-dark mb-2">문의</div>
                        <ListGroup as="ul" className="mb-0" bsPrefix="list-unstyled">
                          <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                            <span className="text-success me-1">
                              <i className="fe fe-user"></i>
                            </span>
                            <span>{programInfo.manager_name}</span>
                          </ListGroup.Item>
                          <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                            <span className="text-success me-1">
                              <i className="fe fe-phone"></i>
                            </span>
                            <span>{programInfo.manager_contact}</span>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    ) : (
                      ""
                    )}
                    <hr className="m-0" />
                    <div className="p-4">
                      <Link to="" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                        프로그램 내용 자세히 보기
                      </Link>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <Footer />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Application;
