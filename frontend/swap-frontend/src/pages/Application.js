// import node module libraries
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { Col, Row, Container, Card, Form, Button, ListGroup, Badge } from "react-bootstrap";
import imgA from "assets/images/application/application-01.png";
import FormRender from "./FormRender";

import "assets/scss/application.scss";

// import layouts
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/Footer";

const Application = () => {
  const CreditDebitCardMethod = () => {
    return (
      <Fragment>
        <FormRender />
        {/*  Form */}
        {/* <Form className="row  " id="application">
          
          <Col sm={12} md={12} className="mb-4 ">
            <Form.Group controlId="nameoncard">
              <Form.Label>신청자 정보</Form.Label>
              <div>문하현 / 21800760 / 전산전자공학부 AI·컴퓨터공학심화</div>
            </Form.Group>
          </Col>
     
          <Col md={6} sm={12} className="mb-4">
            <Form.Group controlId="Phone number">
              <Form.Label>전화번호</Form.Label>
              <Form.Control type="text" placeholder="Phone number (010-0000-0000)" required />
            </Form.Group>
          </Col>

       
          <Col md={6} sm={12} className="mb-4">
            <Form.Group controlId="Phone number">
              <Form.Label>이메일</Form.Label>
              <Form.Control type="text" placeholder="00000@handong.ac.kr" required />
            </Form.Group>
          </Col>

         
          <Col md={12} sm={12} className="mb-4">
            <Form.Group controlId="Phone number">
              <Form.Label>신청동기</Form.Label>
              <Form.Control type="text" placeholder="신청동기를 입력해주세요" required />
            </Form.Group>
          </Col>

         
          <Col md={12} sm={12} className="mb-4">
            <Form.Group controlId="postalcode">
              <Form.Label>개인정보활용동의</Form.Label>
              <div className="agreement">
                법령에 따라 개인을 고유하게 구별하기 위하여 부여된 모든 식별정보(성명, 소속, 휴대폰, 이메일 등)의 수집, 이용에 대한 동의를 받고 있습니다. 신청시 기재되는 모든 개인정보는 사업진행을
                위하여 수집 및 이용될 수 있습니다. 또한 대학평가관련 자료 요청시 교내 관련부서에 자료가 제공될 수 있으며, 철저하게 관리될 예정입니다. 수집된 개인정보는 5년 경과(대학 평가 관련 자료
                요청 기간) 후 즉시 파기됩니다. 위와 관련하여 본인의 개인고유식별정보 수집, 이용에 관한 내용을 숙지하였고 이에 동의한다면 해당란에 체크해 주십시오.
              </div>
            </Form.Group>
          </Col>
          
          <Col md={12} sm={12} className="mb-5">
           
            <Form.Group controlId="customCheck1">
              <Form.Check type="checkbox" label="개인정보 활용에 동의합니다." />
            </Form.Group>
          </Col>
          <Col md={12} sm={12}>
          
            <div className="d-flex justify-content-end">
              <Link to="../../program">
                <Button className="cancel-btn" variant="secondary">
                  신청취소
                </Button>
              </Link>
              <Link to="../../mypage">
                <Button variant="primary">신청하기</Button>
              </Link>
            </div>
          </Col>
        </Form> */}
      </Fragment>
    );
  };
  return (
    <Fragment>
      <NavbarDefault />
      {/* Page header */}
      <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary ">
        <Container>
          <Row className="align-items-center ">
            <Col xl={7} lg={7} md={12} sm={12}>
              <div>
                <h1 className="text-white display-4 fw-semi-bold">온라인 입사지원 및 면접 컨설팅 신청서</h1>
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

      {/*  Content */}
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
                <Card.Body>{CreditDebitCardMethod()}</Card.Body>
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
              {/*  Card */}
              <Card className="border-0 mb-3 mb-lg-0">
                {/*  Card body */}
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
    </Fragment>
  );
};

export default Application;
