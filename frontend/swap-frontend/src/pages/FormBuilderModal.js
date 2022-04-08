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

const FormBuilderModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [report, setReport] = useState([]);

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

  return (
    <>
      <ModalProvider backgroundComponent={FadingBackground}>
        <StyledModal isOpen={isOpen} afterOpen={afterOpen} beforeClose={beforeClose} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal} opacity={opacity} backgroundProps={{ opacity }}>
          <div>
            <button type="button" class="btn-close" aria-label="Close" onClick={toggleModal}></button>

            <Form className="mt-2">
              <Row>
                {/* Project's Name */}
                <Col xs={12} className="mt-6">
                  <Form.Group controlId="formProjectTitle">
                    <Form.Label>
                      저장할 신청서 이름을 입력해주세요. <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter application title" required />
                  </Form.Group>
                </Col>
                <Col xs={12} className="mt-6 d-flex justify-content-end">
                  <Button variant="primary" type="submit" className="ms-2">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </StyledModal>
      </ModalProvider>
    </>
  );
};

const StyledModal = Modal.styled`
  width: 22rem;
  height: 18rem;
  padding : 20px;
  border-radius:20px;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

export default FormBuilderModal;
