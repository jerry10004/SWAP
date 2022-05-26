// import node module libraries
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { FormSelect } from "components/elements/form-select/FormSelect";
import React, { Fragment, useState, useLayoutEffect } from "react";
import axios from "axios";
import Element from "json/Element";

const ApplicationFormPractice = (props) => {
  const { submit, previous } = props;
  const [readyJson, setReadyJson] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  var formOption = 1;
  const [obj, setObj] = useState();

  useLayoutEffect(() => {
    readJson();
  }, []);

  const templateOptions = [
    { value: "1", label: "대회" },
    { value: "2", label: "봉사" },
    { value: "3", label: "캠프" },
    { value: "4", label: "동아리" },
    { value: "5", label: "행사" },
    { value: "6", label: "기타" },
    { value: "7", label: "직접생성" },
  ];

  const handleChange = (event) => {
    console.log("===select value===");
    console.log("name is ", event.target.name); // "application_form" 로 동일
    console.log("value is ", event.target.value); // 각 option의 value 숫자
    formOption = event.target.value;
    readJson();
  };

  const save = (event) => {
    // console.log("===select value===");
    // console.log("name is ", event.target.name); // "application_form" 로 동일
    // console.log("value is ", event.target.value); // 각 option의 value 숫자
    // formOption = event.target.value;
    // readJson();
  };

  const readJson = async () => {
    setReadyJson(false);
    var params = new URLSearchParams();

    console.log("===in readJson, category_id is ", formOption);

    params.append("category_id", formOption);

    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST +"application", params);
    setObj(JSON.parse(response.data[0].content));

    setReadyJson(true);
  };

  const ApplicationFormPractice = () => {
    return (
      <Fragment>
        {/* <Form className="row  " id="application">
          <Col sm={12} md={12} className="mb-4 ">
            <Form.Group controlId="nameoncard">
              <Form.Label>신청자 정보ㅎㅎ</Form.Label>
              <div>로그인한 사용자의 이름 / 학번 / 학부·전공</div>
            </Form.Group>
          </Col>

          <Col md={12} sm={12} className="mb-4">
            <Form.Group controlId="Phone number">
              <Form.Label>전화번호</Form.Label>
              <Form.Control type="text" placeholder="Phone number (010-1234-5678)" required />
            </Form.Group>
          </Col>

          <Col md={12} sm={12} className="mb-4">
            <Form.Group controlId="Phone number">
              <Form.Label>이메일</Form.Label>
              <Form.Control type="email" placeholder="Handong123@handong.ac.kr" required />
            </Form.Group>
          </Col>

          <Col md={12} sm={12} className="mb-4">
            <Form.Group controlId="Phone number">
              <Form.Label>신청동기</Form.Label>
              <Form.Control type="text" placeholder="신청동기를 입력해주세요" required />
            </Form.Group>
          </Col>

          <Col md={12} sm={12} className="mb-4">
            <Form.Group controlId="postalcode">
              <Form.Label>개인정보활용동의</Form.Label>
              <div className="agreement">
                법령에 따라 개인을 고유하게 구별하기 위하여 부여된 모든 식별정보(성명, 소속, 휴대폰, 이메일 등)의 수집, 이용에 대한 동의를 받고 있습니다. 신청시 기재되는 모든 개인정보는 사업진행을
                위하여 수집 및 이용될 수 있습니다. 또한 대학평가관련 자료 요청시 교내 관련부서에 자료가 제공될 수 있으며, 철저하게 관리될 예정입니다. 수집된 개인정보는 5년 경과(대학 평가 관련 자료
                요청 기간) 후 즉시 파기됩니다. 위와 관련하여 본인의 개인고유식별정보 수집, 이용에 관한 내용을 숙지하였고 이에 동의한다면 해당란에 체크해 주십시오.
              </div>
            </Form.Group>
          </Col>
          <Col md={12} sm={12} className="mb-5">
            <Form.Group controlId="customCheck1">
              <Form.Check type="checkbox" label="개인정보 활용에 동의합니다." disabled="true" />
            </Form.Group>
          </Col>
        </Form>

         */}
        {/* <p>hihi</p>
        <ul className="list_day">
          {jsonData2.days.map((day) => (
            <li key={day.id}>Day {day.day} </li>
          ))}{" "}
        </ul> */}
        <Form className="row  " id="application">
          {readyJson ? (
            <>
              <div>
                {obj.fields.map((field, index) => (
                  <Element key={index} field={field} />
                ))}
              </div>
            </>
          ) : (
            ""
          )}
          {/*  개인정보활용동의 */}
          <Col md={12} sm={12} className="mb-4">
            <Form.Group controlId="postalcode">
              <Form.Label>개인정보활용동의</Form.Label>
              <div className="agreement">
                법령에 따라 개인을 고유하게 구별하기 위하여 부여된 모든 식별정보(성명, 소속, 휴대폰, 이메일 등)의 수집, 이용에 대한 동의를 받고 있습니다. 신청시 기재되는 모든 개인정보는 사업진행을
                위하여 수집 및 이용될 수 있습니다. 또한 대학평가관련 자료 요청시 교내 관련부서에 자료가 제공될 수 있으며, 철저하게 관리될 예정입니다. 수집된 개인정보는 5년 경과(대학 평가 관련 자료
                요청 기간) 후 즉시 파기됩니다. 위와 관련하여 본인의 개인고유식별정보 수집, 이용에 관한 내용을 숙지하였고 이에 동의한다면 해당란에 체크해 주십시오.
              </div>
            </Form.Group>
          </Col>
          {/*  CheckBox */}
          <Col md={12} sm={12} className="mb-5">
            {/*  Checkbox  */}
            <Form.Group controlId="customCheck1">
              <Form.Check type="checkbox" label="개인정보 활용에 동의합니다." disabled="true" />
            </Form.Group>
          </Col>
        </Form>
        <Row className="align-items-end">
          <Button className="btn btn-success" type="submit" onClick={save}>
            저장
          </Button>
        </Row>
      </Fragment>
    );
  };

  return (
    <Form>
      {/* Category */}
      <div className="d-flex justify-content-end">
        <Form.Group className="mb-3 w-26 ">
          <FormSelect options={templateOptions} id="application-template" name="application_form" onChange={handleChange} placeholder="신청서 템플릿 선택" />
        </Form.Group>
      </div>
      {/* Card */}
      <Card className="mb-3  border-0">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">프로그램 신청서</h4>
        </Card.Header>
        {/* Card body */}
        <Card.Body>
          <ApplicationFormPractice />
        </Card.Body>
      </Card>

      {/* Button */}
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={previous}>
          이전
        </Button>
        <Button className="btn btn-success" type="submit" onClick={submit}>
          제출
        </Button>
      </div>
    </Form>
  );
};
export default ApplicationFormPractice;
