import React, { useState } from "react";
import { Card, Row, Form, Button, Col, InputGroup } from "react-bootstrap";
import { FormSelect } from "components/elements/form-select/FormSelect";
import { DropFiles } from "components/elements/dropfiles/DropFiles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/addProgram.scss";
import { ko } from "date-fns/esm/locale";

const BasicInformation = (props) => {
  const { next, handleChange } = props;
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const categoryOptions = [
    { value: "대회", label: "대회" },
    { value: "봉사", label: "봉사" },
    { value: "캠프", label: "캠프" },
    { value: "동아리", label: "동아리" },
    { value: "행사", label: "행사" },
    { value: "기타", label: "기타" },
  ];

  return (
    <Form>
      {/* Card */}
      <Card className="mb-3 ">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">프로그램 기본 정보</h4>
        </Card.Header>
        {/* Card body */}
        <Card.Body>
          <Form>
            <Row>
              {/* Project's Name */}
              <Col xs={12} className="mb-4">
                <Form.Group controlId="program_title">
                  <Form.Label>
                    프로그램 제목 <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="프로그램 제목을 입력하세요." name="program_title" onChange={handleChange} required />
                </Form.Group>
              </Col>

              {/* Description */}
              <Col xs={12} className="mb-4">
                <Form.Group controlId="formProjectBrief">
                  <Form.Label>
                    프로그램 설명 <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control as="textarea" rows={3} name="program_description" onChange={handleChange} placeholder="프로그램에 관한 정보를 입력하세요." />
                </Form.Group>
              </Col>

              {/* Start Date */}
              <Col md={6} xs={12} className="mb-4">
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
              </Col>

              {/* End Date */}
              <Col md={6} xs={12} className="mb-4">
                <Form.Label>
                  프로그램 종료 날짜 <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
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
                  <Form.Control type="text" placeholder="숫자만 기입" id="program_quota" name="program_quota" onChange={handleChange} />
                </Form.Group>
              </Col>

              {/* 카테고리 */}
              <Col md={6} xs={12} className="mb-4">
                <Form.Group controlId="formPrivacyOptions">
                  <Form.Label>
                    카테고리 <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control as={FormSelect} placeholder="카테고리를 선택하세요." options={categoryOptions} />
                </Form.Group>
              </Col>

              {/* Project Cover Image */}
              <Col xs={12} className="mb-4">
                <h5 className="mb-3">프로그램 이미지(포스터) </h5>
                <div className="dropzone p-4 border-dashed text-center">
                  <DropFiles />
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      {/* Button */}
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={next}>
          다음
        </Button>
      </div>
    </Form>
  );
};

export default BasicInformation;
