// import node module libraries
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import node module libraries
import { Fragment } from "react";
import { Col, Row, Card, Tab, Breadcrumb, Button } from "react-bootstrap";

// import sub components
import InstructorsListItems from "components/dashboard/user/InstructorsListItems";

import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";

const ManageInstructor = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [adminInfo, setAdminInfo] = useState();

  // useEffect(() => {
  //   readAdmin();
  // }, []);

  // const readAdmin = async () => {
  //   console.log("#################");
  //   const response = await axios.get("http://localhost:8080/swap/admin");
  //   setAdminInfo(response.data);
  // };

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
                        Instructor <span className="fs-5 text-muted">(12,105)</span>
                      </h1>
                      <Breadcrumb>
                        <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>
                        <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                        <Breadcrumb.Item active>Instructor</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                    <div>
                      <Link to="add">
                        <Button>관리자 추가</Button>
                      </Link>
                      {/* <GridListViewButton keyGrid="grid" keyList="list" /> */}
                    </div>
                  </div>
                </Col>
              </Row>

              <Tab.Content>
                <Card className="mb-5 ">
                  <Card.Body className="p-0">
                    <InstructorsListItems />
                  </Card.Body>
                </Card>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ManageInstructor;
