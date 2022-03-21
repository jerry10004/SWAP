// import node module libraries
import React, { Fragment, useState } from "react";
import { Col, Row, Container, Card, Form, Button, ListGroup, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

// import custom components
import { FormSelect } from "components/elements/form-select/FormSelect";
import PageHeading from "components/marketing/common/page-headings/PageHeading";

import "assets/scss/survey.scss";

const Survey = () => {
  const statelist = [
    { value: "1", label: "글로벌리더십학부" },
    { value: "2", label: "경영경제학부" },
    { value: "3", label: "공간환경시스템공학부" },
  ];

  return (
    <Fragment>
      {/* Page header */}
      <PageHeading pagetitle="설문조사" />

      {/*  Content */}
      <div className="py-6">
        <Container>
          <Row>
            <Col md={12} sm={12}>
              {/*  Card */}
              <Card className="mb-4">
                {/*  Card header */}
                <Card.Header>
                  <h3 className="mb-0">2022 상반기 자기소개서 분석 특강 설문조사 </h3>
                </Card.Header>
                {/*  Card body */}
                <Card.Body>
                  {/*  Form */}
                  <Form className="row">
                    {/* 성별 선택 */}
                    <Col md={12} sm={12} className="mb-5">
                      <Form.Group controlId="fname">
                        <Form.Label className="formLabel">성별을 선택해 주세요.</Form.Label>
                        <Form>
                          <Form.Check inline label="남자" name="group1" type="radio" id={`inline-radio-1`} />
                          <Form.Check inline label="여자" name="group1" type="radio" id={`inline-radio-2`} />
                        </Form>
                      </Form.Group>
                    </Col>
                    {/* 학기 수 입력 */}
                    <Col md={6} sm={12} className="mb-5">
                      <Form.Group controlId="phone">
                        <Form.Label className="formLabel">학기 수를 입력해 주세요.</Form.Label>
                        <Form.Control type="text" placeholder="(ex. 6학기-> 6, 졸업자-> 졸업, 졸업유예자 -> 졸업유예)" required />
                      </Form.Group>
                    </Col>

                    {/*  학부 선택 */}
                    <Col md={6} sm={12} className="mb-5">
                      <Form.Group controlId="formState">
                        <Form.Label className="formLabel">학부를 선택해주세요.</Form.Label>
                        <FormSelect options={statelist} />
                      </Form.Group>
                    </Col>

                    {/*  강사  */}
                    <Col md={12} sm={12} className="mb-5">
                      <Form.Group controlId="address">
                        <Form.Label className="formLabel">강사는 교육 내용에 대한 전문 지식을 보유하고 있다.</Form.Label>
                        <Form>
                          <Form.Check inline label="매우 불만족" name="group1" type="radio" id={`inline-radio-1`} />
                          <Form.Check inline label="불만족" name="group1" type="radio" id={`inline-radio-2`} />
                          <Form.Check inline label="보통" name="group1" type="radio" id={`inline-radio-3`} />
                          <Form.Check inline label="만족" name="group1" type="radio" id={`inline-radio-4`} />
                          <Form.Check inline label="매우 만족" name="group1" type="radio" id={`inline-radio-5`} />
                        </Form>
                      </Form.Group>
                    </Col>

                    {/*  교육내용  */}
                    <Col md={12} sm={12} className="mb-5">
                      <Form.Group controlId="address">
                        <Form.Label className="formLabel">교육 내용은 흥미로웠다.</Form.Label>
                        <Form>
                          <Form.Check inline label="매우 불만족" name="group1" type="radio" id={`inline-radio-1`} />
                          <Form.Check inline label="불만족" name="group1" type="radio" id={`inline-radio-2`} />
                          <Form.Check inline label="보통" name="group1" type="radio" id={`inline-radio-3`} />
                          <Form.Check inline label="만족" name="group1" type="radio" id={`inline-radio-4`} />
                          <Form.Check inline label="매우 만족" name="group1" type="radio" id={`inline-radio-5`} />
                        </Form>
                      </Form.Group>
                    </Col>
                    {/*  흥미롭지 않은 이유  */}
                    <Col md={12} sm={12} className="mb-5">
                      <Form.Group controlId="address2">
                        <Form.Label className="formLabel">흥미롭지 않았다면 어떤 부분이 흥미롭지 않았나요?</Form.Label>
                        <Form.Control as="textarea" required />
                      </Form.Group>
                    </Col>

                    {/*  이해도 */}
                    <Col md={12} sm={12} className="mb-5">
                      <Form.Group controlId="address">
                        <Form.Label className="formLabel">교육 내용은 이해하기 쉬웠다.</Form.Label>
                        <Form>
                          <Form.Check inline label="매우 불만족" name="group1" type="radio" id={`inline-radio-1`} />
                          <Form.Check inline label="불만족" name="group1" type="radio" id={`inline-radio-2`} />
                          <Form.Check inline label="보통" name="group1" type="radio" id={`inline-radio-3`} />
                          <Form.Check inline label="만족" name="group1" type="radio" id={`inline-radio-4`} />
                          <Form.Check inline label="매우 만족" name="group1" type="radio" id={`inline-radio-5`} />
                        </Form>
                      </Form.Group>
                    </Col>
                    {/* 어려웠던 부분 */}
                    <Col md={12} sm={12} className="mb-5">
                      <Form.Group controlId="address2">
                        <Form.Label className="formLabel">어려웠다면 어떤 부분이 어려웠나요?</Form.Label>
                        <Form.Control as="textarea" required />
                      </Form.Group>
                    </Col>

                    {/* 정보 습득 */}
                    <Col md={12} sm={12} className="mb-5">
                      <Form.Group controlId="address">
                        <Form.Label className="formLabel">교육을 통해 기존에 알지 못했던 정보를 알게 되었다.</Form.Label>
                        <Form>
                          <Form.Check inline label="매우 불만족" name="group1" type="radio" id={`inline-radio-1`} />
                          <Form.Check inline label="불만족" name="group1" type="radio" id={`inline-radio-2`} />
                          <Form.Check inline label="보통" name="group1" type="radio" id={`inline-radio-3`} />
                          <Form.Check inline label="만족" name="group1" type="radio" id={`inline-radio-4`} />
                          <Form.Check inline label="매우 만족" name="group1" type="radio" id={`inline-radio-5`} />
                        </Form>
                      </Form.Group>
                    </Col>

                    {/* 취업, 진로 준비 도움 */}
                    <Col md={12} sm={12} className="mb-5">
                      <Form.Group controlId="address">
                        <Form.Label className="formLabel">교육 내용이 나의 취업이나 진로 준비에 도움이 될 것 같다.</Form.Label>
                        <Form>
                          <Form.Check inline label="매우 불만족" name="group1" type="radio" id={`inline-radio-1`} />
                          <Form.Check inline label="불만족" name="group1" type="radio" id={`inline-radio-2`} />
                          <Form.Check inline label="보통" name="group1" type="radio" id={`inline-radio-3`} />
                          <Form.Check inline label="만족" name="group1" type="radio" id={`inline-radio-4`} />
                          <Form.Check inline label="매우 만족" name="group1" type="radio" id={`inline-radio-5`} />
                        </Form>
                      </Form.Group>
                    </Col>

                    {/* 추후 */}
                    <Col md={12} sm={12} className="mb-5">
                      <Form.Group controlId="address">
                        <Form.Label className="formLabel">추후에 같은 교육이 진행 된다면 친구 혹은 후배들에게 추천하겠다.</Form.Label>
                        <Form>
                          <Form.Check inline label="매우 불만족" name="group1" type="radio" id={`inline-radio-1`} />
                          <Form.Check inline label="불만족" name="group1" type="radio" id={`inline-radio-2`} />
                          <Form.Check inline label="보통" name="group1" type="radio" id={`inline-radio-3`} />
                          <Form.Check inline label="만족" name="group1" type="radio" id={`inline-radio-4`} />
                          <Form.Check inline label="매우 만족" name="group1" type="radio" id={`inline-radio-5`} />
                        </Form>
                      </Form.Group>
                    </Col>

                    {/* 느낀점, 요구사항 */}
                    <Col md={12} sm={12} className="mb-5">
                      <Form.Group controlId="address2">
                        <Form.Label className="formLabel">교육을 듣고 느낀 점이나 요구하고 싶은 사항을 자유롭게 적어주세요.</Form.Label>
                        <Form.Control as="textarea" required />
                      </Form.Group>
                    </Col>
                  </Form>

                  {/* 추가 */}
                  <Col md={12} sm={12} className="mb-5">
                    <Form.Group controlId="address2">
                      <Form.Label className="formLabel">해당 강의 외에 추가로 개설하였으면 하는 프로그램이나 직무교육과정이 있다면 기재해주세요.</Form.Label>
                      <Form.Control as="textarea" required />
                    </Form.Group>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} sm={12}>
              {/*  Button */}
              <div className="d-flex justify-content-center">
                <Button className="cancel-btn" variant="secondary">
                  뒤로가기
                </Button>
                <Button variant="primary">제출하기</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Survey;
