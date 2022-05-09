// import node module libraries
import { Fragment, useLayoutEffect, useState } from "react";
import { Menu, Search } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, InputGroup, Dropdown, Form, ListGroup, Row, Col, OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";

// import custom components

// import media files
import Avatar1 from "assets/images/avatar/avatar-1.jpg";

// import data files

const NavbarProfile = ({ logout }) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState();
  const [userName, setUserName] = useState();
  const [userInformationLoading, setUserInformationLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useLayoutEffect(() => {
    var ID = readUserInformation(window.sessionStorage.getItem("id"));
    readUserInformation(ID);
  }, []);

  const readUserInformation = async (id) => {
    setUserInformationLoading(false);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    setUserName(response.data[0].name);
    setUserEmail(response.data[0].email);
    setUserInformationLoading(true);
  };

  return (
    <Fragment>
      <Dropdown as={Nav.Item}>
        <Dropdown.Toggle as={Nav.Link} bsPrefix="dt" className="rounded-circle border-bottom-0" id="dropdownUser">
          <div className="avatar avatar-md avatar-indicators avatar-online">
            <Image src={window.sessionStorage.getItem("profileImg")} className="rounded-circle" />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dashboard-dropdown dropdown-menu-end mt-4 py-0" aria-labelledby="dropdownUser" align="end">
          <Dropdown.Item className="mt-3">
            <div className="d-flex">
              <div className="avatar avatar-md avatar-indicators avatar-online">
                <Image src={window.sessionStorage.getItem("profileImg")} className="rounded-circle" />
              </div>
              {userInformationLoading ? (
                <div className="ms-3 lh-1">
                  <h5 className="mb-1">{userName}</h5>
                  <p className="mb-0 text-muted">{userEmail}</p>

                  {/* <h5 className="mb-1">{window.sessionStorage.getItem("name")}</h5>
                        <p className="mb-0 text-muted">{window.sessionStorage.getItem("email")}</p> */}
                </div>
              ) : (
                ""
              )}
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          {/* <Dropdown.Item eventKey="2">
                  <i className="fe fe-user me-2"></i> 프로필
                </Dropdown.Item> */}
          <Dropdown.Item>
            <i className="fe fe-settings me-2"></i> <Link to="/mypage">설정</Link>
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

export default NavbarProfile;
