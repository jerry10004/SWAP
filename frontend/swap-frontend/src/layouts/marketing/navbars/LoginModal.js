// import node module libraries

import React, { Fragment, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Dropdown, Image, Row, Col, Table, Button } from "react-bootstrap";
import { MoreVertical, Trash, Edit, AlertOctagon, X } from "react-feather";
import { Form, InputGroup } from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
import Logo from "assets/images/OnlyLogo.png";

const FormBuilderModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [report, setReport] = useState([]);
  const { open, close } = props;

  useLayoutEffect(() => {
    console.log("come!!!!!");
    if (props.state === "1") {
      console.log("hello!!!");
      setIsOpen(true);
    }
  }, []);

  function toggleModal(e) {
    console.log("hihihi");
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  const handleClickReport = (e) => {
    console.log(e.target.value);
    setReport(e.target.value);
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const FadingBackground = styled(BaseModalBackground)`
    opacity: ${(props) => props.opacity};
    transition: all 0.3s ease-in-out;
  `;

  const [isLogin, setIsLogin] = useState(false);

  const onSuccess = async (response) => {
    console.log("hihih", response);

    const params = new URLSearchParams();
    params.append("token", response.tokenObj.id_token);
    params.append("name", response.profileObj.name);
    params.append("email", response.profileObj.email);
    params.append("expire", response.tokenObj.expires_at);
    params.append("manageID", window.sessionStorage.getItem("id"));

    const res = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "login", params);
    if (res.data !== "fail") {
      window.sessionStorage.setItem("email", response.profileObj.email);
      // window.sessionStorage.setItem("myname", response.profileObj.email);

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

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <ModalProvider backgroundComponent={FadingBackground}>
        <StyledModal isOpen={open} afterOpen={afterOpen} beforeClose={beforeClose} onBackgroundClick={close} opacity={opacity} backgroundProps={{ opacity }}>
          <div>
            <div className="d-flex flex-column align-items-end">
              <button type="button" class="btn-close" aria-label="Close" onClick={close}></button>
            </div>
            <div className="mb-4 d-flex flex-column align-items-center">
              <Link to="/swap/" className="m-0">
                <Image src={Logo} width="50px" className="mb-4" alt="" />
              </Link>
              <h1 className="mb-1 fw-bold">Sign in</h1>
            </div>
            <Row className="d-flex justify-content-center">
              <Col lg={9} md={9}>
                <span>학생 이신가요? </span>
              </Col>
              <Col lg={9} md={9} className="mb-0 d-grid gap-2">
                <GoogleLogin
                  bsPrefix="btn"
                  className="btn btn-primary shadow-sm mt-3"
                  buttonText="로그인"
                  clientId={process.env.REACT_APP_GOOGLE_LOGIN}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy="single_host_origin"
                  render={(renderProps) => (
                    <>
                      <Button className="btn btn-primary shadow-sm" onClick={renderProps.onClick}>
                        학생 로그인
                      </Button>
                    </>
                  )}
                />
              </Col>
            </Row>

            <Row className="d-flex justify-content-center mt-4">
              <Col lg={9} md={9}>
                <span>선생님이신가요? </span>
              </Col>
              <Col lg={9} md={9} className="mb-0 d-grid gap-2">
                <GoogleLogin
                  bsPrefix="btn"
                  className="btn btn-primary shadow-sm mt-3"
                  buttonText="학생 로그인"
                  clientId={process.env.REACT_APP_GOOGLE_LOGIN}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy="single_host_origin"
                  render={(renderProps) => (
                    <>
                      <Button className="btn btn-success shadow-sm" onClick={renderProps.onClick}>
                        선생님 로그인
                      </Button>
                    </>
                  )}
                />
              </Col>
            </Row>
          </div>
        </StyledModal>
      </ModalProvider>
    </>
  );
};

const StyledModal = Modal.styled`
  width: 30rem;
  height: 27rem;
  padding : 25px;
  border-radius:20px;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

export default FormBuilderModal;
