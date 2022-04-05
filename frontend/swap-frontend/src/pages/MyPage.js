// import node module libraries
import React, { Fragment } from "react";
import { Col, Row, Card, Nav, Tab, Breadcrumb } from "react-bootstrap";

// import sub components
import PostsTable from "components/dashboard/PostsTable";

// import data files
import { allposts, allPublishedPosts, allScheduledPosts } from "data/courses/AllPostsData";

// import layouts
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import Footer from "layouts/marketing/Footer";

const MyPage = () => {
  return (
    <Fragment>
      <NavbarDefault login />
      <div className="container-fluid p-4">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">마이페이지</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="#">마이페이지</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">참여 프로그램</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12}>
            <Tab.Container defaultActiveKey="all">
              <Card>
                <Card.Header className="border-bottom-0 p-0 bg-white">
                  <Nav className="nav-lb-tab  fs-4">
                    <Nav.Item>
                      <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                        대기
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="published" className="mb-sm-3 mb-md-0">
                        진행
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="scheduled" className="mb-sm-3 mb-md-0">
                        종료
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body className="p-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="all" className="pb-0">
                      <PostsTable table_data={allposts} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="published" className="pb-0">
                      <PostsTable table_data={allPublishedPosts} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="scheduled" className="pb-4">
                      <PostsTable table_data={allScheduledPosts} />
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Tab.Container>
          </Col>
        </Row>
      </div>
      <Footer />
    </Fragment>
  );
};

export default MyPage;
