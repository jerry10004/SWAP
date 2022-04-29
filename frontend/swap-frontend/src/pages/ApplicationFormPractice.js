// import node module libraries
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { FormSelect } from "components/elements/form-select/FormSelect";
import React, { Fragment, useState, useLayoutEffect } from "react";
import axios from "axios";
import Element from "json/Element";
import ElementCreate from "json/ElementCreate";
import jsonSkeleton from "json/jsonSkeleton.json";
import FormBuilder from "./FormBuilder";

const ApplicationFormPractice = (props) => {
  const { handleChange } = props;
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
    console.log("=======================");
    console.log(response.data);
    // response.data.map((entity, index) => (
    //   console.log("&&&&&&&");

    // ))
    setTemplateOptions(response.data);
    setReadyElementOption(true);
  };

  // DB에서 Json 읽어오는 함수
  const readJson = async () => {
    console.log("hello~!!!!!!!!");
    setReadyFormContent(false);

    setReadyJson(false);
    setCreateJson(false);
    setIndividual(false);
    var params = new URLSearchParams();

    params.append("category_id", formOption);

    const response = await axios.post("http://localhost:8080/swap/application/json", params);
    console.log("********받아온 값");
    console.log(response.data[0].content);
    var json_total = response.data[0].content;
    var json_sub = json_total.slice(1, json_total.length - 1);

    var arr = JSON.parse("[" + json_sub + "]");

    setFormContent(arr);
    setReadyFormContent(true);

    // formContent = arr;
    if (readyFormContent) {
      console.log("==========제발======");
      console.log(formContent);
    }

    setReadyJson(true);

    if (readyJson) {
      console.log("*********결과*******");
      console.log(formContent);
    }
  };

  // selectbox에서 클릭한 element의 value 숫자 값을 jsonData라는 배열에 넣는 함수
  const addElement = () => {
    setJsonData((jsonData) => [...jsonData, elementOption]); // jsonData에 선택한 elementoption 값이 들어감.
    setCreateElement(true);
  };

  // const ApplicationFormPractice = () => {
  //   return (
  //     <Fragment>
  //       <Form className="row" id="application">
  //         {readyJson ? (
  //           !createJson ? (
  //             // 1~6번
  //             <>
  //               <div>
  //                 {obj.fields.map((field, index) => (
  //                   <>
  //                     <Element key={index} field={field} />
  //                   </>
  //                 ))}
  //               </div>
  //               <Col md={12} sm={12} className="mb-4">
  //                 <Form.Group controlId="postalcode">
  //                   <Form.Label>개인정보활용동의</Form.Label>
  //                   <div className="agreement">
  //                     법령에 따라 개인을 고유하게 구별하기 위하여 부여된 모든 식별정보(성명, 소속, 휴대폰, 이메일 등)의 수집, 이용에 대한 동의를 받고 있습니다. 신청시 기재되는 모든 개인정보는
  //                     사업진행을 위하여 수집 및 이용될 수 있습니다. 또한 대학평가관련 자료 요청시 교내 관련부서에 자료가 제공될 수 있으며, 철저하게 관리될 예정입니다. 수집된 개인정보는 5년 경과(대학
  //                     평가 관련 자료 요청 기간) 후 즉시 파기됩니다. 위와 관련하여 본인의 개인고유식별정보 수집, 이용에 관한 내용을 숙지하였고 이에 동의한다면 해당란에 체크해 주십시오.
  //                   </div>
  //                 </Form.Group>
  //               </Col>
  //               <Col md={12} sm={12} className="mb-5">
  //                 <Form.Group controlId="customCheck1">
  //                   <Form.Check type="checkbox" label="개인정보 활용에 동의합니다." disabled="true" />
  //                 </Form.Group>
  //               </Col>
  //             </>
  //           ) : // 7번
  //           individual ? (
  //             <>
  //               <Col md={12} sm={12} className="mb-4">
  //                 <Form.Group controlId="postalcode">
  //                   <Form.Label>개인정보활용동의</Form.Label>
  //                   <div className="agreement">
  //                     법령에 따라 개인을 고유하게 구별하기 위하여 부여된 모든 식별정보(성명, 소속, 휴대폰, 이메일 등)의 수집, 이용에 대한 동의를 받고 있습니다. 신청시 기재되는 모든 개인정보는
  //                     사업진행을 위하여 수집 및 이용될 수 있습니다. 또한 대학평가관련 자료 요청시 교내 관련부서에 자료가 제공될 수 있으며, 철저하게 관리될 예정입니다. 수집된 개인정보는 5년 경과(대학
  //                     평가 관련 자료 요청 기간) 후 즉시 파기됩니다. 위와 관련하여 본인의 개인고유식별정보 수집, 이용에 관한 내용을 숙지하였고 이에 동의한다면 해당란에 체크해 주십시오.
  //                   </div>
  //                 </Form.Group>
  //               </Col>
  //               <Col md={12} sm={12} className="mb-5">
  //                 <Form.Group controlId="customCheck1">
  //                   <Form.Check type="checkbox" label="개인정보 활용에 동의합니다." disabled="true" />
  //                 </Form.Group>
  //               </Col>
  //             </>
  //           ) : createElement ? (
  //             // element 선택 후 추가버튼 눌렀을 때
  //             <>
  //               {jsonData.map((f, i) => (
  //                 <>
  //                   <ElementCreate key={i} field={json[f]} />
  //                 </>
  //               ))}
  //             </>
  //           ) : (
  //             <h2 className="mb-6 mt-4">Form 요소를 추가하여 Form을 완성해보세요 😇</h2>
  //           )
  //         ) : (
  //           ""
  //         )}
  //       </Form>
  //       <Row className="d-flex justify-content-end">
  //         <Button className="btn btn-success" type="submit" onClick={save}>
  //           저장
  //         </Button>
  //       </Row>
  //     </Fragment>
  //   );
  // };

  // 큰 틀
  return (
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

      <Card className="mb-3  border-0">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">프로그램 신청서</h4>
        </Card.Header>
        <Card.Body>
          {/* <ApplicationFormPractice /> */}
          {readyJson && formContent ? <FormBuilder content={formContent} /> : <h4>신청서 템플릿을 선택해주세요 :)</h4>}
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={previous}>
          이전
        </Button>
        <Button className="btn btn-success" type="button" onClick={submit}>
          제출
        </Button>
      </div>
    </Form>
  );
};
export default ApplicationFormPractice;
