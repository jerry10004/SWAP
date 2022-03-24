// import node module libraries
import { Card, Form, Button } from "react-bootstrap";

// import custom components
import { FormSelect } from "components/elements/form-select/FormSelect";
import ReactQuillEditor from "components/elements/editor/ReactQuillEditor";

const BasicInformation = (props) => {
  const { next } = props;

  const categoryOptions = [
    { value: "대회", label: "대회" },
    { value: "봉사", label: "봉사" },
    { value: "캠프", label: "캠프" },
    { value: "동아리", label: "동아리" },
    { value: "행사", label: "행사" },
    { value: "기타", label: "기타" },
  ];

  const CoursesLevel = [
    { value: "Intermediate", label: "Intermediate" },
    { value: "Beignners", label: "Beignners" },
    { value: "Advance", label: "Advance" },
  ];

  const initialValue = `<p>프로그램에 대한 상세 설명을 작성해주세요.</p>`;

  return (
    <Form>
      {/* Card */}
      <Card className="mb-3 ">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">프로그램 기본 정보</h4>
        </Card.Header>
        {/* Card body */}
        <Card.Body>
          {/* Title  */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="program_title">프로그램 제목</Form.Label>
            <Form.Control type="text" placeholder="프로그램 제목" id="program_title" name="program_title" />
            {/* <Form.Text className="text-muted">Write a 60 character course title.</Form.Text> */}
          </Form.Group>

          {/* Category */}
          <Form.Group className="mb-3">
            <Form.Label>프로그램 카테고리</Form.Label>
            <FormSelect options={categoryOptions} id="program_category" name="program_category" placeholder="카테고리를 선택하세요." />
            {/* <Form.Text className="text-muted">Help people find your courses by choosing categories that represent your course.</Form.Text> */}
          </Form.Group>

          {/* Courses level */}
          {/* <Form.Group className="mb-3">
            <Form.Label>Courses level</Form.Label>
            <FormSelect options={CoursesLevel} id="courses_level" name="courses_level" placeholder="Select level" />
          </Form.Group> */}

          {/* Course Description*/}
          <Form.Group className="mb-3">
            <Form.Label>프로그램 설명</Form.Label>
            <ReactQuillEditor initialValue={initialValue} id="program_description" name="program_description" />
            {/* <Form.Text className="text-muted">A brief summary of your courses.</Form.Text> */}
          </Form.Group>

          {/* 프로그램 포스터 이미지 업로드 */}
          <Form.Label>프로그램 포스터(이미지) 업로드</Form.Label>
          <Form.Group className="mb-1 input-group">
            <Form.Control id="inputfavicon" type="file" className="form-control" />
            <Form.Label htmlFor="inputfavicon" className="input-group-text mb-0">
              Upload
            </Form.Label>
          </Form.Group>
        </Card.Body>
      </Card>
      {/* Button */}
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={next}>
          Next
        </Button>
      </div>
    </Form>
  );
};
export default BasicInformation;
