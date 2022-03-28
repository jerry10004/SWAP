// import node module libraries
import { Col, Card, Form, Button } from "react-bootstrap";
import { FormSelect } from "components/elements/form-select/FormSelect";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CoursesMedia = (props) => {
  const { next, previous } = props;
  const templateOptions = [
    { value: "대회", label: "대회" },
    { value: "봉사", label: "봉사" },
    { value: "캠프", label: "캠프" },
    { value: "동아리", label: "동아리" },
    { value: "행사", label: "행사" },
    { value: "기타", label: "기타" },
  ];

  const ApplicationForm = () => {
    return (
      <Fragment>
        {/*  Form */}
        <Form className="row  " id="application">
          {/*  Name on card */}
          <Col sm={12} md={12} className="mb-4 ">
            <Form.Group controlId="nameoncard">
              <Form.Label>신청자 정보</Form.Label>
              <div>로그인한 사용자의 이름 / 학번 / 학부·전공</div>
            </Form.Group>
          </Col>
          {/*  Phone number */}
          <Col md={6} sm={12} className="mb-4">
            <Form.Group controlId="Phone number">
              <Form.Label>전화번호</Form.Label>
              <Form.Control type="text" placeholder="Phone number (010-0000-0000)" required />
            </Form.Group>
          </Col>

          {/*  이메일 */}
          <Col md={6} sm={12} className="mb-4">
            <Form.Group controlId="Phone number">
              <Form.Label>이메일</Form.Label>
              <Form.Control type="text" placeholder="00000@handong.ac.kr" required />
            </Form.Group>
          </Col>

          {/* 신청동기 */}
          <Col md={12} sm={12} className="mb-4">
            <Form.Group controlId="Phone number">
              <Form.Label>신청동기</Form.Label>
              <Form.Control type="text" placeholder="신청동기를 입력해주세요" required />
            </Form.Group>
          </Col>

          {/*  개인정보활용동의 */}
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
          {/*  CheckBox */}
          <Col md={12} sm={12} className="mb-5">
            {/*  Checkbox  */}
            <Form.Group controlId="customCheck1">
              <Form.Check type="checkbox" label="개인정보 활용에 동의합니다." />
            </Form.Group>
          </Col>
        </Form>
      </Fragment>
    );
  };

  return (
    <Form>
      {/* Category */}
      <div className="d-flex justify-content-end">
        <Form.Group className="mb-3 w-26 ">
          <FormSelect options={templateOptions} id="application-template" name="application-template" placeholder="신청서 템플릿 선택" />
        </Form.Group>
      </div>
      {/* Card */}
      <Card className="mb-3  border-0">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">프로그램 신청서</h4>
        </Card.Header>
        {/* Card body */}
        <Card.Body>
          <ApplicationForm />
        </Card.Body>
      </Card>

      {/* Button */}
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={previous}>
          이전
        </Button>
        <Button variant="danger" onClick={next}>
          제출
        </Button>
      </div>
    </Form>
  );
};
export default CoursesMedia;
