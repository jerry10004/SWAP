// import node module libraries
import React from "react";
import { Fragment } from "react";
import { Col, Row, Container, Nav, Tab, Form } from "react-bootstrap";

// import custom components
import CourseSlider from "components/marketing/pages/courses/CourseSlider";

// import sub components
import HeroHeader from "components/marketing/pages/courses/course-index/HeroHeader";

// import data files
import AllProgramsData from "data/slider/AllProgramsData";

// import layouts
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/Footer";

const Main = ({ login }) => {
  return (
    <Fragment>
      <NavbarDefault login={false} />
      {/*  Page Content  */}
      <HeroHeader />

      <div className="pt-lg-3 pb-lg-3 pt-8 pb-6">
        <Container>
          <div className="py-6">
            <Container>
              <Row className="mb-6">
                <Col md={12}>
                  <Tab.Container defaultActiveKey="total">
                    <Nav className="nav-lb-tab  fs-4">
                      <Nav.Item className="ms-0">
                        <Nav.Link eventKey="total" className="mb-sm-3 mb-md-0">
                          전체보기
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="competition" className="mb-sm-3 mb-md-0">
                          대회
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="volunteer" className="mb-sm-3 mb-md-0">
                          봉사
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="camp" className="mb-sm-3 mb-md-0">
                          캠프
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="event" className="mb-sm-3 mb-md-0">
                          행사
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="macbook" className="mb-sm-3 mb-md-0">
                          맥북
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="study" className="mb-sm-3 mb-md-0">
                          프로젝트/스터디
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="intern" className="mb-sm-3 mb-md-0">
                          인턴/현장실습
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="lecture" className="mb-sm-3 mb-md-0">
                          특강
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="etc" className="mb-sm-3 mb-md-0">
                          기타
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content>
                      <Tab.Pane eventKey="total" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="0" />
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="competition" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="1" />
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="volunteer" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="2" />
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="camp" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="3" />
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="event" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="4" />
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="club" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="5" />
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="macbook" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="6" />
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="study" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="7" />
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="intern" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="8" />
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="lecture" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="9" />
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="etc" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          <AllProgramsData category="10" />
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Main;
