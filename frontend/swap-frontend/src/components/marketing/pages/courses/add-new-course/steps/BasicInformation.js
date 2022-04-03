import React, { useState } from "react";
import { Card, Row, Form, Button, Col, InputGroup } from "react-bootstrap";
import { FormSelect } from "components/elements/form-select/FormSelect";
import { DropFiles } from "components/elements/dropfiles/DropFiles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/addProgram.scss";
import { ko } from "date-fns/esm/locale";

const BasicInformation = (props) => {
  const { validated, next, handleChange } = props;
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // const categoryOptions = [
  //   { value: "", label: "카테고리를 선택하세요." },
  //   { value: "1", label: "대회" },
  //   { value: "2", label: "봉사" },
  //   { value: "3", label: "캠프" },
  //   { value: "4", label: "동아리" },
  //   { value: "5", label: "행사" },
  //   { value: "6", label: "기타" },
  // ];

  // const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   console.log(form);
  //   event.preventDefault();

  //   if (form.checkValidity() === false) {
  //     event.stopPropagation();
  //     console.log("====================");
  //   }

  // };

  //const [validated, setValidated] = useState(false);

  return (
    <Form noValidate validated={validated} onSubmit={next}>
      {/* Card */}
      <Card className="mb-3 ">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">프로그램 기본 정보</h4>
        </Card.Header>
        {/* Card body */}
        <Card.Body>
          {/* <Form> */}
          <Row>
            {/* Project's Name */}
            <Col xs={12} className="mb-4">
              <Form.Group controlId="program_title">
                <Form.Label>
                  프로그램 제목 <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="프로그램 제목을 입력하세요." name="program_title" onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">제목을 입력해주세요.</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Description */}
            <Col xs={12} className="mb-4">
              <Form.Group controlId="program_description">
                <Form.Label>
                  프로그램 설명 <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control as="textarea" rows={3} name="program_description" onChange={handleChange} placeholder="프로그램에 관한 정보를 입력하세요." required />
                <Form.Control.Feedback type="invalid">프로그램 설명을 입력해주세요.</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Start Date */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Group controlId="start_date">
                <Form.Label>
                  프로그램 시작 날짜 <span className="text-danger">*</span>
                </Form.Label>

                <InputGroup className="datePicker-wrapper">
                  <DatePicker
                    locale={ko}
                    dateFormat="yyyy-MM-dd HH:mm"
                    className="datePicker"
                    placeholderText="시작 날짜를 선택해주세요."
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      props.setStart_date(date);
                    }}
                    showTimeSelect
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* End Date */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Label>
                프로그램 종료 날짜 <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup required>
                <DatePicker
                  locale={ko}
                  dateFormat="yyyy-MM-dd HH:mm"
                  className="datePicker"
                  placeholderText="종료 날짜를 선택해주세요."
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    props.setEnd_date(date);
                  }}
                  showTimeSelect
                />
              </InputGroup>
            </Col>

            {/* 프로그램 정원 */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Group>
                <Form.Label>
                  프로그램 정원 <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="숫자만 기입" id="program_quota" name="program_quota" onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">프로그램 정원을 입력해주세요.</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* 카테고리 */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Group controlId="program_category">
                <Form.Label>
                  카테고리 <span className="text-danger">*</span>
                </Form.Label>
                {/* <Form.Control required as={FormSelect} placeholder="카테고리를 선택하세요." name="program_category" options={categoryOptions} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">카테고리를 선택해주세요.</Form.Control.Feedback> */}
                <select class="form-select" id="program_category" name="program_category" required>
                  <option selected value="1">
                    대회
                  </option>
                  <option value="2">봉사</option>
                  <option value="3">캠프</option>
                  <option value="4">동아리</option>
                  <option value="5">행사</option>
                  <option value="6">기타</option>
                </select>
                <Form.Control.Feedback type="invalid">카테고리를 선택해주세요.</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Project Cover Image */}
            {/* <Col xs={12} className="mb-4">
                <h5 className="mb-3">프로그램 이미지(포스터) </h5>
                <div className="dropzone p-4 border-dashed text-center">
                  <DropFiles />
                </div>
              </Col> */}
          </Row>
          {/* </Form> */}
        </Card.Body>
      </Card>
      {/* Button */}
      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          다음
        </Button>
      </div>
    </Form>
  );
};

export default BasicInformation;
