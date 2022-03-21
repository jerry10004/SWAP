// import node module libraries
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col, Image, Navbar, Nav, NavDropdown, Container, Form, Dropdown, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

// simple bar scrolling used for notification item scrolling
// import SimpleBar from "simplebar-react";
// import "simplebar/dist/simplebar.min.css";

// import custom components
import DotBadge from "components/elements/bootstrap/DotBadge";

// import media files
import Logo from "assets/images/brand/logo/logo.svg";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";

// import data files
// import NotificationList from "data/Notification";
import NavDropdownMain from "layouts/marketing/navbars/NavDropdownMain";

const NavbarDefault = ({ headerstyle, login }) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);

  const QuickMenu = () => {
    return (
      <Fragment>
        <Nav>
          <Nav.Link href="mypage">마이페이지</Nav.Link>
        </Nav>

        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle as={Nav.Link} bsPrefix="dt" className="rounded-circle border-bottom-0" id="dropdownUser">
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image alt="avatar" src={Avatar1} className="rounded-circle" />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu show={isDesktop ? true : false} className="dashboard-dropdown dropdown-menu-end mt-4 py-0" aria-labelledby="dropdownUser" align="end">
            <Dropdown.Item className="mt-3">
              <div className="d-flex">
                <div className="avatar avatar-md">
                  <Image alt="avatar" src={Avatar1} className="rounded-circle" />
                </div>
                <div className="ms-3 lh-1">
                  <h5 className="mb-1">정수산나학부생</h5>
                  <p className="mb-0 text-muted">sanna422@handong.ac.kr</p>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="2">
              <i className="fe fe-user me-2"></i> 프로필
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fe fe-settings me-2"></i> 세팅
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="mb-3">
              <i className="fe fe-power me-2"></i> 로그아웃
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Navbar
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="lg"
        className={`${login ? "bg-white" : ""} navbar p-2 ${headerstyle === "dark" ? "navbar-dark bg-dark" : "navbar-default py-2"}`}
      >
        <Container fluid className="px-0 ps-2">
          <Navbar.Brand as={Link} to="/">
            <Image src={Logo} alt="" />
          </Navbar.Brand>
          <div className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${login ? (isDesktop || isLaptop ? "d-none" : "d-flex") : "d-none"}`}>
            <QuickMenu />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Search Form */}
            <Form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control type="Search" id="formSearch" className="ps-6" placeholder="Search Courses" />
            </Form>
            {/* Right side quick / shortcut menu  */}

            <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
              <span className={`ms-auto mt-3 mt-lg-0  ${login ? "d-none" : ""}`}>
                <Nav.Link as={Link} to="#" bsPrefix="btn" className="btn btn-white shadow-sm me-2">
                  로그인
                </Nav.Link>
                <Nav.Link as={Link} to="#" bsPrefix="btn" className="btn btn-primary shadow-sm">
                  회원가입
                </Nav.Link>
              </span>

              <span className={`${login ? (isDesktop || isLaptop ? "d-flex" : "d-none") : "d-none"}`}>
                <QuickMenu />
              </span>
            </Nav>
            {/* end of right side quick / shortcut menu  */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

// Specifies the default values for props
NavbarDefault.defaultProps = {
  headerstyle: "navbar-default",
  login: false,
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
  headerstyle: PropTypes.string,
  login: PropTypes.bool,
};

export default NavbarDefault;
