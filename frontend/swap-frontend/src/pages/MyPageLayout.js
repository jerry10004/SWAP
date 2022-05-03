// import node module libraries
import React, { Fragment, useState, useLayoutEffect } from "react";

import { useParams } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, Card, Tab } from "react-bootstrap";

// import routes file
//import { DashboardMenu, AccountSettingsMenu } from "routes/marketing/StudentDashboardMenu";
import ProfileCover from "components/marketing/common/headers/ProfileCover";
import EditProfile from "../pages/EditProfile";
import MyPage from "../pages/MyPage";
import Bookmark from "../pages/Bookmark";
// import media files
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/Footer";

// import custom components
import axios from "axios";

const MyPageLayout = () => {
  var ID = parseInt(window.sessionStorage.getItem("id"));
  useLayoutEffect(() => {
    readApplicantInformation(ID);
  }, []);

  const [applicantInformation, setApplicantInformation] = useState(null);
  const [applicantInformationLoading, setApplicantInformationLoading] = useState(false);

  const readApplicantInformation = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    setApplicantInformation(response.data);
    setApplicantInformationLoading(true);
  };

  return (
    <Fragment>
      <NavbarDefault login />
      {applicantInformationLoading === true ? (
        <div className="pt-5 pb-5">
          {applicantInformation[0].status === 1 ? (
            <Container>
              <ProfileCover userInfo={applicantInformation} />
              <Tab.Container id="left-tabs-example" defaultActiveKey="my_programs">
                <Row className="mt-0 mt-md-4">
                  <Col lg={3} md={4} sm={12}>
                    <Nav variant="pills" className="me-auto flex-column bg-white shadow-sm mb-4 mb-lg-0 sidenav rounded-3">
                      <Nav.Item>
                        <Nav.Link eventKey="my_programs" className="border-bottom">
                          {" "}
                          <i className={`fe fe-list nav-icon`}></i> 신청한 프로그램
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="liked_programs" className="border-bottom">
                          {" "}
                          <i className={`fe fe-bookmark nav-icon`}></i> 저장한 프로그램
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="profile" className="border-bottom">
                          {" "}
                          <i className={`fe fe-user nav-icon`}></i> 프로필 정보
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={9} md={8} sm={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="my_programs">
                        <MyPage></MyPage>
                      </Tab.Pane>
                      <Tab.Pane eventKey="liked_programs">
                        <Bookmark></Bookmark>
                      </Tab.Pane>
                      <Tab.Pane eventKey="profile">
                        <EditProfile userInfo={applicantInformation}></EditProfile>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Container>
          ) : (
            <>
              <Container>
                <ProfileCover userInfo={applicantInformation} />
                <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                  <Row className="mt-0 mt-md-4">
                    <Col lg={3} md={4} sm={12}>
                      <Nav variant="pills" className="me-auto flex-column bg-white shadow-sm mb-4 mb-lg-0 sidenav rounded-3">
                        <Nav.Item>
                          <Nav.Link eventKey="profile" className="border-bottom">
                            {" "}
                            <i className={`fe fe-user nav-icon`}></i> 프로필 정보
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                    <Col lg={9} md={8} sm={12}>
                      <Tab.Content>
                        <Tab.Pane eventKey="profile">
                          <EditProfile userInfo={applicantInformation}></EditProfile>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Container>{" "}
            </>
          )}
        </div>
      ) : (
        <> </>
      )}
      <Footer />
    </Fragment>
  );
};
export default MyPageLayout;
