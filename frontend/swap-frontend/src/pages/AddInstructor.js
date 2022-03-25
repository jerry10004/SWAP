// import node module libraries
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Breadcrumb, Card, Button, Form } from "react-bootstrap";
import axios from "axios";

// import sub components
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";

const AddInstructor = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [addName, setAddName] = useState(null);
  const [addEmail, setAddEmail] = useState(null);
  const [addPhone, setAddPhone] = useState(null);

  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  const createAdministrator = async () => {
    var params = new URLSearchParams();
    params.append("name", addName);
    params.append("email", addEmail);
    params.append("phone", addPhone);

    if (window.confirm("관리자를 추가하시겠습니까?")) {
      const response = await axios.post(
        "http://localhost:8080/swap/admin/add", //[loginID]로그인 후 변경
        params
      );
      alert("추가 되었습니다");
      //   readAdministrator();
    }
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
                    <h1 className="mb-1 h2 fw-bold">관리자 추가</h1>
                    <Breadcrumb>
                      <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>
                      <Breadcrumb.Item href="#">Instructor</Breadcrumb.Item>
                      <Breadcrumb.Item active>Add New Instructor</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div>
                    <Link to="/admin/instructor" className="btn btn-outline-white">
                      Back
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xl={9} lg={8} md={12} sm={12}>
                <Card>
                  <Card.Header>
                    <h4 className="mb-0">관리자 정보</h4>
                  </Card.Header>
                  <Card.Body>
                    {/*  Form  */}
                    <Form className="mt-4">
                      <Row>
                        <Col md={9} sm={12}>
                          {/* Title  */}
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="postTitle">Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Name"
                              id="Name"
                              onChange={(e) => {
                                setAddName(e.target.value);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="postTitle">Email</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Email"
                              id="Email"
                              onChange={(e) => {
                                setAddEmail(e.target.value);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="postTitle">Phone</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Phone"
                              id="Phone"
                              onChange={(e) => {
                                setAddPhone(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={12} md={12} sm={12}>
                          {/* button */}
                          <Form.Group className="mb-3">
                            <Button
                              variant="primary"
                              className="m-1"
                              onClick={() => {
                                createAdministrator();
                              }}
                            >
                              Save
                            </Button>
                            {/* <Button variant="outline-white">Save to Draft</Button> */}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddInstructor;
