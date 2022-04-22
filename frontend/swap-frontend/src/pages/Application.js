// import node module libraries
import React, { Fragment, useState, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import { Col, Row, Container, Card, Form, Button, ListGroup, Badge } from "react-bootstrap";
import imgA from "assets/images/application/application-01.png";
import FormRender from "./FormRender";

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

  var ID = parseInt(window.sessionStorage.getItem("id"));
  var programID = parseInt(id["id"]);
  const props = { userid: ID, programid: programID };

  useLayoutEffect(() => {
    readApplicantInformation(ID);
    readProgramInformation();
  }, []);

  const readApplicantInformation = async (id) => {
    // console.log("111111 ", id);
    setApplicantInformationLoading(false);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    setApplicantInformation(response.data);
    setApplicantInformationLoading(true);
    // console.log("222222 ", applicantInformation);
  };

  const readProgramInformation = async () => {
    setProgramInfoLoading(false);
    var params = new URLSearchParams();

    if (id["id"] != null) {
      params.append("id", id["id"]);
      const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id["id"]);
      // console.log("333333 ", response.data[0]);
      setProgramInfo(response.data[0]);
      setProgramInfoLoading(true);
    }
  };

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
                    <p className="text-white mb-6 lead">취업준비생을 위한 1단계 서류 작성부터 최종면접까지 대비</p>
                    <div className="d-flex align-items-center">
                      <span className="text-white">
                        <i className="fe fe-user text-white-50"></i> 5명 / 무제한{" "}
                      </span>
                      <span className="text-white ms-3">
                        <i className="fe fe-user text-white-50"></i> 2022.03.01(화) ~ 2023.01.31(화)
                      </span>
                      <span className="text-white ms-4 d-none d-md-block">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="8" width="2" height="6" rx="1" fill="#DBD8E9"></rect>
                          <rect x="7" y="5" width="2" height="9" rx="1" fill="#DBD8E9"></rect>
                          <rect x="11" y="2" width="2" height="12" rx="1" fill="#DBD8E9"></rect>
                        </svg>{" "}
                        <span className="align-middle">온라인 ZOOM</span>
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
                            <div>
                              {applicantInformation[0].name}/ {applicantInformation[0].student_id} / {applicantInformation[0].department}/{applicantInformation[0].major1}
                            </div>
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
                    <div className="p-5 text-center">
                      <Badge bg="warning">개인 - 2시간/1회</Badge>
                      <img src={imgA} width="100%" object-fit="contain" />
                    </div>
                    <hr className="m-0" />
                    <div className="p-5">
                      {/*  List */}
                      <ListGroup as="ul" className="mb-0" bsPrefix="list-unstyled">
                        <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                          <span className="text-success me-1">
                            <i className="far fa-check-circle"></i>
                          </span>
                          <span className="fw-bold text-dark">모집대상 - </span>
                          <span>재학생, 수료생/대학원생</span>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                          <span className="text-success me-1">
                            <i className="far fa-check-circle"></i>
                          </span>
                          <span>
                            <span className="fw-bold text-dark">학년/성별 - </span>
                            <span>전체 학년/전체 성별</span>
                          </span>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                          <span className="text-success me-1">
                            <i className="far fa-check-circle"></i>
                          </span>
                          <span>
                            <span className="fw-bold text-dark">학과 - </span>
                            <span>전체 학과</span>
                          </span>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                    <hr className="m-0" />
                    <div className="p-4">
                      <Link to="#" className="btn btn-outline-primary">
                        프로그램 내용 자세히 보기
                      </Link>
                    </div>
                  </Card>
                  <Card className="border-0 mb-3 mb-lg-0">
                    <Card.Body>
                      <h3 className="mb-0">경력개발팀</h3>
                      <div className="mb-2">진로 및 취업</div>
                      <hr className="m-0 mb-2" />
                      <div>kny@handong.edu</div>
                      <div>054-260-1892</div>
                    </Card.Body>
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
