// import node module libraries
import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import styled, { css } from "styled-components";

// import media files
import Logo from "assets/images/OnlyLogo.png";
import SignUpStudent from "../layouts/form/SignUpStudent";
import SignUpAdmin from "../layouts/form/SignUpAdmin";

const SignUp = () => {
  const location = useLocation();
  const [registerForm, setRegisterForm] = useState("student");
  const onChangeValue = (event) => {
    console.log(location.state.tokenObj.expires_at);
    setRegisterForm(event.target.value);
  };

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-3 ">
                <Link to="/">
                  <Image src={Logo} width="50px" className="mb-4" alt="" />
                </Link>
                <h1 className="fw-bold">Sign Up</h1>
              </div>
              <div className="d-flex mb-3" onChange={onChangeValue}>
                <div className="me-5">
                  <input type="radio" value="student" name="gender" defaultChecked /> 학생으로 등록
                </div>
                <div>
                  <input type="radio" value="teacher" name="gender" /> 관리자로 등록
                </div>
              </div>
              {registerForm === "student" ? (
                <div>
                  <SignUpStudent name={location.state.data.name} email={location.state.data.email} tokenObj={location.state.tokenObj} />
                </div>
              ) : (
                <div>
                  <SignUpAdmin name={location.state.data.name} email={location.state.data.email} tokenObj={location.state.tokenObj} />
                </div>
              )}

              <hr className="my-4" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignUp;
