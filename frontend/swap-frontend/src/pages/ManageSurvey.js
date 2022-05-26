// import node module libraries
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Tab, Card, Nav, Breadcrumb } from "react-bootstrap";

// import sub custom components
import SurveyListItems from "components/dashboard/user/SurveyListItems";

// import sub components
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";

const ManageSurvey = () => {
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };
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
            <Row>
              <Col lg={12} md={12} sm={12}>
                <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                  <div className="mb-3 mb-md-0">
                    <h1 className="mb-1 h2 fw-bold">설문지 템플릿</h1>
                  </div>
                  <div>
                    <Link to="/swap/admin/addsurvey" className="btn btn-primary">
                      설문지 템플릿 추가
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Tab.Container defaultActiveKey="all">
                  <Card>
                    <Card.Header className="border-bottom-0 p-0 bg-white">
                      <Nav className="nav-lb-tab fs-4">
                        <Nav.Item>
                          <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                            전체
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <Tab.Content>
                        <Tab.Pane eventKey="all" className="pb-4">
                          <SurveyListItems />
                        </Tab.Pane>
                      </Tab.Content>
                    </Card.Body>
                  </Card>
                </Tab.Container>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageSurvey;
