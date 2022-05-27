// import node module libraries
import { Fragment } from "react";
import { Row, Col, Card, Tab, Breadcrumb, Button, Nav } from "react-bootstrap";
import React, { useState, useLayoutEffect } from "react";
import { useParams, Link } from "react-router-dom";

// import sub components
import ApplicationFormView from "components/dashboard/single/overview/ApplicationFormView";
import ApplicantsListItems from "components/dashboard/user/ApplicantsListItems";
import ProgramInformation from "components/marketing/pages/courses/add-new-course/steps/ProgramInformation";
import SurveyFormView from "components/dashboard/single/overview/SurveyFormView";
import ApplicationDataView from "../pages/ApplicationDataView";
import SurveyDataView from "../pages/SurveyDataView";

import axios from "axios";

// import sub components
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";

const AdminProgramDetail = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [programName, setProgramName] = useState();
  const [programNameLoading, setProgramNameLoading] = useState(false);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  const id = useParams();

  useLayoutEffect(() => {
    readProgramName();
  }, []);

  const readProgramName = async () => {
    setProgramNameLoading(false);
    var params = new URLSearchParams();
    // console.log("hihihiihi: ", typeof id["id"], id["id"]);

    if (id["id"] != null) {
      params.append("id", id["id"]);
      const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id["id"]);
      setProgramName(response.data[0].program_name);
      setProgramNameLoading(true);
    }
  };

  return (
    <Fragment>
      {programNameLoading === true ? (
        <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
          <div className="navbar-vertical navbar">
            <NavbarVertical showMenu={showMenu} onClick={(value) => setShowMenu(value)} />
          </div>
          <div id="page-content">
            <div className="header">
              <NavbarTop
                data={{
                  showMenu: showMenu,
                  SidebarToggleMenu: ToggleMenu,
                }}
              />
            </div>
            <div className="container-fluid p-4">
              <Tab.Container defaultActiveKey="grid">
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
                      <div className="mb-3 mb-md-0">
                        <h1 className="mb-1 h2 fw-bold">{programName}</h1>
                      </div>

                      <div>
                        <Link to="/swap/admin/program" className="btn btn-success ">
                          프로그램 목록 보기
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Tab.Container defaultActiveKey="information">
                      <Card>
                        <Card.Header className="border-bottom-0 p-0 bg-white">
                          <Nav className="nav-lb-tab">
                            <Nav.Item>
                              <Nav.Link eventKey="information" className="mb-sm-3 mb-md-0">
                                정보
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="application" className="mb-sm-3 mb-md-0">
                                신청서
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="applicationData" className="mb-sm-3 mb-md-0">
                                신청응답
                              </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                              <Nav.Link eventKey="applicant" className="mb-sm-3 mb-md-0">
                                신청현황
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="survey" className="mb-sm-3 mb-md-0">
                                설문지
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="surveyData" className="mb-sm-3 mb-md-0">
                                설문응답
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <Tab.Content>
                            <Tab.Pane eventKey="information" className="pb-4">
                              <ProgramInformation param1={id} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="application" className="pb-4">
                              <ApplicationFormView param2={id} />
                            </Tab.Pane>

                            <Tab.Pane eventKey="applicationData" className="pb-4">
                              <ApplicationDataView param3={id} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="applicant" className="pb-4">
                              <ApplicantsListItems param4={id} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="survey" className="pb-4">
                              <SurveyFormView param3={id} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="surveyData" className="pb-4">
                              <SurveyDataView param3={id} />
                            </Tab.Pane>
                          </Tab.Content>
                        </Card.Body>
                      </Card>
                    </Tab.Container>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default AdminProgramDetail;
