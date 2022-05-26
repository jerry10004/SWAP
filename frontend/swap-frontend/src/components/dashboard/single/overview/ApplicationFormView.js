// import node module libraries
import { Col, Card, Form, Button, Container, Row, Accordion, useAccordionButton, AccordionContext, ListGroup } from "react-bootstrap";
import React, { Fragment, useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DotBadge from "components/elements/bootstrap/DotBadge";

import axios from "axios";
import $ from "jquery";
import "assets/scss/formBuilder.scss";
import FormBuilder from "pages/FormBuilder";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import jsonSkeleton from "json/jsonSkeleton.json";

window.jQuery = $;
window.$ = $;
require("formBuilder/dist/form-render.min.js");

const ApplicationFormView = (props) => {
  const [showMenu, setShowMenu] = useState(true);
  const [readyJson, setReadyJson] = useState(false);
  const [formContent, setFormContent] = useState();
  const [json, setJson] = useState(null);
  const [programInformation, setProgramInformation] = useState();

  const [applicantInformation, setApplicantInformation] = useState(null);
  const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [originalFormData, setoriginalFormData] = useState([]);
  const [studentFormData, setstudentFormData] = useState([]);
  const [applicantClick, setApplicantClick] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [applicantNum, setApplicantNum] = useState(0);
  const [updateFormData, setUpdateFormData] = useState();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [program_status, setProgram_status] = useState();
  const [applicant_status, setApplicant_status] = useState("0");
  const [program_id, setProgram_id] = useState();

  const [formData, setFormData] = useState({
    program_title: "Title",
    program_category: "1",
    program_description: "Hello, world!",
    program_quota: "0",
    program_img: "img",
    start_date: "",
    end_date: "",
    Applystart_date: "",
    Applyend_date: "",
    manager_name: "",
    manager_contact: "",
    application_form: "",
    poster: "",
  });
  useLayoutEffect(() => {
    readApplicantInformation(props.param2.id);
    readFormData(props.param2.id);
    readProgramJson(props.param2.id);
    readProgramStatus(props.param2.id);
    setProgram_id(props.param2.id);
  }, []);

  const readProgramStatus = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id);
    setProgram_status(response.data[0].status);
  };

  useEffect(() => {
    setJson(jsonSkeleton);
    componentDidMount();
  }, [originalFormData, userInfo]);

  const readApplicantInformation = async (id) => {
    setApplicantInformationLoading(false);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + id);
    // console.log("@@@@@@@@@@@@: ", response.data);
    setApplicantInformation(response.data);
    setApplicantNum(response.data.length);
    setApplicantInformationLoading(true);
  };

  const handleChangeSelect = (e) => {
    setApplicant_status(e.target.value);
  };

  // 해당 Program Json 읽어오는 함수
  const readProgramJson = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/read/application/" + id);

    var json_total = response.data[0].application_form;
    var json_sub = json_total.slice(1, json_total.length - 1);
    var arr = JSON.parse("[" + json_sub + "]");
    console.log("@@@@@@@@@@@@@@@: ", response.data[0]);
    setProgramInformation(response.data[0]);
    setFormContent(arr);
    setReadyJson(true);
  };

  const submitButton = async (form) => {
    setUpdateLoading(false);
    setUpdateFormData(form);
    setUpdateLoading(true);
    var params = new URLSearchParams();
    params.append("program_id", props.param2.id);
    params.append("application_form", form);

    if (window.confirm("신청서를 수정하시겠습니까?")) {
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/update/application", params);

      alert("신청서가 수정 되었습니다.");
      window.location.reload();
    }
  };

  const highFunction = (isSet) => {};

  const readFormData = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "application/readApplicationForm/" + id);
    var json_total = response.data[0].application_form;
    setoriginalFormData(json_total);
  };

  const getUserInfo = (user) => {
    setUserInfo(user);
    console.log("##########: ", user);
    setstudentFormData(user.application_form);
    setApplicantClick(true);
  };

  const update = async (e) => {
    var updateApplicantId = [];
    var updateApplicantStatus = [];
    var params = new URLSearchParams();

    updateApplicantId.push(e);
    updateApplicantStatus.push(applicant_status);

    params.append("id", updateApplicantId);
    params.append("status", updateApplicantStatus);
    params.append("program_id", program_id);

    if (updateApplicantId != "") {
      if (window.confirm("사용자 상태를 수정하시겠습니까?")) {
        console.log("status~~~: ", updateApplicantStatus);
        const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + program_id + "/update", params);
        readApplicantInformation(props.param2.id);
        alert("사용자 상태가 수정되었습니다.");
        // window.location.reload();
      }
    }
  };

  const edit = () => {
    setIsEdit(true);
  };

  const save = () => {
    setIsEdit(false);
  };

  const componentDidMount = async () => {
    const fbRender = document.getElementById("fb-render");
    const formData = userInfo != null ? studentFormData : originalFormData;

    $(fbRender).formRender({ formData });

    const fbRender2 = document.getElementById("fb-render2");
    const formData2 = userInfo != null ? studentFormData : originalFormData;
    $(fbRender2).formRender({ formData2 });

    if (updateLoading) {
      const fbRender3 = document.getElementById("fb-render3");
      const formData3 = updateFormData;
      $(fbRender3).formRender({ formData3 });
    }
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
          <div className="me-auto">신청한 학생들 ({applicantNum})</div>
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
          isEdit === false ? (
            <>
              <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
                <Card>
                  <Card.Header>신청서</Card.Header>
                  <Card.Body>
                    {/*  Form */}
                    <Form className="row" id="application">
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
                      <form id="fb-render"></form>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ) : (
            <>
              <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
                <Form className="row" id="application">
                  <form id="fb-render2"></form>
                </Form>
              </Col>
            </>
          )
        ) : /* 수정하고 난 다음 완료 버튼 눌렀을 때 뜨는 부분. 이때 formRender가 되지 않고, 해당 formRender에는 새롭게 수정된 Form 이 보여야한다. */
        isEdit === false ? (
          <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
            <Card>
              <Card.Header>신청서</Card.Header>
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

                  <form id="fb-render"></form>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <Col xl={9} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
            {/* <Card>
              <Card.Header>신청서</Card.Header>
              <Card.Body> */}
            <Row>
              {/* <Form>{formContent.length > 0 ? <FormBuilder content={formContent} propFunction={highFunction} submit={submitButton} template="0" program="1" edit="1" saveFunction={save} /> : ""}</Form> */}
              <Form>{formContent.length > 0 ? <FormBuilder content={formContent} propFunction={highFunction} submit={submitButton} edit="1" saveFunction={save} /> : ""}</Form>
            </Row>
            {/* </Card.Body>
            </Card> */}
          </Col>
        )}

        <Col xl={3} lg={12} md={12} sm={12} className="d-flex flex-column justify-content-between">
          {applicantInformationLoading === true ? (
            isEdit === false ? (
              <>
                <Card className="my-3">
                  <Fragment>
                    <Row className="mb-4">
                      {" "}
                      <Col xl={8} lg={8} md={8} sm={8}>
                        {program_status === 0 ? (
                          <Form.Select onChange={handleChangeSelect}>
                            <option value="0">참여보류</option>
                            <option value="1">참여승인</option>
                            <option value="2">참여불가</option>
                          </Form.Select>
                        ) : program_status === 2 ? (
                          <Form.Select onChange={handleChangeSelect}>
                            <option value="3">미수료</option>
                            <option value="4">수료</option>
                          </Form.Select>
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col xl={4} lg={4} md={4} sm={4}>
                        {program_status !== 1 ? (
                          <Button
                            variant="primary"
                            onClick={() => {
                              // update(selectedFlatRows);
                              update(userInfo.id);
                            }}
                          >
                            저장
                          </Button>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
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
                                      <ListGroup.Item key={subindex} as="li" className="px-0 py-1 border-0 ">
                                        <div className="d-flex justify-content-between border-bottom">
                                          <div className="d-flex align-items-center">
                                            <DotBadge
                                              bg={
                                                subitem.status === 0
                                                  ? "warning"
                                                  : subitem.status === 1
                                                  ? "success"
                                                  : subitem.status === 2
                                                  ? "danger"
                                                  : subitem.status === 3
                                                  ? "secondary"
                                                  : subitem.status === 4
                                                  ? "primary"
                                                  : ""
                                              }
                                            ></DotBadge>
                                            {subitem.status === 0
                                              ? "보류 "
                                              : subitem.status === 1
                                              ? "승인 "
                                              : subitem.status === 2
                                              ? "불가 "
                                              : subitem.status === 3
                                              ? "미수료 "
                                              : subitem.status === 4
                                              ? "수료 "
                                              : ""}
                                          </div>
                                          <div className="d-flex flex-row justify-content-end">
                                            <Button
                                              variant="transparent"
                                              onClick={() => getUserInfo(subitem)}
                                              className="Applicant w-100 d-flex px-0 py-1 justify-content-end align-items-center text-inherit text-decoration-none "
                                            >
                                              <div className="text-truncate">
                                                <span className="fs-5">{subitem.name}</span>
                                              </div>
                                              <div className="text-truncate">
                                                <span>({subitem.student_id})</span>
                                              </div>
                                            </Button>
                                          </div>
                                        </div>
                                      </ListGroup.Item>
                                    ))}
                                  </ListGroup>
                                </Accordion.Collapse>
                              </ListGroup.Item>
                            </>
                          ) : (
                            <>
                              <ListGroup.Item key="1" as="li">
                                <ContextAwareToggle eventKey="1">신청한 학생들</ContextAwareToggle>
                                <Accordion.Collapse eventKey="1">
                                  <ListGroup variant="flush">
                                    <ListGroup.Item className="border-0 fs-5 px-0 py-4">신청한 학생이 없습니다</ListGroup.Item>
                                  </ListGroup>
                                </Accordion.Collapse>
                              </ListGroup.Item>
                            </>
                          )}
                        </SimpleBar>
                      </ListGroup>
                    </Accordion>
                  </Fragment>
                </Card>
                {readyJson === true && programInformation.status === 0 && programInformation.applicants_num === 0 ? (
                  <div className="d-flex justify-content-end align-items-end">
                    <Button variant="primary" onClick={edit}>
                      수정
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              <></>
            )
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default ApplicationFormView;
