// import node module libraries
import { Fragment } from "react";
import { Menu, Search } from "react-feather";
import { Link } from "react-router-dom";
import { Nav, Navbar, InputGroup, Dropdown, Form, ListGroup, Row, Col, OverlayTrigger, Tooltip, Image } from "react-bootstrap";

// import custom components

// import media files
import Avatar1 from "assets/images/avatar/avatar-1.jpg";

// import data files

const NavbarTop = (props) => {
  return (
    <Fragment>
      <Navbar expanded="lg" className="navbar-default">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Link id="nav-toggle" to="#" onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}>
              <Menu size="18px" />
            </Link>
            <div className="ms-lg-3 d-none d-md-none d-lg-block">
              {/* <!-- Form --> */}
              <Form className=" d-flex align-items-center">
                <InputGroup className="input-group-merge search-bar" bsPrefix="group-of-input">
                  <InputGroup.Text className="ps-2 pe-1 mx-2 my-1 h-40 position-absolute search-icon border-0">
                    <Search size="12px" className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control type="search" className="form-control form-control-sm ps-6" placeholder="전체 검색하기" />
                </InputGroup>
              </Form>
            </div>
          </div>

          <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex align-items-center nav-top-wrap">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} bsPrefix="dt" className="rounded-circle border-bottom-0" id="dropdownUser">
                <div className="avatar avatar-md avatar-indicators avatar-online">
                  <Image alt="avatar" src={Avatar1} className="rounded-circle" />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown dropdown-menu-end mt-4 py-0" aria-labelledby="dropdownUser" align="end">
                <Dropdown.Item className="mt-3">
                  <div className="d-flex">
                    <div className="avatar avatar-md avatar-indicators avatar-online">
                      <Image alt="avatar" src={Avatar1} className="rounded-circle" />
                    </div>
                    <div className="ms-3 lh-1">
                      <h5 className="mb-1">Annette Black</h5>
                      <p className="mb-0 text-muted">annette@geeksui.com</p>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2">
                  <i className="fe fe-user me-2"></i> Profile
                </Dropdown.Item>
                <Dropdown.Item eventKey="3">
                  <i className="fe fe-star me-2"></i> Subscription
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="fe fe-settings me-2"></i> Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="mb-3">
                  <i className="fe fe-power me-2"></i> Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Navbar>
    </Fragment>
  );
};

export default NavbarTop;
