import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import { Col, Row, Card, Form, Button } from "react-bootstrap";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

var formData = [];

class FormBuilder extends Component {
  constructor(props) {
    super(props);
    formData = props.content;
  }

  fb = createRef();
  componentDidMount() {
    var fbTemplate = document.getElementById("fb-editor");
    var options = {
      disabledActionButtons: ["save", "clear", "data"],
    };

    var formBuilder = $(this.fb.current).formBuilder({ formData }, options);

    document.getElementById("saveData").addEventListener("click", () => {
      console.log("external save clicked");
      const result = formBuilder.actions.save();
      console.log("result:", result);
    });
  }

  render() {
    return (
      <>
        <div id="fb-editor" ref={this.fb} />
        <div class="saveDataWrap" className="d-flex justify-content-end">
          <Button id="saveData" type="button">
            저장
          </Button>
        </div>
      </>
    );
  }
}

export default FormBuilder;
