// import node module libraries
import { Col, Row, Card, Tab, Form, Button, Container } from "react-bootstrap";
import { FormSelect } from "components/elements/form-select/FormSelect";
import React, { Fragment, useState, useLayoutEffect } from "react";
import axios from "axios";
import Element from "json/Element";
import ElementCreate from "json/ElementCreate";
import jsonSkeleton from "json/jsonSkeleton.json";
import FormBuilder from "./FormBuilder";
import { Link, useNavigate } from "react-router-dom";
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";
const AddTemplate = (props) => {
  const [showMenu, setShowMenu] = useState(true);
  const [applicationName, setApplicationName] = useState();

  const { submit, previous } = props;
  const [readyJson, setReadyJson] = useState(false);
  const [createJson, setCreateJson] = useState(false);
  const [createElement, setCreateElement] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [json, setJson] = useState(null);
  const [elementOption, setElementOption] = useState(0);
  const [obj, setObj] = useState();
  const [individual, setIndividual] = useState(false);
  var formOption = 0;
  const [formContent, setFormContent] = useState();
  const [readyFormContent, setReadyFormContent] = useState(false);
  const [readyElementOption, setReadyElementOption] = useState(false);
  const [formData, setFormData] = useState({
    program_title: "Title",
    program_category: "1",
    program_description: "Hello, world!",
    program_quota: "0",
    program_img: "img",
    start_date: "",
    end_date: "",
    Applystart_date: "",
    Applyend_date: "",
    manager_name: "",
    manager_contact: "",
    application_form: "",
    poster: "",
  });

  //   const { handleChange } = props;
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const highFunction = (isSet) => {
    // console.log("isSet", isSet);
  };

  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  const submitButton = (form) => {
    props.submit(form);
  };

  useLayoutEffect(() => {
    readApplication();
    readJson();
    setJson(jsonSkeleton);
  }, []);

  // const templateOptions = [
  //   { value: "1", label: "대회" },
  //   { value: "2", label: "봉사" },
  //   { value: "3", label: "캠프" },
  //   { value: "4", label: "동아리" },
  //   { value: "5", label: "행사" },
  //   { value: "6", label: "기타" },
  //   { value: "7", label: "직접생성" },
  // ];
  const [templateOptions, setTemplateOptions] = useState([]);

  const elementOptions = [
    { value: "1", label: "Text" },
    { value: "2", label: "Email" },
    { value: "3", label: "Password" },
    { value: "4", label: "Textarea" },
    { value: "5", label: "Select" },
    { value: "6", label: "CheckButton" },
    { value: "7", label: "RadioButton" },
    { value: "8", label: "File" },
    { value: "9", label: "개인정보활용동의" },
  ];

  const handleChange2 = (event) => {
    formOption = event.target.value;
    handleChange(event);
    readJson();
  };

  const elementChange = (elementEvent) => {
    setCreateElement(false);
    setElementOption(elementEvent.target.value);
  };

  const save = (event) => {};

  //DB에서 Application 종류 읽어오는 함수
  const readApplication = async () => {
    setReadyElementOption(false);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "application/name");

    setTemplateOptions(response.data);
    setReadyElementOption(true);
  };

  // DB에서 Json 읽어오는 함수
  const readJson = async () => {
    setReadyFormContent(false);

    setReadyJson(false);
    setCreateJson(false);
    setIndividual(false);
    var params = new URLSearchParams();

    params.append("category_id", formOption);

    const response = await axios.post("http://localhost:8080/swap/application/json", params);
    var json_total = response.data[0].content;
    var json_sub = json_total.slice(1, json_total.length - 1);

    var arr = JSON.parse("[" + json_sub + "]");

    setFormContent(arr);
    setReadyFormContent(true);

    setReadyJson(true);
  };

  // selectbox에서 클릭한 element의 value 숫자 값을 jsonData라는 배열에 넣는 함수
  const addElement = () => {
    setJsonData((jsonData) => [...jsonData, elementOption]); // jsonData에 선택한 elementoption 값이 들어감.
    setCreateElement(true);
  };

  return (
    <Fragment>
      <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
        <div className="navbar-vertical navbar">
          <NavbarVertical showMenu={showMenu} onClick={(value) => setShowMenu(value)} />
        </div>
        <div id="page-content">
          <div className="header">
            <NavbarTop
              data={{
                showMenu: showMenu,
                SidebarToggleMenu: ToggleMenu,
              }}
            />
          </div>
          <div className="container-fluid p-4">
            <Tab.Container defaultActiveKey="grid">
              <Row>
                <Form>
                  {readyJson && readyElementOption ? (
                    <div className="d-flex justify-content-end">
                      <Form.Group className="mb-3 w-26 ">
                        <FormSelect options={templateOptions} id="application_form" name="application_form" onChange={handleChange2} placeholder="신청서 템플릿 선택" />
                      </Form.Group>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end">
                      <Form.Group className="mb-3 w-26 ">
                        <FormSelect options={templateOptions} id="application_form" name="application_form" onChange={handleChange2} placeholder="신청서 템플릿 선택" />
                      </Form.Group>
                    </div>
                  )}

                  {readyJson && formContent ? (
                    <FormBuilder content={formContent} propFunction={highFunction} submit={submitButton} template="1" />
                  ) : (
                    <Card className="mb-3  border-0">
                      <Card.Header className="border-bottom px-4 py-3">
                        <h4 className="mb-0">프로그램 신청서</h4>
                      </Card.Header>
                      <Card.Body>
                        <h4>신청서 템플릿을 선택해주세요 :)</h4>
                      </Card.Body>
                    </Card>
                  )}
                </Form>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AddTemplate;
