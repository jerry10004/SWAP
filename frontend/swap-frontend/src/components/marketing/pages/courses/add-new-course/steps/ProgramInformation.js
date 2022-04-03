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
  // const { next, handleChange } = props;
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();
  const [programInformation, setProgramInformation] = useState(null);
  const [programInformationLoading, setProgramInformationLoading] = useState(null);
  const programId = 0;
  const [isEdit, setIsEdit] = useState(false);
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();
  const [editInfo, seteditInfo] = useState(null);
  // const [editInfo, seteditInfo] = useState({ program_name: "", category_name: "", start_date: "", end_date: "", information: "", quota: "" });
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

  useLayoutEffect(() => {
    readProgramInformation(props.param1.id);
  }, []);

  const onEdit = (e) => {
    console.log("~~~~~!~!~!~!~!");
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    // const { value, name } = e.target;
    seteditInfo({
      ...editInfo,
      [name]: value,
    });
    console.log("result is");
    console.log(editInfo);
  };

  const readProgramInformation = async (id) => {
    setProgramInformationLoading(false);
    console.log("id is", id);
    const response = await axios.get("http://localhost:8080/swap/program/information/" + id);
    setProgramInformation(response.data);
    seteditInfo(response.data);
    console.log("edit info is ");
    console.log(response.data);
    setStart_date(response.data[0].start_date);
    setEnd_date(response.data[0].end_date);
    setProgramInformationLoading(true);
  };

  const getFormatDate = (date) => {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장

    var hour = date.getHours();
    hour = hour >= 10 ? hour : "0" + hour; //hour 두자리로 저장
    var minute = date.getMinutes();
    minute = minute >= 10 ? minute : "0" + minute; //minute 두자리로 저장

    return year + "-" + month + "-" + day + " " + hour + ":" + minute; //'-' 추가하여 yyyy-MM-dd HH:mm 형태 생성 가능
  };

  const edit = () => {
    setIsEdit(true);
  };

  const save = () => {
    console.log("hihihi");
    console.log("edit is");
    console.log(editInfo);
    editInformation();
    setIsEdit(false);
  };

  const editInformation = async () => {
    console.log("~~~~~~Edit~~~~~~");
    var params = new URLSearchParams();
    console.log("Start date is ");
    console.log(start_date);
    var info_startdate = "start_date";
    var info_enddate = "end_date";
    seteditInfo({
      ...editInfo,
      [info_startdate]: start_date,
      [info_enddate]: end_date,
    });

    console.log("$$$$$$$$$$$4");
    console.log(editInfo);

    // params.append("program_quota", edit.program_quota);
    // params.append("program_name", formData.program_title);
    // params.append("information", formData.program_description);
    // params.append("start_date", formattedStartDate);
    // params.append("end_date", formattedEndDate);
    // if (window.confirm("프로그램을 추가하시겠습니까?")) {
    //   const response = await axios.post("http://localhost:8080/swap/program/add", params);
    //   alert(formData.program_title + " 프로그램이 추가 되었습니다.");
    //   navigate("/admin/program");
    // }
  };

  return (
    <Form>
      {programInformationLoading === true ? (
        isEdit === false ? (
          <>
            <Card className="mb-3 ">
              <Card.Header className="border-bottom px-4 py-3">
                <h4 className="mb-0">프로그램 기본 정보</h4>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col xs={12} className="mb-4">
                      <Form.Group controlId="program_title">
                        <Form.Label>
                          프로그램 제목 <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="프로그램 제목을 입력하세요." name="program_title" value={programInformation[0].program_name} required disabled />
                      </Form.Group>
                    </Col>

                    <Col xs={12} className="mb-4">
                      <Form.Group controlId="formProjectBrief">
                        <Form.Label>
                          프로그램 설명 <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control as="textarea" rows={3} name="program_description" value={programInformation[0].information} placeholder="프로그램에 관한 정보를 입력하세요." disabled />
                      </Form.Group>
                    </Col>

                    <Col md={6} xs={12} className="mb-4">
                      <Form.Label>
                        프로그램 시작 날짜 <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup className="datePicker-wrapper">
                        <DatePicker
                          locale={ko}
                          value={programInformation[0].start_date}
                          dateFormat="yyyy-MM-dd HH:mm"
                          className="datePicker"
                          placeholderText="시작 날짜를 선택해주세요."
                          // selected={startDate}
                          showTimeSelect
                          disabled
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6} xs={12} className="mb-4">
                      <Form.Label>
                        프로그램 종료 날짜 <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <DatePicker
                          locale={ko}
                          value={programInformation[0].end_date}
                          dateFormat="yyyy-MM-dd HH:mm"
                          className="datePicker"
                          placeholderText="종료 날짜를 선택해주세요."
                          // selected={endDate}
                          showTimeSelect
                          disabled
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6} xs={12} className="mb-4">
                      <Form.Group>
                        <Form.Label>
                          프로그램 정원 <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="숫자만 기입" id="program_quota" name="program_quota" value={programInformation[0].quota} disabled />
                      </Form.Group>
                    </Col>

                    <Col md={6} xs={12} className="mb-4">
                      <Form.Group controlId="program_category">
                        <Form.Label>
                          카테고리 <span className="text-danger">*</span>
                        </Form.Label>
                        <select class="form-select" id="program_category" name="program_category" required disabled>
                          <option selected value="1">
                            {programInformation[0].category_name}
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
                  </Row>
                </Form>
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-end me-4">
              <Button variant="primary" onClick={edit}>
                수정
              </Button>
            </div>
          </>
        ) : (
          <>
            <Card className="mb-3 ">
              <Card.Header className="border-bottom px-4 py-3">
                <h4 className="mb-0">프로그램 기본 정보</h4>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col xs={12} className="mb-4">
                      <Form.Group controlId="program_title">
                        <Form.Label>
                          프로그램 제목 <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control type="text" name="program_name" placeholder="프로그램 제목을 입력하세요." onChange={onEdit} required />
                      </Form.Group>
                    </Col>

                    <Col xs={12} className="mb-4">
                      <Form.Group controlId="formProjectBrief">
                        <Form.Label>
                          프로그램 설명 <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control as="textarea" rows={3} name="program_information" onChange={onEdit} placeholder="프로그램에 관한 정보를 입력하세요." />
                      </Form.Group>
                    </Col>

                    <Col md={6} xs={12} className="mb-4">
                      <Form.Label>
                        프로그램 시작 날짜 <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup className="datePicker-wrapper">
                        <DatePicker
                          locale={ko}
                          dateFormat="yyyy-MM-dd HH:mm"
                          className="datePicker"
                          name="start_date"
                          placeholderText={programInformation[0].start_date}
                          selected={startDate}
                          onChange={(date) => {
                            setStartDate(date);
                          }}
                          showTimeSelect
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6} xs={12} className="mb-4">
                      <Form.Label>
                        프로그램 종료 날짜 <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <DatePicker
                          locale={ko}
                          dateFormat="yyyy-MM-dd HH:mm"
                          className="datePicker"
                          placeholderText={programInformation[0].end_date}
                          name="end_date"
                          selected={endDate}
                          onChange={(date) => {
                            setEndDate(date);
                          }}
                          showTimeSelect
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6} xs={12} className="mb-4">
                      <Form.Group>
                        <Form.Label>
                          프로그램 정원 <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="숫자만 기입" id="quota" name="quota" onChange={onEdit} />
                      </Form.Group>
                    </Col>

                    {/* 카테고리 */}
                    <Col md={6} xs={12} className="mb-4">
                      <Form.Group controlId="program_category">
                        <Form.Label>
                          카테고리 <span className="text-danger">*</span>
                        </Form.Label>
                        <select class="form-select" id="program_category" name="program_category" required placeholder={programInformation[0].category_name}>
                          <option value="" selected disabled hidden>
                            {programInformation[0].category_name}
                          </option>
                          <option value="1">대회</option>
                          <option value="2">봉사</option>
                          <option value="3">캠프</option>
                          <option value="4">동아리</option>
                          <option value="5">행사</option>
                          <option value="6">기타</option>
                        </select>
                        <Form.Control.Feedback type="invalid">카테고리를 선택해주세요.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-end me-4">
              <Button variant="primary" onClick={save}>
                완료
              </Button>
            </div>
          </>
        )
      ) : (
        ""
      )}
    </Form>
  );
};

export default ProgramInformation;
