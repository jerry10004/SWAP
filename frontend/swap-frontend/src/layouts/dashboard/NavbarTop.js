import { Fragment, useLayoutEffect, useState } from "react";
import { Menu } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import NavbarProfile from "layouts/marketing/navbars/NavbarProfile";

const NavbarTop = (props) => {
  useLayoutEffect(() => {
    // var ID = readUserInformation(window.sessionStorage.getItem("id"));
    // readUserInformation(ID);
  }, []);

  const readUserInformation = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
  };
  const navigate = useNavigate();

  const logout = async () => {
    // setIsLogin(true);
    const params = new URLSearchParams();
    params.append("email", window.sessionStorage.getItem("email"));
    params.append("manageID", window.sessionStorage.getItem("id"));

    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      window.sessionStorage.removeItem("email");
      window.sessionStorage.removeItem("name");
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("expires_at");
      window.sessionStorage.removeItem("status");
      window.sessionStorage.removeItem("id");
      window.sessionStorage.removeItem("profileImg");

      // setIsLogin(false);
      console.log("로그아웃 성공!!!");
      navigate("/swap/main");
    });
  };

  return (
    <Fragment>
      <Navbar expanded="lg" className="navbar-default">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Link id="nav-toggle" to="#" onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}>
              <Menu size="18px" />
            </Link>
            {/* <div className="ms-lg-3 d-none d-md-none d-lg-block">
              <Form className=" d-flex align-items-center">
                <InputGroup className="input-group-merge search-bar" bsPrefix="group-of-input">
                  <InputGroup.Text className="ps-2 pe-1 mx-2 my-1 h-40 position-absolute search-icon border-0">
                    <Search size="12px" className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control type="search" className="form-control form-control-sm ps-6" placeholder="전체 검색하기" />
                </InputGroup>
              </Form>
            </div>*/}
          </div>

          <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex align-items-center nav-top-wrap">
            <NavbarProfile logout={logout} />
          </Nav>
        </div>
      </Navbar>
    </Fragment>
  );
};

export default NavbarTop;
