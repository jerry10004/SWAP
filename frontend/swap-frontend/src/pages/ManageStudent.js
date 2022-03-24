// import node module libraries
import { Fragment } from "react";
import { Col, Row, Card, Tab, Breadcrumb } from "react-bootstrap";

// import custom components
import GridListViewButton from "components/elements/miscellaneous/GridListViewButton";

// import sub components
import StudentsGridCard from "components/dashboard/user/StudentsGridCard";
import StudentsListItems from "components/dashboard/user/StudentsListItems";

// import node module libraries
import React, { useState } from "react";

// import sub components
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";

const ManageStudent = () => {
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
                        Students <span className="fs-5 text-muted">(1,22,105 )</span>
                      </h1>
                      <Breadcrumb>
                        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                        <Breadcrumb.Item active>Students</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                    <div>
                      <GridListViewButton keyGrid="grid" keyList="list" />
                    </div>
                  </div>
                </Col>
              </Row>

              <Tab.Content>
                <Tab.Pane eventKey="grid" className="pb-4">
                  {/* students in list view */}
                  <StudentsGridCard />
                  {/* end of students in list view */}
                </Tab.Pane>
                <Tab.Pane eventKey="list" className="pb-4">
                  <Card className="mb-5 ">
                    <Card.Body className="p-0">
                      {/* students in list view */}
                      <StudentsListItems />
                      {/* end of students in list view */}
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ManageStudent;
