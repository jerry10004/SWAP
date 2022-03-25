// import node module libraries
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LinkIcon from "react-feather/dist/icons/link";
import ImageIcon from "react-feather/dist/icons/image";
import { Trash, XCircle, Copy, Video } from "react-feather";
import { Col, Row, Breadcrumb, Card, Button, Form, InputGroup, FormControl, ListGroup, Image, Badge } from "react-bootstrap";

// import custom components
import { FormSelect } from "components/elements/form-select/FormSelect";

// import media files
import Avatar1 from "assets/images/avatar/avatar-1.jpg";

// import sub components
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";

const AddInstructor = () => {
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  const initialValue = `<h4>One Ring to Rule Them All</h4>
  <br />
  <p>
  Three Rings for the
  <i> Elven-kingsunder</i> the sky, <br />
  Seven for the <u>Dwarf-lords</u> in halls of stone,
  Nine for Mortal Men, <br />
  doomed to die, One for the Dark Lord on his dark
  throne. <br />
  In the Land of Mordor where the Shadows lie.
  <br />
  <br />
  </p>
  <p>
  One Ring to
  <b>rule</b> them all, <br />
  One Ring to find them, <br />
  One Ring to bring them all and in the darkness bind
  them. <br />
  In the Land of Mordor where the Shadows lie.
  </p>
  <p>
  <br />
  </p>`;

  const categoryOptions = [
    { value: "course", label: "Course" },
    { value: "post-category", label: "Post Category" },
    { value: "workshop", label: "Workshop" },
    { value: "marketing", label: "Marketing" },
  ];

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
                            <Form.Control type="text" placeholder="Name" id="Name" />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="postTitle">Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" id="Email" />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="postTitle">Phone</Form.Label>
                            <Form.Control type="text" placeholder="Phone" id="Phone" />
                          </Form.Group>
                        </Col>

                        <Col lg={12} md={12} sm={12}>
                          {/* button */}
                          <Form.Group className="mb-3">
                            <Button variant="primary" className="m-1">
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
