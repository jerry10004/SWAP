// import node module libraries
import { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image, Label } from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from "react-google-login";
// import media files
import Logo from "assets/images/OnlyLogo.png";

import GoogleButton from "components/GoogleButton";

const SignIn = () => {
  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/" className="m-0">
                  <Image src={Logo} width="50px" className="mb-4" alt="" />
                </Link>
                <h1 className="mb-1 fw-bold">Sign in</h1>
                {/* <span>
                  Don’t have an account?{" "}
                  <Link to="/authentication/sign-up" className="ms-1">
                    Sign up
                  </Link>
                </span> */}
              </div>
              {/* Form */}
              <Row className="d-flex justify-content-center">
                <Col lg={9} md={9} className="mb-3">
                  <span>학생이신가요? </span>
                </Col>
                <Col lg={9} md={9} className="mb-0 d-grid gap-2">
                  <GoogleLogin
                    buttonText="구글로 로그인하기"
                    clientId="clientID1234"
                    // onSuccess={this.responseGoogleSuccess}
                    // onFailure={this.responseGoogleError}
                    // isSignedIn={true}
                    // cookiePolicy={"single_host_origin"}
                  />
                </Col>
                <hr className="my-4" />
                <Col lg={9} md={9} className="mb-3">
                  <span>관리자이신가요?</span>
                </Col>
                <Col lg={9} md={9} className="mb-0 d-grid gap-2">
                  <GoogleLogin
                    clientId="clientID1sdkf"
                    // onSuccess={this.responseGoogleSuccess}
                    // onFailure={this.responseGoogleError}
                    // isSignedIn={true}
                    // cookiePolicy={"single_host_origin"}
                    buttonText="구글로 로그인하기"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignIn;
