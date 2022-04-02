// import node module libraries
import { Col, Card, Form, Button, Container, Row } from "react-bootstrap";
import React, { Fragment, useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
// import custom components
import GKAccordionApplicant from "components/marketing/common/accordions/GKAccordionApplicant";
import { FormSelect } from "components/elements/form-select/FormSelect";
import axios from "axios";

const ApplicationFormView = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [applicantInformation, setApplicantInformation] = useState(null);
  const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);
  const edit = () => {
    setIsEdit(true);
  };

  const save = () => {
    setIsEdit(false);
  };

  useLayoutEffect(() => {
    console.log(props.param2.id);
    readApplicantInformation(props.param2.id);
  }, []);

  const readApplicantInformation = async (id) => {
    setApplicantInformationLoading(false);
    console.log("id is", id);
    const response = await axios.get("http://localhost:8080/swap/applicant/applicants/" + id);
    setApplicantInformation(response.data);
    console.log("~이거를보자~~~~`");
    console.log(response.data);
    setApplicantInformationLoading(true);
  };

  const FormOptions = [
    { value: "대회", label: "대회" },
    { value: "봉사", label: "봉사" },
    { value: "캠프", label: "캠프" },
    { value: "동아리", label: "동아리" },
    { value: "행사", label: "행사" },
    { value: "기타", label: "기타" },
  ];

  return (
    <Container>
      <Row>
        <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
          <Card>
            <Card.Header>
              <h4>신청서 보기</h4>
            </Card.Header>
            <Card.Body>
              {/*  Form */}
              <Form className="row  " id="application">
                {/*  Name */}
                <Col md={6} sm={12} className="mb-4">
                  <Form.Group controlId="Name">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" placeholder="이름을 입력해 주세요" required />
                  </Form.Group>
                </Col>
                {/*  Student Id */}
                <Col md={6} sm={12} className="mb-4">
                  <Form.Group controlId="StudentID">
                    <Form.Label>학번</Form.Label>
                    <Form.Control type="text" placeholder="학번을 입력해 주세요" required />
                  </Form.Group>
                </Col>
                {/*  Department */}
                <Col md={6} sm={12} className="mb-4">
                  <Form.Group controlId="StudentID">
                    <Form.Label>학부</Form.Label>
                    <Form.Control type="text" placeholder="학부를 입력해 주세요" required />
                  </Form.Group>
                </Col>
                {/*  Major1 */}
                <Col md={6} sm={12} className="mb-4">
                  <Form.Group controlId="StudentID">
                    <Form.Label>전공</Form.Label>
                    <Form.Control type="text" placeholder="전공을 입력해 주세요" required />
                  </Form.Group>
                </Col>
                {/*  Phone number */}
                <Col md={6} sm={12} className="mb-4">
                  <Form.Group controlId="Phone number">
                    <Form.Label>전화번호</Form.Label>
                    <Form.Control type="text" placeholder="Phone number (010-1234-5678)" required />
                  </Form.Group>
                </Col>

                {/*  이메일 */}
                <Col md={6} sm={12} className="mb-4">
                  <Form.Group controlId="Email">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type="text" placeholder="Handong123@handong.ac.kr" required />
                  </Form.Group>
                </Col>

                {/* 신청동기 */}
                <Col md={12} sm={12} className="mb-4">
                  <Form.Group controlId="ApplyingReason">
                    <Form.Label>신청동기</Form.Label>
                    <Form.Control type="text" placeholder="신청동기를 입력해주세요" required />
                  </Form.Group>
                </Col>

                {/*  개인정보활용동의 */}
                <Col md={12} sm={12} className="mb-4">
                  <Form.Group controlId="postalcode">
                    <Form.Label>개인정보활용동의</Form.Label>
                    <div className="agreement">
                      법령에 따라 개인을 고유하게 구별하기 위하여 부여된 모든 식별정보(성명, 소속, 휴대폰, 이메일 등)의 수집, 이용에 대한 동의를 받고 있습니다. 신청시 기재되는 모든 개인정보는
                      사업진행을 위하여 수집 및 이용될 수 있습니다. 또한 대학평가관련 자료 요청시 교내 관련부서에 자료가 제공될 수 있으며, 철저하게 관리될 예정입니다. 수집된 개인정보는 5년 경과(대학
                      평가 관련 자료 요청 기간) 후 즉시 파기됩니다. 위와 관련하여 본인의 개인고유식별정보 수집, 이용에 관한 내용을 숙지하였고 이에 동의한다면 해당란에 체크해 주십시오.
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
            </Card.Body>
            {isEdit === false ? (
              <div className="d-flex justify-content-end me-4">
                <Button variant="primary" onClick={edit}>
                  수정
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-end me-4">
                <Button variant="primary" onClick={save}>
                  완료
                </Button>
              </div>
            )}
            ;
          </Card>
        </Col>
        <Col xl={3} lg={12} md={12} sm={12}>
          <Card xxl={2} lg={2} md={6} xs={12} className="my-3">
            <Form.Control as={FormSelect} placeholder="신청서 템플릿" options={FormOptions} />
          </Card>
          {applicantInformationLoading === true ? (
            <>
              <Card>
                <GKAccordionApplicant accordionItems={applicantInformation} />
              </Card>
            </>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default ApplicationFormView;
