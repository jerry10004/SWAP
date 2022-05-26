// import node module libraries
import React, { Fragment, useState, useLayoutEffect } from "react";
import { Col, Row, Container, Card, OverlayTrigger, Tooltip, Button, Badge, Image } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import styled from 'styled-components'
import PropTypes from 'prop-types'


// import MDI icons
import Icon from "@mdi/react";
import { mdiAccountMultipleOutline } from "@mdi/js";
import { mdiCalendarClock } from "@mdi/js";
import { mdiCalendarRange } from "@mdi/js";
import { mdiEmailMultipleOutline } from "@mdi/js";
import DefaultImg from "assets/images/Default_img.png";

import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import "../assets/scss/programDetail.scss";
import { Windows } from "react-bootstrap-icons";

function Modal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e)
    }
  }

  const close = (e) => {
    if (onClose) {
      onClose(e)
    }
  }
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          {closable && <div className="modal-close" onClick={close} />}
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  )
}

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 520px;
  max-width: 520px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding:10px;
`

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
  const [filePath, setFilePath] = useState([]);
  const [poster, setPoster] = useState();

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
      var filePathList = [];

      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].file_type === 0) {
          filePathList.push(response.data[i].file_name);
        } else if (response.data[i].file_type === 1) {
          setPoster(response.data[i].file_name);
        }
      }

      setFilePath(filePathList);
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
    if (window.sessionStorage.getItem("id") === null) {
      alert("로그인이 필요한 항목입니다. 로그인을 진행해 주세요.");
    } else {
      if (daysLeft === false) {
        alert("신청기간이 마감되어서 신청 하실 수 없습니다.");
      } else if (quotaLeft == false) {
        alert("신청인원이 꽉 차서 신청 하실 수 없습니다.");
      } else if (applicantData.length > 0) {
        alert("이미 신청된 프로그램입니다.");
      } else {
        navigate("/swap/program/" + programInfo.id.toString() + "/application");
      }
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


  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }


  return (
    <Fragment>
      <NavbarDefault login />
      {programInfoLoading ? (
        <div className="py-lg-3 py-3">
          <Container>
            <div className="d-flex justify-content-start mb-3">
              <div>
                <Link to="/swap/main" className="btn btn-outline-primary">
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
                        <Button onClick={onToggle} type="button" className="p-0 bg-transparent border-0 text-primary fs-3 mb-3 ">
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

                      {filePath[0] ? (
                        <>
                          <br />
                          <br />
                          <h4>첨부파일</h4>
                          {filePath.map((item, i) => {
                            var name = item.split("/");

                            return (
                              <>
                                <a href={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + item} download target="_blank">
                                  {name[2]}
                                </a>
                                <br />
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={4} lg={12} md={12} sm={12}>
                <Card className="mb-3">
                  <Card.Body>
                    {poster ? (
                      <>
                      <Image width="100%" object-fit="contain" src={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + poster} alt="" onClick={() => {openModal()}}/>
                      {
                        modalVisible && <Modal
                          visible={modalVisible}
                          closable={true}
                          maskClosable={true}
                          onClose={closeModal}><Image width="100%" object-fit="contain" src={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + poster} alt=""/></Modal>
                      }
                      </>
                    ) : (
                      <Image width="100%" object-fit="contain" src={DefaultImg} alt="" />
                    )}
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
