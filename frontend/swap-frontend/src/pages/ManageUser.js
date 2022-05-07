// import node module libraries
import React, { useState } from "react";
import { Link } from "react-router-dom";

// import node module libraries
import { Fragment } from "react";
import { Col, Row, Card, Tab, Breadcrumb, Button, Nav } from "react-bootstrap";

// import sub components
import UsersListItems from "components/dashboard/user/UsersListItems";
import StudentsListItems from "components/dashboard/user/StudentsListItems";
import InstructorsListItems from "components/dashboard/user/InstructorsListItems";
import DeletedUsersListItems from "components/dashboard/user/DeletedUsersListItems";
import WaitInstructorsListItems from "components/dashboard/user/WaitInstructorsListItems";

// import sub components
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";

const ManageUser = () => {
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
            <Tab.Container defaultActiveKey="grid">
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
                    <div className="mb-3 mb-md-0">
                      <h1 className="mb-1 h2 fw-bold">
                        사용자
                        {/* <span className="fs-5 text-muted">(12,105)</span> */}
                      </h1>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Tab.Container defaultActiveKey="all">
                    <Card>
                      <Card.Header className="border-bottom-0 p-0 bg-white">
                        <Nav className="nav-lb-tab">
                          <Nav.Item>
                            <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                              전체
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="instructors" className="mb-sm-3 mb-md-0">
                              관리자
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="students" className="mb-sm-3 mb-md-0">
                              학생
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="deletedUsers" className="mb-sm-3 mb-md-0">
                              삭제된 사용자
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="waitInstructors" className="mb-sm-3 mb-md-0">
                              대기중인 관리자
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Card.Header>
                      <Card.Body className="p-0">
                        <Tab.Content>
                          <Tab.Pane eventKey="all" className="pb-4">
                            <UsersListItems />
                          </Tab.Pane>
                          <Tab.Pane eventKey="instructors" className="pb-4">
                            <InstructorsListItems />
                          </Tab.Pane>
                          <Tab.Pane eventKey="students" className="pb-4">
                            <StudentsListItems />
                          </Tab.Pane>
                          <Tab.Pane eventKey="deletedUsers" className="pb-4">
                            <DeletedUsersListItems />
                          </Tab.Pane>
                          <Tab.Pane eventKey="waitInstructors" className="pb-4">
                            <WaitInstructorsListItems />
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
export default ManageUser;
