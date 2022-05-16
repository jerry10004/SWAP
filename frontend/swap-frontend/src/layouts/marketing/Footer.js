// import node module libraries
import React from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

const Footer = ({ bgColor }) => {
  return (
    <Fragment>
      <div className={`footer ${bgColor}`}>
        <Container>
          <Row className="align-items-center g-0 border-top py-2">
            {/* Desc */}
            <Col md={6} sm={12} className="text-center text-md-start">
              <span>© 2022 SWAP. All Rights Reserved.</span>
            </Col>
            {/* Links */}
            <Col md={6} sm={12}>
              <nav className="nav nav-footer justify-content-center justify-content-md-end">
                <Link className="nav-link active ps-0" to="#">
                  About
                </Link>
                <Link className="nav-link" to="/terms-and-conditions">
                  서비스 이용약관{" "}
                </Link>
                <Link className="nav-link" to="/personal-information">
                  개인정보처리방침
                </Link>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

// Specifies the default values for props
Footer.defaultProps = {
  bgColor: "bg-transparent",
};

// Typechecking With PropTypes
Footer.propTypes = {
  bgColor: PropTypes.string,
};

export default Footer;
