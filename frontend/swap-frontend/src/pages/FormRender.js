import $, { map } from "jquery";
import { useNavigate } from "react-router-dom";
import React, { Component, createRef, useState, useEffect, useLayoutEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import { Save } from "react-feather";
// import custom components
import axios from "axios";
import "./formBuilder.scss";

window.jQuery = $;
window.$ = $;
require("formBuilder/dist/form-render.min.js");

const FormRender = (props) => {
  const navigate = useNavigate();
  console.log("props id", props.param.programid, props.param.userid, props.param.daysleft, props.param.quotaleft);
  const [test, setTest] = useState(0);
  const [originalFormData, setoriginalFormData] = useState([]);
  const [readyFormContent, setReadyFormContent] = useState([]);
  const [applicantData, setapplicantData] = useState();

  var programID = parseInt(props.param.programid);
  var userID = parseInt(props.param.userid);
  var formRenderInstance = "";
  var formInformation = "";

  useLayoutEffect(() => {
    readFormData(programID);
    readApplicantData(programID, userID);
  }, []);

  var params = new URLSearchParams();

  useEffect(() => {
    componentDidMount();
  }, [originalFormData, applicantData]);

  const componentDidMount = () => {
    const getUserDataBtn = document.getElementById("get-user-data");
    const fbRender = document.getElementById("fb-render");
    const formData = JSON.stringify(originalFormData);

    formRenderInstance = $(fbRender).formRender({ formData });

    getUserDataBtn.addEventListener(
      "click",
      () => {
        formInformation = formRenderInstance.userData;
        addFormData();
      },
      false
    );
  };

  const readFormData = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "application/readApplicationForm/" + id);
    var json_total = response.data[0].content;
    var json_sub = json_total.slice(1, json_total.length - 1);
    var arr = JSON.parse("[" + json_sub + "]");
    setoriginalFormData(arr);
  };

  const readApplicantData = async (programID, userID) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/" + programID + "/applicants/" + userID);
    setapplicantData(response.data);
  };

  const addFormData = async () => {
    var params = new URLSearchParams();
    params.append("program_id", programID);
    params.append("user_id", userID);
    params.append("content", JSON.stringify(formInformation));

    if (props.param.daysleft === false && props.param.count === 0) {
      alert("신청기간이 마감되어서 신청 하실 수 없습니다.");
      navigate("/main");
      props.param.count++;
    } else if (props.param.quotaleft == false && props.param.count === 0) {
      alert("신청인원이 꽉 차서 신청 하실 수 없습니다.");
      navigate("/main");
      props.param.count++;
    } else {
      console.log(props.param.count);
      if (applicantData.length > 0 && props.param.count === 0) {
        alert("이미 신청된 프로그램입니다.");
        navigate("/main");
        props.param.count++;
        console.log(props.param.count);
      } else {
        if (formInformation.length > 0 && props.param.count === 0) {
          const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "applicant/apply", params);
          alert(" 프로그램이 신청 되었습니다.");
          navigate("/mypage");
          props.param.count = props.param.count + 1;
        }
      }
    }
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
