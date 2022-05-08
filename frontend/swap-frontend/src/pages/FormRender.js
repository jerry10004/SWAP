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

  const [test, setTest] = useState(0);
  const [originalFormData, setoriginalFormData] = useState([]);
  const [isformRender, setisFormRender] = useState(false);
  const [readyFormContent, setReadyFormContent] = useState([]);
  const [applicantData, setapplicantData] = useState([]);
  const [canApply, setcanApply] = useState(true);
  const [applicantInformation, setApplicantInformation] = useState(null);

  var programID = parseInt(props.param.programid);
  var userID = parseInt(props.param.userid);
  var status = parseInt(props.param.Status);
  var formRenderInstance = "";
  var formInformation = "";
  var Componentvar = 0;

  useLayoutEffect(() => {
    readFormData(programID);
    readApplicantData(programID, userID);
    readApplicantInformation(userID);
  }, []);

  useEffect(() => {
    componentDidMount();
  }, [originalFormData]);

  var params = new URLSearchParams();

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
    setisFormRender(true);
    //componentDidMount();
  };

  const readApplicantData = async (programID, userID) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/" + programID + "/applicants/" + userID);

    if (response.data.length === 0) {
      setcanApply(true);
    } else {
      setcanApply(false);
    }
  };

  const readApplicantInformation = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    setApplicantInformation(response.data);
  };

  const displayAlert = async (message) => {
    alert(message);
  };

  const addFormData = async () => {
    var isFilled = true;
    var params = new URLSearchParams();
    params.append("program_id", programID);
    params.append("user_id", userID);
    params.append("content", JSON.stringify(formInformation));

    if (props.param.count === 0) {
      if (status === 0) {
        props.param.count = props.param.count + 1;
        displayAlert("관리자는 프로그램을 신청하실 수 없습니다.");
        navigate("/main");
      } else {
        // if (canApply === false && props.param.count === 0) {
        //   displayAlert("이미 신청된 프로그램입니다.");
        //   navigate("/main");
        //   props.param.count++;
        // } else {
        for (var i = 0; i < formInformation.length; i++) {
          if (formInformation[i].userData[0] === "" && formInformation[i].required === true && props.param.count === 0) {
            isFilled = false;
            displayAlert("필수 항목을 입력하세요! : " + formInformation[i].label);
            break;
          }
        }

        if (isFilled && props.param.count === 0) {
          if (formInformation.length > 0 && props.param.count === 0) {
            const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "applicant/apply", params);

            displayAlert(" 프로그램이 신청 되었습니다.");
            navigate("/mypage");
            props.param.count = props.param.count + 1;
          }
        }
        // }
      }
    }
  };

  return (
    <>
      {/* {isformRender ? ( */}
      <div>
        <form id="fb-render"></form>
        <div className="d-flex justify-content-end">
          <Button className="btn btn-success" id="get-user-data">
            신청하기
          </Button>
        </div>
      </div>
      {/*
      ) : (
        <>""</>
      )} */}
    </>
  );
  // }
};
export default FormRender;
