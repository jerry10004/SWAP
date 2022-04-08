import $ from "jquery";
import React, { Component, createRef, useState, useLayoutEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import { Save } from "react-feather";
// import custom components
import axios from "axios";

window.jQuery = $;
window.$ = $;
require("formBuilder/dist/form-render.min.js");

const originalFormData = [
  {
    type: "text",
    label: "Text Field",
    className: "form-control",
    name: "text-1478701075825",
    userData: ["user entered data"],
  },
  {
    type: "checkbox-group",
    label: "Checkbox Group",
    className: "checkbox-group",
    name: "checkbox-group-1478704652409",
    values: [
      {
        label: "Option 1",
        value: "option-1",
        selected: true,
      },
      {
        label: "Option 2",
        value: "option-2",
      },
      {
        label: "Option 3",
        value: "option-3",
        selected: true,
      },
    ],
  },
  {
    type: "select",
    label: "Select",
    className: "form-control",
    name: "select-1478701076382",
    values: [
      {
        label: "Option 1",
        value: "option-1",
        selected: true,
      },
      {
        label: "Option 2",
        value: "option-2",
      },
      {
        label: "Option 3",
        value: "option-3",
      },
    ],
  },
  {
    type: "textarea",
    label: "Text Area",
    className: "form-control",
    name: "textarea-1478701077511",
  },
];

const FormRender = () => {
  const [test, setTest] = useState(0);

  useLayoutEffect(() => {
    //console.log(props.param2.id);
    componentDidMount();
    readFormData(1);
  }, []);

  const componentDidMount = async () => {
    const getUserDataBtn = document.getElementById("get-user-data");
    const fbRender = document.getElementById("fb-render");
    const formData = JSON.stringify(originalFormData);

    $(fbRender).formRender({ formData });
    getUserDataBtn.addEventListener(
      "click",
      () => {
        console.log(window.JSON.stringify($(fbRender).formRender("userData")));
        window.alert("신청이 완료되었습니다.");
      },
      false
    );
  };

  const readFormData = () => {
    setTest(1);
    console.log(test);
  };

  // const readFormData = async (id) => {
  //   //setFormDataLoading(false);
  //   //const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + id);
  //   console.log("read form");
  //   //setoriginalFormData(response.data);
  //   //setFormDataLoading(true);
  // };
  // render() {
  return (
    <div>
      <form id="fb-render"></form>
      <div className="d-flex justify-content-end">
        <Button className="btn btn-success" id="get-user-data">
          신청하기
        </Button>
      </div>
    </div>
  );
  // }
};
export default FormRender;
