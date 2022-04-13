// import node module libraries
import React, { Fragment } from "react";
import { Col, Row, Container, Card, Image, Nav, Tab, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

// import sub components tabs
import ReviewsTab from "components/marketing/pages/courses/course-single2/ReviewsTab";
import DescriptionTab from "components/marketing/pages/courses/course-single2/DescriptionTab";
import TranscriptTab from "components/marketing/pages/courses/course-single2/TranscriptTab";
import FAQTab from "components/marketing/pages/courses/course-single2/FAQTab";

// import MDI icons
import Icon from "@mdi/react";
import { mdiAccountMultipleOutline } from "@mdi/js";
import { mdiCalendarBlank } from "@mdi/js";

import Ratings from "components/marketing/common/ratings/Ratings";
import GKAccordionProgress from "components/marketing/common/accordions/GKAccordionProgress";
import LevelIcon from "components/marketing/common/miscellaneous/LevelIcon";

import Poster from "assets/images/Poster.png";
import CSEE from "assets/images/CSEE.png";

import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";

const Program = () => {
  return (
    <Fragment>
      <NavbarDefault login />
      <div className="py-lg-3 py-3">
        <Container>
          <div className="d-flex justify-content-start mb-3">
            <div>
              <Link to="/main" className="btn btn-outline-primary">
                프로그램 목록보기
              </Link>
            </div>
          </div>
          <Row>
            <Col xl={8} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
              <Tab.Container defaultActiveKey="세부내용">
                <Card className="mb-3">
                  {/*  Card body  */}
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <h1 className="fw-semi-bold mb-2">CSEE 특강</h1>
                      <OverlayTrigger key="top" placement="top" overlay={<Tooltip id="tooltip-top">Add to Bookmarks</Tooltip>}>
                        <Link to="#">
                          <i className="fe fe-bookmark fs-3 text-inherit"></i>
                        </Link>
                      </OverlayTrigger>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <Icon path={mdiCalendarBlank} size={0.7} />
                        <span>신청기간 : 2022-04-01 ~ 2022-05-01</span>
                        <br />
                        <Icon path={mdiAccountMultipleOutline} size={0.7} />
                        <span>신청현황 : 5명 / 200명 </span>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div>
                          <Link to="/program/application" className="btn btn-success">
                            신청하기
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                  {/*  Nav tabs  */}
                  <Nav className="nav-lt-tab">
                    {["세부내용"].map((item, index) => (
                      <Nav.Item key={index}>
                        <Nav.Link href={`#${item.toLowerCase()}`} eventKey={item.toLowerCase()} className="mb-sm-3 mb-md-0">
                          {item}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Card>
                {/*  Card  */}
                <Card className="rounded-3">
                  {/*  Card body  */}
                  <Card.Body className="p-0">
                    <Tab.Content>
                      <Tab.Pane eventKey="세부내용" className="pb-4 p-4">
                        {/* Description Tab */}
                        <DescriptionTab />
                      </Tab.Pane>
                      {/* <Tab.Pane eventKey="reviews" className="pb-4 p-4">
                  
                        <ReviewsTab />
                      </Tab.Pane>
                      <Tab.Pane eventKey="transcript" className="pb-4 p-4">
                    
                        <TranscriptTab />
                      </Tab.Pane>
                      <Tab.Pane eventKey="faq" className="pb-4 p-4">
                   
                        <FAQTab />
                      </Tab.Pane> */}
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
            <Col xl={4} lg={12} md={12} sm={12}>
              <Card className="mb-3">
                <Card.Body>
                  {/* <GKAccordionProgress accordionItems={CourseIndex} /> */}
                  <img src={CSEE} width="100%" object-fit="contain" />
                </Card.Body>
              </Card>
              <Card className="border-0 mb-3 mb-lg-0">
                {/*  Card body */}
                <Card.Body>
                  <h3 className="mb-0">SW중심대학 지원사업단</h3>
                  <div className="mb-2">김선영</div>
                  <hr className="m-0 mb-2" />
                  <div>T.260-1492</div>
                  <div>E-Mail : pooh8276@handong.edu</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Program;
