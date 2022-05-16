import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import { Col, Row, Card, Form, Button, InputGroup } from "react-bootstrap";
import FormBuilderModal from "./FormBuilderModal";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./formBuilder.css";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

var formData = [];

class FormBuilder extends Component {
  constructor(props) {
    super(props);
    formData = props.content;
    props.propFunction(this.isSet);
    this.state = {
      modalOpen: 0,
      isOpen: false,
      opacity: 0,
      formResult: "",
      title: "",
      isSet: false,
    };
  }

  fb = createRef();
  componentDidMount() {
    var fbTemplate = document.getElementById("fb-editor");
    var options = {
      disabledActionButtons: ["save", "clear", "data"],
    };

    var formBuilder = $(this.fb.current).formBuilder({ formData });

    document.getElementById("saveData").addEventListener("click", () => {
      console.log("external save clicked");
      const result = formBuilder.actions.save();
      // this.setState({ formResult: result });
      this.setState({ formResult: JSON.stringify(result, null, 2) });
      console.log("result:", result);
      console.log("formResult:", this.state.formResult);
    });
    document.getElementById("clear-all-fields").onclick = function () {
      if (window.confirm("Do you want to remove all fields?") == true) {
        formBuilder.actions.clearFields();
      }
    };
  }

  //  this.state = {
  //       modalOpen: false,
  //   }

  // openModal = () => {
  //   this.setState({ modalOpen: true });
  // };
  // closeModal = () => {
  //   this.setState({ modalOpen: false });
  // };

  modalState = () => {
    this.setState({ modalOpen: 1 });
    this.setState({ isOpen: true });
    console.log("save!!");
    console.log(this.state.modalOpen);
    console.log(this.state.isOpen);
  };

  // toggleModal(e) {
  //   console.log("hihihi");
  //   setOpacity(0);
  //   setIsOpen(!isOpen);
  // }

  afterOpen = () => {
    setTimeout(() => {
      this.setState({ opacity: 1 });
    }, 100);
  };

  beforeClose = () => {
    return new Promise((resolve) => {
      this.setState({ opacity: 1 });
      setTimeout(resolve, 300);
    });
  };

  toggleModal = (e) => {
    console.log("hihihi");
    this.setState({ opacity: 1, isOpen: false });
  };

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  createApplication = async () => {
    var params = new URLSearchParams();
    params.append("name", this.state.title);
    params.append("content", this.state.formResult);

    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "application/add", params);
    alert(" 저장 되었습니다.");
    this.setState({ opacity: 1, isOpen: false });
    this.setState({ isSet: true });
  };

  render() {
    return (
      <>
        <div id="fb-editor" ref={this.fb} />
        <div class="saveDataWrap" className="d-flex justify-content-end">
          <Button id="clear-all-fields" variant="danger" type="button" className="mt-3 me-3">
            Clear
          </Button>
          <Button id="saveData" type="button" className="mt-3" onClick={this.modalState}>
            Save
          </Button>

          {this.state.isOpen ? (
            <>
              <ModalProvider backgroundComponent={FadingBackground}>
                <StyledModal
                  isOpen={this.state.isOpen}
                  afterOpen={this.afterOpen}
                  beforeClose={this.beforeClose}
                  onBackgroundClick={this.toggleModal}
                  onEscapeKeydown={this.toggleModal}
                  opacity={this.opacity}
                  backgroundProps={this.opacity}
                >
                  <div>
                    <button type="button" class="btn-close" aria-label="Close" onClick={this.toggleModal}></button>

                    <Form className="mt-2">
                      <Row>
                        <Col xs={12} className="mt-6">
                          <Form.Group controlId="formProjectTitle">
                            <Form.Label>
                              저장할 신청서 이름을 입력해주세요. <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter application title" required onChange={this.handleChange} />
                          </Form.Group>
                        </Col>
                        <Col xs={12} className="mt-6 d-flex justify-content-end">
                          <Button variant="primary" type="button" className="ms-2" onClick={this.createApplication}>
                            저장
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </StyledModal>
              </ModalProvider>
            </>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default FormBuilder;

const StyledModal = Modal.styled`
  width: 22rem;
  height: 18rem;
  padding : 20px;
  border-radius:20px;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;
