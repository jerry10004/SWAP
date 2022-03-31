// import node module libraries
import { Fragment } from "react";
import { Row, Col, Card, Tab, Breadcrumb, Button, Nav } from "react-bootstrap";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// import sub components
import ProjectSummary from "components/dashboard/single/overview/ProjectSummary";
import BudgetSection from "components/dashboard/single/overview/BudgetSection";
import UpcomingDeadlines from "components/dashboard/single/overview/UpcomingDeadlines";
import LaunchDate from "components/dashboard/single/overview/LaunchDate";
import OverallProgressChart from "components/dashboard/single/overview/OverallProgressChart";
import RecentActivity from "components/dashboard/single/overview/RecentActivity";

import ProgramInformation from "components/marketing/pages/courses/add-new-course/steps/ProgramInformation";

// import sub components
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";

const AdminProgramDetail = () => {
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  const id = useParams();

  return (
    <Fragment>
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
                      <h1 className="mb-1 h2 fw-bold">맥북신청</h1>
                      <Breadcrumb>
                        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Users</Breadcrumb.Item>
                      </Breadcrumb>
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
                            <Nav.Link eventKey="survey" className="mb-sm-3 mb-md-0">
                              설문지
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="applicant" className="mb-sm-3 mb-md-0">
                              신청현황
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
                            <BudgetSection />
                          </Tab.Pane>
                          <Tab.Pane eventKey="survey" className="pb-4">
                            <UpcomingDeadlines />
                          </Tab.Pane>
                          <Tab.Pane eventKey="applicant" className="pb-4">
                            <LaunchDate />

                            <OverallProgressChart />

                            <RecentActivity />
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
    </Fragment>
  );
};

export default AdminProgramDetail;
