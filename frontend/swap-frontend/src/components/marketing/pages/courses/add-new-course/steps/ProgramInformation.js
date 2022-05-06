import React, { useState, useLayoutEffect } from "react";
import { Card, Row, Form, Button, Col, InputGroup, Image } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/addProgram.scss";
import { ko } from "date-fns/esm/locale";
import axios from "axios";
import DefaultImg from "assets/images/Default_img.png";

const ProgramInformation = (props) => {
  const [programInformation, setProgramInformation] = useState(null);
  const [programInformationLoading, setProgramInformationLoading] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();
  const [editInfo, seteditInfo] = useState(null);
  const [editStart, seteditStart] = useState(false);
  const [editEnd, seteditEnd] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [Applystart_date, setApplyStart_date] = useState();
  const [Applyend_date, setApplyEnd_date] = useState();
  const [ApplystartDate, setApplyStartDate] = useState();
  const [ApplyendDate, setApplyEndDate] = useState();
  const [editApplyStart, seteditApplyStart] = useState(false);
  const [editApplyEnd, seteditApplyEnd] = useState(false);
  const [filePath, setFilePath] = useState([]);
  const [poster, setPoster] = useState();

  useLayoutEffect(() => {
    readProgramInformation(props.param1.id);
  }, []);

  const onEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    seteditInfo({
      ...editInfo,
      [name]: value,
    });
  };

  const readProgramInformation = async (id) => {
    setProgramInformationLoading(false);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "program/information/" + id);
    setProgramInformation(response.data);
    var filePathList = [];

    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i].file_type === 0) {
        filePathList.push(response.data[i].file_name);
      } else if (response.data[i].file_type === 1) {
        setPoster(response.data[i].file_name);
      }
    }
    setFilePath(filePathList);
    console.log(response.data);
    seteditInfo(response.data[0]);
    setStart_date(response.data[0].start_date);
    setEnd_date(response.data[0].end_date);
    setApplyStart_date(response.data[0].Applystart_date);
    setApplyEnd_date(response.data[0].Applyend_date);
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
    editInformation();
    setIsEdit(false);
  };

  const editInformation = async () => {
    var params = new URLSearchParams();

    if (editStart) editInfo.start_date = getFormatDate(startDate);
    if (editEnd) editInfo.end_date = getFormatDate(endDate);
    if (editApplyStart) editInfo.Applystart_date = getFormatDate(ApplystartDate);
    if (editApplyEnd) editInfo.Applyend_date = getFormatDate(ApplyendDate);

    params.append("id", editInfo.id);
    params.append("program_name", editInfo.program_name);
    params.append("information", editInfo.information);
    params.append("quota", editInfo.quota);
    params.append("category_id", editInfo.category_Id);
    params.append("start_date", editInfo.start_date);
    params.append("end_date", editInfo.end_date);
    params.append("Applystart_date", editInfo.Applystart_date);
    params.append("Applyend_date", editInfo.Applyend_date);
    params.append("manager_name", editInfo.manager_name);
    params.append("manager_contact", editInfo.manager_contact);

    if (window.confirm("프로그램을 수정하시겠습니까?") && editInfo) {
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/edit", params);
      alert(" 프로그램이 수정 되었습니다.");
      seteditStart(false);
      seteditEnd(false);
      seteditApplyStart(false);
      seteditApplyEnd(false);
      readProgramInformation(props.param1.id);
      window.location.reload();
    }
  };

  return (
    <Form>
      {programInformationLoading === true ? (
        isEdit === false ? (
          <>
            <Row>
              <Col className="InformationCard">
                <Card className="mt-2 ms-2 shadow p-3">
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
                            <Form.Control as="textarea" rows={10} name="program_description" value={programInformation[0].information} placeholder="프로그램에 관한 정보를 입력하세요." disabled />
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
                          <Form.Label>
                            신청 시작 날짜 <span className="text-danger">*</span>
                          </Form.Label>
                          <InputGroup className="datePicker-wrapper">
                            <DatePicker
                              locale={ko}
                              value={programInformation[0].applystart_date}
                              dateFormat="yyyy-MM-dd HH:mm"
                              className="datePicker"
                              name="Applystart_date"
                              placeholderText="신청 시작 날짜를 선택해주세요."
                              showTimeSelect
                              disabled
                            />
                          </InputGroup>
                        </Col>

                        <Col md={6} xs={12} className="mb-4">
                          <Form.Label>
                            신청 마감 날짜 <span className="text-danger">*</span>
                          </Form.Label>
                          <InputGroup>
                            <DatePicker
                              locale={ko}
                              value={programInformation[0].applyend_date}
                              dateFormat="yyyy-MM-dd HH:mm"
                              className="datePicker"
                              placeholderText="신청 마감 날짜를 선택해주세요."
                              name="Applyend_date"
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
                            <select class="form-select" id="program_category" name="program_category" required disabled value={programInformation[0].category_Id}>
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

                        <Col md={6} xs={12} className="mb-4">
                          <Form.Group>
                            <Form.Label>담당자</Form.Label>
                            <Form.Control type="text" placeholder="담당자 이름을 입력하세요." name="manager_name" value={programInformation[0].manager_name} disabled />
                          </Form.Group>
                        </Col>

                        <Col md={6} xs={12} className="mb-4">
                          <Form.Group>
                            <Form.Label>담당자 연락처</Form.Label>
                            <Form.Control type="text" placeholder="담당자 연락처를 입력하세요." name="manager_contact" value={programInformation[0].manager_contact} disabled />
                          </Form.Group>
                        </Col>
                        {/* 
                        <Col md={6} xs={12} className="mb-4">
                          <Form.Group>
                            {filePath[0] ? (
                              <>
                                <Form.Label>첨부파일</Form.Label>
                                <br />
                                {filePath.map((item, i) => {
                                  var name = item.split("/");

                                  return (
                                    <>
                                      <a href={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + item} download target="_blank" className="ms-1">
                                        {name[2]}
                                      </a>
                                      <br />
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              ""
                            )}
                          </Form.Group>
                        </Col> */}
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={4} className="ps-0">
                <Card className="mb-3 me-2 mt-2 shadow p-3">
                  <Card.Header className="border-bottom px-4 py-3">
                    <h4 className="mb-0">프로그램 포스터</h4>
                  </Card.Header>
                  <Card.Body>
                    {poster ? (
                      <Image width="100%" object-fit="contain" src={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + poster} alt="" />
                    ) : (
                      <Image width="100%" object-fit="contain" src={DefaultImg} alt="" />
                    )}
                  </Card.Body>
                </Card>
                {filePath[0] ? (
                  <>
                    <Card className="mb-3 me-2 shadow p-3">
                      <Card.Header className="border-bottom px-4 py-3">
                        <h4 className="mb-0">첨부파일</h4>
                      </Card.Header>
                      <Card.Body>
                        {filePath.map((item, i) => {
                          var name = item.split("/");

                          return (
                            <>
                              <a href={process.env.REACT_APP_RESTAPI_HOST + "resources/upload/" + item} download target="_blank">
                                {name[2]}
                              </a>
                              <br />
                            </>
                          );
                        })}
                      </Card.Body>
                    </Card>

                    <br />
                  </>
                ) : (
                  ""
                )}
              </Col>
            </Row>
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
                        <Form.Control as="textarea" rows={10} name="information" onChange={onEdit} placeholder="프로그램에 관한 정보를 입력하세요." />
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
                            seteditStart(true);
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
                            seteditEnd(true);
                          }}
                          showTimeSelect
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6} xs={12} className="mb-4">
                      <Form.Label>
                        신청 시작 날짜 <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup className="datePicker-wrapper">
                        <DatePicker
                          locale={ko}
                          dateFormat="yyyy-MM-dd HH:mm"
                          className="datePicker"
                          name="Applystart_date"
                          placeholderText={programInformation[0].applystart_date}
                          selected={ApplystartDate}
                          onChange={(date) => {
                            setApplyStartDate(date);
                            seteditApplyStart(true);
                          }}
                          showTimeSelect
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6} xs={12} className="mb-4">
                      <Form.Label>
                        신청 마감 날짜 <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <DatePicker
                          locale={ko}
                          dateFormat="yyyy-MM-dd HH:mm"
                          className="datePicker"
                          placeholderText={programInformation[0].applyend_date}
                          name="Applyend_date"
                          selected={ApplyendDate}
                          onChange={(date) => {
                            setApplyEndDate(date);
                            seteditApplyEnd(true);
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
                        <select class="form-select" id="category_Id" name="category_Id" defaultValue={programInformation[0].category_Id} required onChange={onEdit}>
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

                    <Col md={6} xs={12} className="mb-4">
                      <Form.Group>
                        <Form.Label>담당자</Form.Label>
                        <Form.Control type="text" placeholder="담당자 이름을 입력하세요." name="manager_name" onChange={onEdit} />
                      </Form.Group>
                    </Col>

                    <Col md={6} xs={12} className="mb-4">
                      <Form.Group>
                        <Form.Label>담당자 연락처</Form.Label>
                        <Form.Control type="text" placeholder="담당자 연락처를 입력하세요." name="manager_contact" onChange={onEdit} />
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
