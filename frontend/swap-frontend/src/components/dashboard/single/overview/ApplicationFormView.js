// import node module libraries
import { Col, Card, Form, Button, Container, Row, Accordion, useAccordionButton, AccordionContext, ListGroup } from "react-bootstrap";
import React, { Fragment, useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import custom components
import axios from "axios";
import $ from "jquery";
import "pages/formBuilder.scss";

// import simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { setDefaultLocale } from "react-datepicker";

window.jQuery = $;
window.$ = $;
require("formBuilder/dist/form-render.min.js");

const ApplicationFormView = (props) => {
  const [applicantInformation, setApplicantInformation] = useState(null);
  const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [applicationName, setApplicationName] = useState();
  const [originalFormData, setoriginalFormData] = useState([]);
  const [studentFormData, setstudentFormData] = useState([]);
  const [applicantClick, setApplicantClick] = useState(false);
  const [applicationNameLoading, setApplicationNameLoading] = useState(false);

  useLayoutEffect(() => {
    //console.log(props.param2);
    readApplicantInformation(props.param2.id);
    readFormData(props.param2.id);
  }, []);

  useEffect(() => {
    componentDidMount();
  }, [originalFormData, userInfo]);

  const readApplicantInformation = async (id) => {
    setApplicantInformationLoading(false);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + id);
    setApplicantInformation(response.data);
    setApplicantInformationLoading(true);
  };

  const readFormData = async (id) => {
    setApplicationNameLoading(false);
    console.log("id", id);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "application/readApplicationForm/" + id);
    console.log(response.data[0].content);
    var json_total = response.data[0].content;
    console.log("!!!!!!!!! ", response.data[0].name);
    setApplicationName(response.data[0].name);
    setApplicationNameLoading(true);
    setoriginalFormData(json_total);
    console.log(originalFormData);
  };

  const getUserInfo = (user) => {
    setUserInfo(user);
    console.log(user.id);
    console.log(user.application_form);
    setstudentFormData(user.application_form);

    console.log("클릭된 학생의 정보:", user);
    setApplicantClick(true);
  };

  const componentDidMount = async () => {
    const fbRender = document.getElementById("fb-render");
    const formData = userInfo != null ? studentFormData : originalFormData;

    $(fbRender).formRender({ formData });
  };

  const ContextAwareToggle = ({ eventKey, callback }) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <Fragment>
        <Link
          to="#"
          onClick={decoratedOnClick}
          aria-expanded={isCurrentEventKey}
          className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
          data-bs-toggle="collapse"
          aria-controls="courseTwo"
        >
          <div className="me-auto">신청한 학생들</div>
          <span className="chevron-arrow ms-4">
            <i className="fe fe-chevron-down fs-4"></i>
          </span>
        </Link>
      </Fragment>
    );
  };

  return (
    <Container>
      <Row>
        {userInfo ? (
          <>
            <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
              <Card>
                {applicationNameLoading ? (
                  <Card.Header>
                    <h4>{applicationName}</h4>
                  </Card.Header>
                ) : (
                  ""
                )}

                <Card.Body>
                  {/*  Form */}
                  <Form className="row  " id="application">
                    {/*  Name */}
                    <Col md={6} sm={12} className="mb-4">
                      <Form.Group controlId="Name">
                        <Form.Label>이름</Form.Label>
                        <Form.Control type="text" placeholder="이름을 입력해 주세요" value={userInfo.name} readOnly />
                      </Form.Group>
                    </Col>
                    {/*  Student Id */}
                    <Col md={6} sm={12} className="mb-4">
                      <Form.Group controlId="StudentID">
                        <Form.Label>학번</Form.Label>
                        <Form.Control type="text" placeholder="학번을 입력해 주세요" value={userInfo.student_id} readOnly />
                      </Form.Group>
                    </Col>
                    {/*  Department */}
                    <Col md={6} sm={12} className="mb-4">
                      <Form.Group controlId="StudentID">
                        <Form.Label>학부</Form.Label>
                        <Form.Control type="text" placeholder="학부를 입력해 주세요" value={userInfo.department} readOnly />
                      </Form.Group>
                    </Col>
                    {/*  Major1 */}
                    <Col md={6} sm={12} className="mb-4">
                      <Form.Group controlId="StudentID">
                        <Form.Label>전공</Form.Label>
                        <Form.Control type="text" placeholder="전공을 입력해 주세요" value={userInfo.major1} readOnly />
                      </Form.Group>
                    </Col>
                    {/*  Phone number */}
                    <Col md={6} sm={12} className="mb-4">
                      <Form.Group controlId="Phone number">
                        <Form.Label>전화번호</Form.Label>
                        <Form.Control type="text" placeholder="Phone number (010-1234-5678)" value={userInfo.phone} readOnly />
                      </Form.Group>
                    </Col>

                    {/*  이메일 */}
                    <Col md={6} sm={12} className="mb-4">
                      <Form.Group controlId="Email">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control type="text" placeholder="Handong123@handong.ac.kr" value={userInfo.email} readOnly />
                      </Form.Group>
                    </Col>

                    {/* 신청동기 */}
                    {/* <Col md={12} sm={12} className="mb-4">
                      <Form.Group controlId="ApplyingReason">
                        <Form.Label>신청동기</Form.Label>
                        <Form.Control type="text" placeholder="신청동기를 입력해주세요" required />
                      </Form.Group>
                    </Col> */}

                    {/*  개인정보활용동의 */}
                    {/* <Col md={12} sm={12} className="mb-4">
                      <Form.Group controlId="postalcode">
                        <Form.Label>개인정보활용동의</Form.Label>
                        <div className="agreement">
                          법령에 따라 개인을 고유하게 구별하기 위하여 부여된 모든 식별정보(성명, 소속, 휴대폰, 이메일 등)의 수집, 이용에 대한 동의를 받고 있습니다. 신청시 기재되는 모든 개인정보는
                          사업진행을 위하여 수집 및 이용될 수 있습니다. 또한 대학평가관련 자료 요청시 교내 관련부서에 자료가 제공될 수 있으며, 철저하게 관리될 예정입니다. 수집된 개인정보는 5년
                          경과(대학 평가 관련 자료 요청 기간) 후 즉시 파기됩니다. 위와 관련하여 본인의 개인고유식별정보 수집, 이용에 관한 내용을 숙지하였고 이에 동의한다면 해당란에 체크해 주십시오.
                        </div>
                      </Form.Group>
                    </Col>

                    <Col md={12} sm={12} className="mb-5">
                    
                      <Form.Group controlId="customCheck1">
                        <Form.Check type="checkbox" label="개인정보 활용에 동의합니다." />
                      </Form.Group>
                    </Col> */}
                    <form id="fb-render"></form>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </>
        ) : (
          <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
            <Card>
              {/* <Card.Header>
                <h4>신청서 보기</h4>
              </Card.Header> */}
              {applicationNameLoading ? (
                <Card.Header>
                  <h4>{applicationName}</h4>
                </Card.Header>
              ) : (
                ""
              )}
              <Card.Body>
                {/*  Form */}
                <Form className="row  " id="application">
                  {/*  Name */}
                  <Col md={6} sm={12} className="mb-4">
                    <Form.Group controlId="Name">
                      <Form.Label>이름</Form.Label>
                      <Form.Control type="text" placeholder="이름을 입력해 주세요" />
                    </Form.Group>
                  </Col>
                  {/*  Student Id */}
                  <Col md={6} sm={12} className="mb-4">
                    <Form.Group controlId="StudentID">
                      <Form.Label>학번</Form.Label>
                      <Form.Control type="text" placeholder="학번을 입력해 주세요" />
                    </Form.Group>
                  </Col>
                  {/*  Department */}
                  <Col md={6} sm={12} className="mb-4">
                    <Form.Group controlId="StudentID">
                      <Form.Label>학부</Form.Label>
                      <Form.Control type="text" placeholder="학부를 입력해 주세요" />
                    </Form.Group>
                  </Col>
                  {/*  Major1 */}
                  <Col md={6} sm={12} className="mb-4">
                    <Form.Group controlId="StudentID">
                      <Form.Label>전공</Form.Label>
                      <Form.Control type="text" placeholder="전공을 입력해 주세요" />
                    </Form.Group>
                  </Col>
                  {/*  Phone number */}
                  <Col md={6} sm={12} className="mb-4">
                    <Form.Group controlId="Phone number">
                      <Form.Label>전화번호</Form.Label>
                      <Form.Control type="text" placeholder="Phone number (010-1234-5678)" />
                    </Form.Group>
                  </Col>

                  {/*  이메일 */}
                  <Col md={6} sm={12} className="mb-4">
                    <Form.Group controlId="Email">
                      <Form.Label>이메일</Form.Label>
                      <Form.Control type="text" placeholder="Handong123@handong.ac.kr" />
                    </Form.Group>
                  </Col>

                  {/* 신청동기 */}
                  {/* <Col md={12} sm={12} className="mb-4">
                    <Form.Group controlId="ApplyingReason">
                      <Form.Label>신청동기</Form.Label>
                      <Form.Control type="text" placeholder="신청동기를 입력해주세요" />
                    </Form.Group>
                  </Col> */}

                  {/*  개인정보활용동의 */}
                  {/* <Col md={12} sm={12} className="mb-4">
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
                  {/* <Col md={12} sm={12} className="mb-5">
      
                    <Form.Group controlId="customCheck1">
                      <Form.Check type="checkbox" label="개인정보 활용에 동의합니다." />
                    </Form.Group>
                  </Col> */}
                  <form id="fb-render"></form>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}
        <Col xl={3} lg={12} md={12} sm={12}>
          {applicantInformationLoading === true ? (
            <>
              <Card className="my-3">
                {/* <GKAccordionApplicant accordionItems={applicantInformation} /> */}
                <Fragment>
                  <Accordion defaultActiveKey="1">
                    <ListGroup as="ul" variant="flush">
                      <SimpleBar style={{ maxHeight: "700px" }}>
                        {applicantInformation.length > 0 ? (
                          <>
                            <ListGroup.Item key="1" as="li">
                              <ContextAwareToggle eventKey="1">신청한 학생들 </ContextAwareToggle>
                              <Accordion.Collapse eventKey="1" className="test">
                                <ListGroup className="py-4" as="ul">
                                  <div className="d-grid">
                                    <Button
                                      variant="transparent"
                                      onClick={() => setUserInfo(null)}
                                      className=" Applicant d-flex px-0 py-1 justify-content-between align-items-center text-inherit text-decoration-none border-bottom"
                                    >
                                      <div className="text-truncate">
                                        <span className="fs-5">기본 신청폼 보기</span>
                                      </div>
                                    </Button>
                                  </div>
                                  {applicantInformation.map((subitem, subindex) => (
                                    <ListGroup.Item key={subindex} as="li" className="px-0 py-1 border-0">
                                      {/* <Link to="#" onClick={() => getUserInfo(subitem)} className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none border-bottom`}>
                                        <div className="text-truncate mb-2">
                                          <span className="fs-5">{subitem.name}</span>
                                        </div>
                                        <div className="text-truncate">
                                          <span>({subitem.student_id})</span>
                                        </div>
                                      </Link> */}

                                      <div className="d-grid">
                                        <Button
                                          variant="transparent"
                                          onClick={() => getUserInfo(subitem)}
                                          className="Applicant d-flex px-0 py-1 justify-content-between align-items-center text-inherit text-decoration-none border-bottom"
                                        >
                                          <div className="text-truncate">
                                            <span className="fs-5">{subitem.name}</span>
                                          </div>
                                          <div className="text-truncate">
                                            <span>({subitem.student_id})</span>
                                          </div>
                                        </Button>
                                      </div>
                                    </ListGroup.Item>
                                  ))}
                                </ListGroup>
                              </Accordion.Collapse>
                            </ListGroup.Item>
                          </>
                        ) : (
                          <ListGroup.Item key="1" as="li">
                            <ContextAwareToggle eventKey="1">신청한 학생들</ContextAwareToggle>
                            <Accordion.Collapse eventKey="1">
                              <ListGroup variant="flush">
                                <ListGroup.Item className="border-0 fs-5 px-0 py-4">신청한 학생이 없습니다</ListGroup.Item>
                              </ListGroup>
                            </Accordion.Collapse>
                          </ListGroup.Item>
                        )}
                      </SimpleBar>
                    </ListGroup>
                  </Accordion>
                </Fragment>
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
