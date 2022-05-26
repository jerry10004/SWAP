// import $ from "jquery";
// import React, { Component, createRef } from "react";
// import "./formBuilder.css";

// window.jQuery = $;
// window.$ = $;

// require("jquery-ui-sortable");
// require("formBuilder");

// var formData = [];

// class FormBuilderRead extends Component {
//   constructor(props) {
//     super(props);
//     formData = props.content;
//     this.state = {
//       modalOpen: 0,
//       isOpen: false,
//       opacity: 0,
//       formResult: "",
//       title: "",
//     };
//   }

//   fb = createRef();

//   componentDidMount() {
//     var fbTemplate = document.getElementById("fb-editor");
//     var options = {
//       disabledActionButtons: ["save", "clear", "data"],
//     };
//     console.log("******** ", formData);

//     var formBuilder = $(this.fb.current).formRender({ formData });
//   }

//   render() {
//     return (
//       <>
//         <div id="fb-editor" ref={this.fb} />
//       </>
//     );
//   }
// }

// export default FormBuilderRead;

import $ from "jquery";
import { useNavigate } from "react-router-dom";
import React, { Component, createRef, useState, useEffect, useLayoutEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import { Save } from "react-feather";
// import custom components
import axios from "axios";
import "./formBuilder.css";

window.jQuery = $;
window.$ = $;
require("formBuilder/dist/form-render.min.js");

const FormRender = (props) => {
  const navigate = useNavigate();
  console.log("props id", props.param.programid, props.param.userid);
  const [test, setTest] = useState(0);
  const [originalFormData, setoriginalFormData] = useState([]);
  const [readyFormContent, setReadyFormContent] = useState([]);
  var programID = parseInt(props.param.programid);
  var userID = parseInt(props.param.userid);
  var formRenderInstance = "";
  useLayoutEffect(() => {
    readFormData(programID);
  }, []);

  useEffect(() => {
    componentDidMount();
  }, [originalFormData]);

  const componentDidMount = async () => {
    const getUserDataBtn = document.getElementById("get-user-data");
    const fbRender = document.getElementById("fb-render");
    const formData = JSON.stringify(originalFormData);

    formRenderInstance = $(fbRender).formRender({ formData });
    getUserDataBtn.addEventListener(
      "click",
      () => {
        // console.log(window.JSON.stringify($(fbRender).formRender("userData")));
        console.log(formRenderInstance.userData);
        addFormData();
      },

      false
    );
  };

  const readFormData = async (id) => {
    console.log("id", id);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "application/readApplicationForm/" + id);
    console.log(response.data[0].content);
    var json_total = response.data[0].content;
    var json_sub = json_total.slice(1, json_total.length - 1);
    console.log(json_sub);
    var arr = JSON.parse("[" + json_sub + "]");
    console.log(arr);
    setoriginalFormData(arr);
    console.log(originalFormData);
  };

  const addFormData = async () => {
    var params = new URLSearchParams();
    params.append("program_id", programID);
    params.append("user_id", userID);
    params.append("content", JSON.stringify(formRenderInstance.userData));
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "applicant/apply", params);

    console.log(JSON.stringify(formRenderInstance.userData));
    alert(" 프로그램이 신청 되었습니다.");
    navigate("/swap/mypage");
  };

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
