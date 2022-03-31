import React, { useState, useLayoutEffect } from "react";
import { Card, Row, Form, Button, Col, InputGroup } from "react-bootstrap";
import { FormSelect } from "components/elements/form-select/FormSelect";
import { DropFiles } from "components/elements/dropfiles/DropFiles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/addProgram.scss";
import { ko } from "date-fns/esm/locale";
import axios from "axios";

const ProgramInformation = (props) => {
  const { next, handleChange } = props;
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [programInformation, setProgramInformation] = useState(null);
  const [programInformationLoading, setProgramInformationLoading] = useState(null);
  const programId = 0;
  const [isEdit, setIsEdit] = useState(false);

  const categoryOptions = [
    { value: "대회", label: "대회" },
    { value: "봉사", label: "봉사" },
    { value: "캠프", label: "캠프" },
    { value: "동아리", label: "동아리" },
    { value: "행사", label: "행사" },
    { value: "기타", label: "기타" },
  ];

  useLayoutEffect(() => {
    console.log("~~~~~~~");
    console.log(props.param1.id);
    // setProgramId(props.param1.id);
    readProgramInformation(props.param1.id);
  }, []);

  const readProgramInformation = async (id) => {
    // setLectureDetailLoading(true);
    // const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "lecture/detail/" + id, {
    //   params: {
    //     token: window.sessionStorage.getItem("token"),
    //     manageID: window.sessionStorage.getItem("id"),
    //   },
    // });
    // setProgramInformation(response.data);
    // setLectureDetailLoading(false);
    setProgramInformationLoading(false);
    console.log("id is", id);
    const response = await axios.get("http://localhost:8080/swap/program/information/" + id);
    setProgramInformation(response.data);
    console.log("~이거를보자~~~~`");
    console.log(response.data);
    console.log("~~~~reponse's [0]`");
    console.log(response.data[0]);

    // console.log(programInformation[0].program_name);
    setProgramInformationLoading(true);
  };

  const edit = () => {
    setIsEdit(true);
  };

  const save = () => {
    setIsEdit(false);
  };

  return (
    <Form>
      {/* Card */}
      {programInformationLoading === true ? (
        <>
          <Card className="mb-3 ">
            <Card.Header className="border-bottom px-4 py-3">
              <h4 className="mb-0">프로그램 기본 정보</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  {/* Project's Name */}
                  <Col xs={12} className="mb-4">
                    <Form.Group controlId="program_title">
                      <Form.Label>
                        프로그램 제목 <span className="text-danger">*</span>
                      </Form.Label>
                      {/* <Form.Control type="text" placeholder="프로그램 제목을 입력하세요." name="program_title" onChange={handleChange} required /> */}
                      <Form.Control type="text" placeholder="프로그램 제목을 입력하세요." name="program_title" value={programInformation[0].program_name} required />
                    </Form.Group>
                  </Col>

                  {/* Description */}
                  <Col xs={12} className="mb-4">
                    <Form.Group controlId="formProjectBrief">
                      <Form.Label>
                        프로그램 설명 <span className="text-danger">*</span>
                      </Form.Label>
                      {/* <Form.Control as="textarea" rows={3} name="program_description" onChange={handleChange} placeholder="프로그램에 관한 정보를 입력하세요." /> */}
                      <Form.Control as="textarea" rows={3} name="program_description" value={programInformation[0].information} placeholder="프로그램에 관한 정보를 입력하세요." />
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
                      {/* <Form.Control type="text" placeholder="숫자만 기입" id="program_quota" name="program_quota" onChange={handleChange} /> */}
                      <Form.Control type="text" placeholder="숫자만 기입" id="program_quota" name="program_quota" value={programInformation[0].quota} />
                    </Form.Group>
                  </Col>

                  {/* 카테고리 */}
                  <Col md={6} xs={12} className="mb-4">
                    <Form.Group controlId="formPrivacyOptions">
                      <Form.Label>
                        카테고리 <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control as={FormSelect} placeholder="카테고리를 선택하세요." options={categoryOptions} />
                      {/* <Form.Control as={FormSelect} placeholder="카테고리를 선택하세요." value={programInformation[0].category_id} /> */}
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
            {/* ))} */}
          </Card>
          {/* Button */}
          {isEdit === false ? (
            <div className="d-flex justify-content-end me-4">
              <Button variant="primary" onClick={edit}>
                수정
              </Button>
            </div>
          ) : (
            <div className="d-flex justify-content-end me-4">
              <Button variant="primary" onClick={save}>
                완료
              </Button>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </Form>
  );
};

export default ProgramInformation;
