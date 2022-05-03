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
import DefaultImg from "assets/images/Default_img.png";

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
  const [toggleBookmark, setToggleBookmark] = useState(false);
  const [likeData, setLikeData] = useState();
  const [userInfo, setUserInfo] = useState();

  const id = useParams();

  var ID = parseInt(window.sessionStorage.getItem("id"));
  var programID = parseInt(id["id"]);

  const infinite = "무제한";

  useLayoutEffect(() => {
    readProgramInformation();
    readApplicantData(programID, ID);
    readLike(ID, programID);
    readApplicantInformation(ID);
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

  const readApplicantData = async (programID, userID) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/" + programID + "/applicants/" + userID);
    setapplicantData(response.data);
  };

  const checkApply = async () => {
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

  const readLike = async (userID, programID) => {
    var params = new URLSearchParams();
    params.append("user_id", userID);
    params.append("program_id", programID);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "like/read", params);
    console.log("응답: " + response.data);
    setLikeData(response.data);

    if (response.data.length > 0) {
      setToggleBookmark(true);
    }
  };

  const deleteLike = async (userID, programID) => {
    setToggleBookmark(false);
    var params = new URLSearchParams();
    params.append("user_id", userID);
    params.append("program_id", programID);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "like/delete", params);
  };

  const addLike = async (userID, programID) => {
    setToggleBookmark(true);
    var params = new URLSearchParams();
    params.append("user_id", userID);
    params.append("program_id", programID);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "like/add", params);
  };

  const readApplicantInformation = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    setUserInfo(response.data[0]);
  };

  const onToggle = (e) => {
    if (userInfo.status === 0) {
      alert("관리자는 찜 기능을 사용하실 수 없습니다. ");
    } else {
      if (toggleBookmark) {
        deleteLike(ID, programID);
      } else {
        addLike(ID, programID);
      }
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
                      <OverlayTrigger key="top" placement="top" overlay={<Tooltip id="tooltip-top">프로그램 찜 하기</Tooltip>}>
                        <Button onClick={onToggle} type="button" className="p-0 bg-transparent border-0 text-dark fs-3 mb-3 text-inherit">
                          {toggleBookmark ? <i class="fas fa-bookmark"></i> : <i class="far fa-bookmark"></i>}
                        </Button>
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
                    <img src={DefaultImg} width="100%" object-fit="contain" />
                    {/* <img className="profile-img-content" object-fit="contain" width="100%" src={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/2022/5/test_poster.png"} alt="profile_image" /> */}
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
