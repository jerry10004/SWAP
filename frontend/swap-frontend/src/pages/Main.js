// import node module libraries
import React, { useLayoutEffect, useState } from "react";
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
import axios from "axios";

const Main = ({ login }) => {
  const [totalInfo, setTotalInfo] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [competitionInfo, setCompetitionInfo] = useState([]);
  const [volunteerInfo, setVolunteerInfo] = useState([]);
  const [campInfo, setCampInfo] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [macbookInfo, setMacbookInfo] = useState([]);
  const [studyInfo, setStudyInfo] = useState([]);
  const [internInfo, setInternInfo] = useState([]);
  const [lectureInfo, setLectureInfo] = useState([]);
  const [etcInfo, setEtcInfo] = useState([]);
  const [totalLoading, setTotalLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState([]);

  useLayoutEffect(() => {
    setTotalLoading(false);
    readTotal();
    for (var i = 1; i <= 9; i++) {
      readByCategory(i);
      if (i === 9) setTotalLoading(true);
    }
    setTotalLoading(true);
    if (totalLoading) {
      console.log("@@ total  ", totalInfo);
      console.log("@@ cate : ", categoryInfo);
      console.log("@@ compeit: ", competitionInfo);
      console.log("@@ vol: ", volunteerInfo);
    }
    console.log("555");
  }, []);

  const readTotal = async () => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program");
    setTotalInfo(response.data);
  };

  const readFile = async () => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "");
    setFileInfo(response.data);
  };

  const props = {
    total_data: totalInfo,
    category_data: categoryInfo,
    competition_data: competitionInfo,
    volunteer_data: volunteerInfo,
  };

  const readByCategory = async (category_id) => {
    var params = new URLSearchParams();
    params.append("category_id", category_id);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/category", params);
    setCategoryInfo(response.data);
    if (category_id === 1) setCompetitionInfo(response.data);
    else if (category_id === 2) setVolunteerInfo(response.data);
    else if (category_id === 3) setCampInfo(response.data);
    else if (category_id === 4) setEventInfo(response.data);
    else if (category_id === 5) setMacbookInfo(response.data);
    else if (category_id === 6) setStudyInfo(response.data);
    else if (category_id === 7) setInternInfo(response.data);
    else if (category_id === 8) setLectureInfo(response.data);
    else if (category_id === 9) setEtcInfo(response.data);
  };

  return (
    <Fragment>
      {setTotalLoading ? (
        <>
          <NavbarDefault login={false} />
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
                              <AllProgramsData category="0" total_data={totalInfo} category_data={totalInfo} />
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="competition" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              <AllProgramsData category="1" total_data={totalInfo} category_data={competitionInfo} />
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="volunteer" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              <AllProgramsData category="2" total_data={totalInfo} category_data={volunteerInfo} />
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="camp" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              <AllProgramsData category="3" total_data={totalInfo} category_data={campInfo} />
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="event" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              <AllProgramsData category="4" total_data={totalInfo} category_data={eventInfo} />
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="macbook" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              <AllProgramsData category="5" total_data={totalInfo} category_data={macbookInfo} />
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="study" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              <AllProgramsData category="6" total_data={totalInfo} category_data={studyInfo} />
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="intern" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              <AllProgramsData category="7" total_data={totalInfo} category_data={internInfo} />
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="lecture" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              <AllProgramsData category="8" total_data={totalInfo} category_data={lectureInfo} />
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="etc" className="pb-4 p-4 ps-0 pe-0">
                            <Row>
                              <AllProgramsData category="9" total_data={totalInfo} category_data={etcInfo} />
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
        </>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Main;
