// import node module libraries
import React from "react";
import { Fragment } from "react";
import { Col, Row, Container, Nav, Tab } from "react-bootstrap";

// import custom components
import CourseSlider from "components/marketing/pages/courses/CourseSlider";

// import sub components
import HeroHeader from "components/marketing/pages/courses/course-index/HeroHeader";
import CourseCard from "components/marketing/pages/courses/CourseCard";

// import data files
import { AllCoursesData } from "data/slider/AllCoursesData";

const CourseIndex = () => {
  return (
    <Fragment>
      {/*  Page Content  */}
      <HeroHeader />

      {/*  Features list  */}
      {/* <FeaturesList /> */}

      <div className="pt-lg-3 pb-lg-3 pt-8 pb-6">
        <Container>
          <div className="py-6">
            <Container>
              <Row className="mb-6">
                <Col md={12}>
                  <Tab.Container defaultActiveKey="total">
                    <Nav className="nav-lb-tab">
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
                        <Nav.Link eventKey="camp" className="mb-sm-3 mb-md-0">
                          캠프
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="volunteer" className="mb-sm-3 mb-md-0">
                          봉사
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="lecture" className="mb-sm-3 mb-md-0">
                          특강
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="exam" className="mb-sm-3 mb-md-0">
                          시험
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="club" className="mb-sm-3 mb-md-0">
                          학회/동아리
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="macbook" className="mb-sm-3 mb-md-0">
                          맥북
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content>
                      <Tab.Pane eventKey="total" className="pb-4 p-4 ps-0 pe-0">
                        <div className="pt-lg-3 pb-lg-3 pt-8 pb-6">
                          <Container>
                            <Row className="mb-4">
                              <Col>
                                <h2 className="mb-0 mx-2">대회</h2>
                              </Col>
                            </Row>
                            <div className="position-relative">
                              <CourseSlider recommended={true} />
                            </div>
                          </Container>
                        </div>

                        <div className="pb-lg-3 pt-lg-3">
                          <Container>
                            <Row className="mb-4">
                              <Col>
                                <h2 className="mb-0 mx-2">캠프</h2>
                              </Col>
                            </Row>
                            <div className="position-relative">
                              <CourseSlider popular={true} />
                            </div>
                          </Container>
                        </div>

                        <div className="pb-lg-8 pt-lg-3 py-6">
                          <Container>
                            <Row className="mb-4">
                              <Col>
                                <h2 className="mb-0 mx-2">봉사</h2>
                              </Col>
                            </Row>
                            <div className="position-relative">
                              <CourseSlider trending={true} />
                            </div>
                          </Container>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="competition" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          {AllCoursesData.filter(function (datasource) {
                            return datasource.id === 1 || datasource.id === 2 || datasource.id === 3 || datasource.id === 4;
                          }).map((item, index) => (
                            <Col lg={3} md={6} sm={12} key={index}>
                              <CourseCard item={item} />
                            </Col>
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="camp" className="pb-4 p-4 ps-0 pe-0">
                        <Row>
                          {AllCoursesData.filter(function (datasource) {
                            return datasource.id === 1 || datasource.id === 2 || datasource.id === 3 || datasource.id === 4;
                          }).map((item, index) => (
                            <Col lg={3} md={6} sm={12} key={index}>
                              <CourseCard item={item} />
                            </Col>
                          ))}
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
    </Fragment>
  );
};

export default CourseIndex;
