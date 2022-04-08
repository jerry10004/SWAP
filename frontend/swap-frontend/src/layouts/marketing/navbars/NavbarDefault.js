// import node module libraries
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Image, Navbar, Nav, Container, Form, Dropdown, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";

// import media files
import Logo from "assets/images/SWAPLogo.png";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";

const NavbarDefault = ({ headerstyle }) => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);
  const today = new Date();

  const QuickMenu = () => {
    return (
      <Fragment>
        <Nav>
          <Nav.Link className="h4" href="mypage">
            마이페이지
          </Nav.Link>
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
                  <h5 className="mb-1">{window.sessionStorage.getItem("name")}</h5>
                  <p className="mb-0 text-muted">{window.sessionStorage.getItem("email")}</p>
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
              {/* <i className="fe fe-power me-2"></i> 로그아웃 */}
              <GoogleLogout
                className="nav-title"
                clientId={process.env.REACT_APP_GOOGLE_LOGIN}
                buttonText="Logout"
                render={(renderProps) => (
                  <>
                    <i className="fe fe-power me-2"></i>
                    <span className="" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      로그아웃
                    </span>
                  </>
                )}
                onLogoutSuccess={logout}
              ></GoogleLogout>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  };

  const [isLogin, setIsLogin] = useState(false);
  const onSuccess = async (response) => {
    console.log(response);

    const params = new URLSearchParams();
    params.append("token", response.tokenObj.id_token);
    params.append("name", response.profileObj.name);
    params.append("email", response.profileObj.email);
    params.append("expire", response.tokenObj.expires_at);
    params.append("manageID", window.sessionStorage.getItem("id"));

    const res = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "login", params);
    if (res.data !== "fail") {
      window.sessionStorage.setItem("email", response.profileObj.email);
      window.sessionStorage.setItem("name", response.profileObj.name);
      window.sessionStorage.setItem("token", response.tokenObj.id_token);
      window.sessionStorage.setItem("expires_at", response.tokenObj.expires_at);
      window.sessionStorage.setItem("status", res.data.status);
      window.sessionStorage.setItem("id", res.data.id);
      setIsLogin(true);

      console.log("로그인 성공");
    } else {
      alert("로그인 할 수 없습니다. 관리자에게 문의해주세요.");
      setIsLogin(false);
    }
  };

  const logout = async () => {
    setIsLogin(true);
    const params = new URLSearchParams();
    params.append("email", window.sessionStorage.getItem("email"));
    params.append("manageID", window.sessionStorage.getItem("id"));

    // await axios.post(process.env.REACT_APP_RESTAPI_HOST + "logout", params);

    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      window.sessionStorage.removeItem("email");
      window.sessionStorage.removeItem("name");
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("expires_at");
      window.sessionStorage.removeItem("status");
      window.sessionStorage.removeItem("id");

      setIsLogin(false);
      console.log("로그아웃 성공!!!");
      navigate("/main");
    });
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <Fragment>
      <Navbar
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="lg"
        className={`${isLogin ? "bg-white" : ""} navbar p-2 ${headerstyle === "dark" ? "navbar-dark bg-dark" : "navbar-default py-2"}`}
      >
        <Container fluid className="px-0 ps-2">
          <Navbar.Brand as={Link} to="/">
            <Image src={Logo} alt="" width="120px" />
          </Navbar.Brand>

          <div className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${isLogin ? (isDesktop || isLaptop ? "d-none" : "d-flex") : "d-none"}`}>
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
              {window.sessionStorage.getItem("token") !== null && window.sessionStorage.getItem("expires_at") >= today.getTime() ? (
                <QuickMenu />
              ) : (
                <span className={`ms-auto mt-3 mt-lg-0  ${isLogin ? "d-none" : ""}`}>
                  <GoogleLogin
                    bsPrefix="btn"
                    className="btn btn-primary shadow-sm"
                    buttonText="로그인"
                    clientId={process.env.REACT_APP_GOOGLE_LOGIN}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy="single_host_origin"
                    render={(renderProps) => (
                      <>
                        <Button className="btn btn-primary shadow-sm" onClick={renderProps.onClick}>
                          로그인
                        </Button>
                      </>
                    )}
                  />
                </span>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
  headerstyle: PropTypes.string,
  login: PropTypes.bool,
};

export default NavbarDefault;
