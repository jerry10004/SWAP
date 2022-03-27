// import node module libraries
import { Card, Row, Form, Button, Col, InputGroup } from "react-bootstrap";
import { FormSelect } from "components/elements/form-select/FormSelect";
import { Link } from "react-router-dom";
import { FlatPickr } from "components/elements/flat-pickr/FlatPickr";
import { DropFiles } from "components/elements/dropfiles/DropFiles";
import { Image } from "react-bootstrap-icons";

const CreateProjectForm = (props) => {
  const { handleChange } = props;
  const categoryOptions = [
    { value: "대회", label: "대회" },
    { value: "봉사", label: "봉사" },
    { value: "캠프", label: "캠프" },
    { value: "동아리", label: "동아리" },
    { value: "행사", label: "행사" },
    { value: "기타", label: "기타" },
  ];

  const teamMembers = [
    { value: "Eleanor Pena", label: "Eleanor Pena" },
    { value: "Courtney Henry", label: "Courtney Henry" },
    { value: "Assign to Owner", label: "Assign to Owner" },
  ];

  const projectBudget = [
    { value: "Based on Project Amount", label: "Based on Project Amount" },
    { value: "Based on Project Hours", label: "Based on Project Hours" },
  ];

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  return (
    <Form>
      <Row>
        {/* Project's Name */}
        <Col xs={12} className="mb-4">
          <Form.Group controlId="program_title">
            <Form.Label>
              프로그램 제목 <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="프로그램 제목을 입력하세요." required />
          </Form.Group>
        </Col>

        {/* Description */}
        <Col xs={12} className="mb-4">
          <Form.Group controlId="formProjectBrief">
            <Form.Label>프로그램 설명</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="프로그램에 관한 정보를 입력하세요." />
          </Form.Group>
        </Col>

        {/* Start Date */}
        <Col md={6} xs={12} className="mb-4">
          <Form.Label>
            프로그램 시작 날짜 <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup>
            <Form.Control as={FlatPickr} value={""} />
            <InputGroup.Text className="text-muted">
              <i className="fe fe-calendar"></i>
            </InputGroup.Text>
          </InputGroup>
        </Col>

        {/* End Date */}
        <Col md={6} xs={12} className="mb-4">
          <Form.Label>
            프로그램 종료 날짜 <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup>
            <Form.Control as={FlatPickr} value={""} />
            <InputGroup.Text className="text-muted">
              <i className="fe fe-calendar"></i>
            </InputGroup.Text>
          </InputGroup>
        </Col>

        {/* 프로그램 정원 */}
        <Col md={6} xs={12} className="mb-4">
          <Form.Group>
            <Form.Label>프로그램 정원</Form.Label>
            <Form.Control type="text" placeholder="숫자만 기입" id="program_quota" name="program_quota" onChange={handleChange} />
          </Form.Group>
        </Col>

        {/* 카테고리 */}
        <Col md={6} xs={12} className="mb-4">
          <Form.Group controlId="formPrivacyOptions">
            <Form.Label>카테고리</Form.Label>
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
  );
};

const BasicInformation = (props) => {
  const { next, handleChange } = props;

  const CoursesLevel = [
    { value: "Intermediate", label: "Intermediate" },
    { value: "Beignners", label: "Beignners" },
    { value: "Advance", label: "Advance" },
  ];

  const initialValue = `<p>프로그램에 대한 상세 설명을 작성해주세요.</p>`;

  return (
    // <Form>
    //   {/* Card */}
    //   <Card className="mb-3 ">
    //     <Card.Header className="border-bottom px-4 py-3">
    //       <h4 className="mb-0">프로그램 기본 정보</h4>
    //     </Card.Header>
    //     {/* Card body */}
    //     <Card.Body>
    //       <Form className="row">
    //         {/* Title  */}
    //         <Form.Group className="mb-4">
    //           <Form.Label htmlFor="program_title">프로그램 제목</Form.Label>
    //           <Form.Control type="text" placeholder="프로그램 제목" id="program_title" name="program_title" onChange={handleChange} />
    //           {/* <Form.Text className="text-muted">Write a 60 character course title.</Form.Text> */}
    //         </Form.Group>
    //         {/* 프로그램 정원 */}
    //         <Col sm={12} md={4} className="mb-4 ">
    //           <Form.Group>
    //             <Form.Label>프로그램 정원</Form.Label>
    //             <Form.Control type="text" placeholder="숫자만 기입" id="program_quota" name="program_quota" onChange={handleChange} />
    //           </Form.Group>
    //         </Col>
    //         {/* Category */}
    //         <Col sm={12} md={8} className="mb-4 ">
    //           <Form.Group>
    //             <Form.Label>프로그램 카테고리</Form.Label>
    //             <FormSelect options={categoryOptions} id="program_category" name="program_category" placeholder="카테고리를 선택하세요." />
    //             {/* <Form.Text className="text-muted">Help people find your courses by choosing categories that represent your course.</Form.Text> */}
    //           </Form.Group>
    //         </Col>

    //         {/* 프로그램 시작날짜, 종료날짜 */}
    //         <Col sm={12} md={6} className="mb-4 "></Col>
    //         <Col sm={12} md={6} className="mb-4 "></Col>

    //         {/* Course Description*/}
    //         <Form.Group className="mb-3">
    //           <Form.Label>프로그램 설명</Form.Label>
    //           <ReactQuillEditor initialValue={initialValue} id="program_description" name="program_description" onChange={handleChange} />
    //           {/* <Form.Text className="text-muted">A brief summary of your courses.</Form.Text> */}
    //         </Form.Group>
    //         {/* 프로그램 포스터 이미지 업로드 */}
    //         <Form.Label>프로그램 포스터(이미지) 업로드</Form.Label>
    //         <Form.Group className="mb-1 input-group">
    //           <Form.Control id="inputfavicon" type="file" className="form-control" />
    //           <Form.Label htmlFor="inputfavicon" className="input-group-text mb-0">
    //             Upload
    //           </Form.Label>
    //         </Form.Group>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    //   {/* Button */}
    //   <div className="d-flex justify-content-end">
    //     <Button variant="primary" onClick={next}>
    //       다음
    //     </Button>
    //   </div>
    // </Form>

    <Form>
      {/* Card */}
      <Card className="mb-3  border-0">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">프로그램 신청서</h4>
        </Card.Header>
        {/* Card body */}
        <Card.Body>
          <CreateProjectForm />
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
