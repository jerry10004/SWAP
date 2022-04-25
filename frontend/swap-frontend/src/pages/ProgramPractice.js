// import node module libraries
import React, { Fragment } from "react";
import { Col, Row, Container, Image, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import CSEE from "assets/images/CSEE.png";

const ProgramPractice = () => {
  return (
    <Fragment>
      <NavbarDefault login />
      <div className="py-4 py-lg-8 pb-14 bg-white ">
        <Container>
          <Fragment>
            <Row className="justify-content-center">
              <Col xl={8} lg={8} md={12} sm={12} className="mb-2">
                <div className="text-center mb-1">
                  <Link to="/main" className="fs-5 fw-semi-bold d-block mb-4 text-primary">
                    프로그램 목록 보기
                  </Link>
                  <h1 className="display-3 fw-bold">CSEE 특강</h1>
                  <span className=" d-inline-block">readinglength min read</span>
                </div>
                {/* Author */}
                {/* {authorAndSharing(item)} */}
              </Col>
            </Row>
            <hr className="mb-5" />
            <Row className="justify-content-center">
              <Col className="mb-2">
                {/* Blog Content */}
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: "content",
                  }}
                ></div> */}
                <Card className="mb-3 bg-light">
                  <Row>
                    <Col xl={5} lg={12} md={12} sm={12}>
                      <Card.Body>
                        {/* <GKAccordionProgress accordionItems={CourseIndex} /> */}
                        <img src={CSEE} width="100%" object-fit="contain" />
                      </Card.Body>
                    </Col>
                    <Col xl={7} lg={12} md={12} sm={12}>
                      <div className="mt-12 fs-4 pe-4">
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
                    </Col>
                  </Row>
                </Card>
                <hr className="mt-8 mb-5" />
                <div className="d-flex justify-content-center mb-3">
                  <div>
                    <Link to="/main" className="btn btn-outline-primary me-1">
                      프로그램 목록보기
                    </Link>
                  </div>
                  <div>
                    <Link to="/program/application" className="btn btn-primary ms-1">
                      신청하기
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Fragment>
        </Container>
      </div>
    </Fragment>
  );
};

export default ProgramPractice;
