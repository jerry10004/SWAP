// import node module libraries
import React, { Fragment, useLayoutEffect, useState } from "react";
import { Col, Row, Card, Nav, Tab } from "react-bootstrap";
import axios from "axios";

// import sub components
import ReadyProgramTable from "components/dashboard/ReadyProgramTable";
import OngoingProgramTable from "components/dashboard/OngoingProgramTable";
import CompleteProgramTable from "components/dashboard/CompleteProgramTable";

const MyPage = () => {
  const [readyProgram, setReadyProgram] = useState([]);
  const [ongoingProgram, setOngoingProgram] = useState([]);
  const [completeProgram, setCompleteProgram] = useState([]);
  const [surveyConfirm, setSurveyConfirm] = useState([]);
  const [programLoading, setProgramLoading] = useState(false);
  const user_id = window.sessionStorage.getItem("id");

  useLayoutEffect(() => {
    setProgramLoading(false);

    readReadyProgram();
    readOnGoingProgram();
    readCompleteProgram();
    setProgramLoading(true);
  }, []);

  const readReadyProgram = async () => {
    setProgramLoading(false);
    var params = new URLSearchParams();
    params.append("user_id", user_id);
    params.append("status", 0);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/status", params);
    setReadyProgram(response.data);
    console.log("whow", response.data);
  };

  const readOnGoingProgram = async () => {
    setProgramLoading(false);
    var params = new URLSearchParams();
    params.append("user_id", user_id);
    params.append("status", 1);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/status", params);
    setOngoingProgram(response.data);
  };
  const readCompleteProgram = async () => {
    setProgramLoading(false);
    var params = new URLSearchParams();
    params.append("user_id", user_id);
    params.append("status", 2);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/status", params);
    setCompleteProgram(response.data);
    console.log("이거봐!!!, ", response.data);
  };

  // const confirmSurvey = async () => {
  //   var user_id = parseInt(window.sessionStorage.getItem("id"));
  //   var params = new URLSearchParams();
  //   params.append("user_id", user_id);
  //   const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "applicant/confirm/survey", params);
  //   console.log("이거봐!!!, ", response.data);
  //   setSurveyConfirm(response.data);
  //   setProgramLoading(true);
  // };

  return (
    <Fragment>
      {programLoading ? (
        <>
          {/* <NavbarDefault login /> */}
          {/* <div className="container-fluid p-4"> */}
          {/* <Row>
              <Col lg={12} md={12} sm={12}>
                <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                  <div className="mb-3 mb-md-0">
                    <h1 className="mb-1 h2 fw-bold">마이페이지</h1>
                  </div>
                </div>
              </Col>
            </Row> */}

          <Row>
            <Col lg={12} md={12} sm={12}>
              <Tab.Container defaultActiveKey="all">
                <Card>
                  <Card.Header className="border-bottom-0 p-0 bg-white">
                    <Nav className="nav-lb-tab  fs-4">
                      <Nav.Item>
                        <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                          대기
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="published" className="mb-sm-3 mb-md-0">
                          진행
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="scheduled" className="mb-sm-3 mb-md-0">
                          종료
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <Tab.Content>
                      <Tab.Pane eventKey="all" className="pb-0">
                        <ReadyProgramTable table_data={readyProgram} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="published" className="pb-0">
                        <OngoingProgramTable table_data={ongoingProgram} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="scheduled" className="pb-4">
                        <CompleteProgramTable table_data={completeProgram} />
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
          </Row>
          {/* </div> */}
        </>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default MyPage;
