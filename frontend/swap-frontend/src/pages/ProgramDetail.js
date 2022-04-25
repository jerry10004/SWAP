// import node module libraries
import React, { Fragment, useState, useLayoutEffect } from "react";
import { Col, Row, Container, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// import MDI icons
import Icon from "@mdi/react";
import { mdiAccountMultipleOutline } from "@mdi/js";
import { mdiCalendarBlank } from "@mdi/js";
import CSEE from "assets/images/CSEE.png";

import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";

const Program = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [programInfo, setProgramInfo] = useState();
  const [programInfoLoading, setProgramInfoLoading] = useState(false);

  const id = useParams();

  useLayoutEffect(() => {
    readProgramInformation();
  }, []);

  const readProgramInformation = async () => {
    setProgramInfoLoading(false);
    var params = new URLSearchParams();

    if (id["id"] != null) {
      params.append("id", id["id"]);
      const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id["id"]);
      setProgramInfo(response.data[0]);
      setProgramInfoLoading(true);
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
                <Card className="mb-3">
                  {/*  Card body  */}
                  <Card.Body>
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
                        <Icon path={mdiCalendarBlank} size={0.7} />
                        <span>신청기간 : 2022-04-01 ~ 2022-05-01</span>
                        <br />
                        <Icon path={mdiAccountMultipleOutline} size={0.7} />
                        <span>신청현황 : 5명 / 200명 </span>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div>
                          <Link to="/program/application" className="btn btn-success">
                            신청하기
                          </Link>
                        </div>
                      </div>
                    </div>
                    <hr className="" />
                    <div className="fs-4 p-3 mb-6">
                      1. 강 사 : 김동현 CTO(뉴로핏) <br />
                      <br />
                      2. 강의 주제 : Neuroimaging for Healthy Aging: Diagnosis and Prognosis using AI <br />
                      <br />
                      3. 일 시 : 2022년 4월 13일(수) 오후 1시~2시15분 <br />
                      <br />
                      4. 장 소 : 온라인 Zoom https://handong.zoom.us/j/81117381230?pwd=RURweXY2S2RYeXk3aEhqUU84TUFNZz09
                      <br />
                      회의 ID: 811 1738 1230 암호: 123123
                      <br />
                      <br />
                      5. 소감문 제출 방법 : 링크 접속 후 제출 (https://forms.gle/8XaCQMV1Cpn3WZRV7) <br />* 공프기 및 캡스톤 수강생 외 학생들은 강의 시청 후 반드시 소감문을 제출하셔야 합니다. <br />
                      (4. 15(금) 밤12시까지)
                      <br />
                      <br />☎ 문의 : SW중심대학 지원사업단 김선영 <br />
                      (T.260-1492, E-Mail : pooh8276@handong.edu)
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
                <Card className="border-0 mb-3 mb-lg-0">
                  {/*  Card body */}
                  <Card.Body>
                    <h3 className="mb-0">SW중심대학 지원사업단</h3>
                    <div className="mb-2">김선영</div>
                    <hr className="m-0 mb-2" />
                    <div>T.260-1492</div>
                    <div>E-Mail : pooh8276@handong.edu</div>
                  </Card.Body>
                </Card>
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
