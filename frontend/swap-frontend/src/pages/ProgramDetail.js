// import node module libraries
import React, { Fragment, useState, useLayoutEffect } from "react";
import { Col, Row, Container, Card, OverlayTrigger, Tooltip, Button, Badge } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

// import MDI icons
import Icon from "@mdi/react";
import { mdiAccountMultipleOutline } from "@mdi/js";
import { mdiCalendarClock } from "@mdi/js";
import { mdiCalendarRange } from "@mdi/js";
import { mdiEmailMultipleOutline } from "@mdi/js";
import CSEE from "assets/images/CSEE.png";

import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import "../assets/scss/programDetail.scss";

const Program = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [programInfo, setProgramInfo] = useState();
  const [programInfoLoading, setProgramInfoLoading] = useState(false);
  const [daysLeft, setdaysLeft] = useState(true);
  const [quotaLeft, setquotaLeft] = useState(true);
  const [dday, setDday] = useState();
  const [applicantData, setapplicantData] = useState();
  const id = useParams();

  var ID = parseInt(window.sessionStorage.getItem("id"));
  var programID = parseInt(id["id"]);

  const infinite = "무제한";

  useLayoutEffect(() => {
    readProgramInformation();
    readApplicantData(programID, ID);
  }, []);

  const readProgramInformation = async () => {
    setProgramInfoLoading(false);
    var params = new URLSearchParams();

    if (id["id"] != null) {
      params.append("id", id["id"]);
      const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id["id"]);

      Dday(response.data[0].applyend_date);

      response.data[0].start_date = moment(response.data[0].start_date).format("YY-MM-DD HH:mm");
      response.data[0].end_date = moment(response.data[0].end_date).format("YY-MM-DD HH:mm");
      response.data[0].applystart_date = moment(response.data[0].applystart_date).format("YY-MM-DD HH:mm");
      response.data[0].applyend_date = moment(response.data[0].applyend_date).format("YY-MM-DD HH:mm");

      setProgramInfo(response.data[0]);
      console.log(response.data[0]);
      setProgramInfoLoading(true);

      if (response.data[0].applicants_num >= response.data[0].quota && response.data[0].quota != 0) {
        setquotaLeft(false);
      } else {
        setquotaLeft(true);
      }
    }
  };

  const Dday = async (Applyenddate) => {
    var date1 = moment(Applyenddate);
    console.log(date1);
    var date2 = moment();
    console.log(date2);

    var days = date1.diff(date2, "days") + 1;
    console.log(days);

    if (date2 > date1) {
      setdaysLeft(false);
      setDday("마감");
    } else {
      setdaysLeft(true);
      setDday("D-" + days);
    }
  };

  const readApplicantData = async (programID, userID) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/" + programID + "/applicants/" + userID);
    setapplicantData(response.data);
  };

  const checkApply = async () => {
    console.log(daysLeft);
    console.log(quotaLeft);
    if (daysLeft === false) {
      alert("신청기간이 마감되어서 신청 하실 수 없습니다.");
    } else if (quotaLeft == false) {
      alert("신청인원이 꽉 차서 신청 하실 수 없습니다.");
    } else if (applicantData.length > 0) {
      alert("이미 신청된 프로그램입니다.");
    } else {
      navigate("/program/" + programInfo.id.toString() + "/application");
    }
  };

  return (
    <Fragment>
      <NavbarDefault login />
      {programInfoLoading ? (
        <div className="py-lg-3 py-3">
          <Container>
            <div className="d-flex justify-content-start mb-3">
              <div>
                <Link to="/main" className="btn btn-outline-primary">
                  프로그램 목록보기
                </Link>
              </div>
            </div>
            <Row>
              <Col xl={8} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
                <Card className="mb-3 contentCard">
                  {/*  Card body  */}
                  <Card.Body>
                    <Badge bg="warning" className="me-3">
                      {" "}
                      {dday}{" "}
                    </Badge>
                    <div className="d-flex justify-content-between align-items-center">
                      <h1 className="fw-semi-bold mb-2">{programInfo.program_name}</h1>
                      <OverlayTrigger key="top" placement="top" overlay={<Tooltip id="tooltip-top">Add to Bookmarks</Tooltip>}>
                        <Link to="#">
                          <i className="fe fe-bookmark fs-3 text-inherit"></i>
                        </Link>
                      </OverlayTrigger>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <Icon path={mdiCalendarClock} size={0.7} />
                        <span>
                          {" "}
                          신청기간 : {programInfo.applystart_date} ~ {programInfo.applyend_date}
                        </span>
                        <br />
                        <Icon path={mdiCalendarRange} size={0.7} />
                        <span>
                          {" "}
                          진행기간 : {programInfo.start_date} ~ {programInfo.end_date}
                        </span>
                        <br />
                        <Icon path={mdiAccountMultipleOutline} size={0.7} />
                        <span>
                          신청현황 :{" "}
                          <span>
                            {" "}
                            {programInfo.applicants_num + "명"} / {programInfo.quota == null || programInfo.quota === 0 || programInfo.qutoa === "무제한" ? infinite : programInfo.quota + "명"}{" "}
                          </span>
                        </span>
                      </div>

                      <div className="d-flex justify-content-end">
                        <div>
                          {/* <Link to={"/program/" + programInfo.id.toString() + "/application"} className="btn btn-success">
                            신청하기
                          </Link> */}
                          <Button className="btn btn-success" onClick={checkApply}>
                            신청하기
                          </Button>
                        </div>
                      </div>
                    </div>
                    <hr className="" />
                    <div className="fs-4 p-3 ">
                      {programInfo.information.split("\n").map((line) => {
                        return (
                          <span>
                            {line}
                            <br />
                          </span>
                        );
                      })}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={4} lg={12} md={12} sm={12}>
                <Card className="mb-3">
                  <Card.Body>
                    {/* <GKAccordionProgress accordionItems={CourseIndex} /> */}
                    <img src={CSEE} width="100%" object-fit="contain" />
                  </Card.Body>
                </Card>
                {programInfo.manager_name ? (
                  programInfo.manager_contact ? (
                    <Card className="border-0 mb-3 mb-lg-0">
                      {/*  Card body */}
                      <Card.Body>
                        <h3 className="mb-0">문의</h3>
                        <hr className="m-0 mb-2" />
                        <div className="mb-2"> 담당자: {programInfo.manager_name}</div>
                        <Icon path={mdiEmailMultipleOutline} size={0.7} />
                        <span>연락: {programInfo.manager_contact}</span>
                      </Card.Body>
                    </Card>
                  ) : (
                    <Card className="border-0 mb-3 mb-lg-0">
                      {/*  Card body */}
                      <Card.Body>
                        <h3 className="mb-0">문의</h3>
                        <hr className="m-0 m-2" />
                        <div className="mb-2">담당자: {programInfo.manager_name}</div>
                      </Card.Body>
                    </Card>
                  )
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Program;
