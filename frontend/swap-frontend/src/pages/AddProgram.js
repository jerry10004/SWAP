// import node module libraries
import React, { useState, Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// import custom components
import GKStepper from "components/elements/stepper/GKStepper";

// import sub components ( Steps )
import BasicInformation from "components/marketing/pages/courses/add-new-course/steps/BasicInformation";
import CoursesMedia from "components/marketing/pages/courses/add-new-course/steps/ApplicationForm";
import Curriculum from "components/marketing/pages/courses/add-new-course/steps/SurveyForm";
import Settings from "components/marketing/pages/courses/add-new-course/steps/Settings";

const AddNewCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    program_title: "Title",
    program_category: "1",
    program_description: "Hello, world!",
    program_img: "img",
    start_date: "",
    end_date: "",
  });

  const [start_date, setStart_date] = useState(new Date());

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    // setStart_date(start_date);

    // console.log(event.target.value);
    // console.log(start_date);
  };

  const next = () => {
    setCurrentStep(currentStep === 4 ? 1 : currentStep + 1);
  };
  const previous = () => {
    setCurrentStep(currentStep === 1 ? 1 : currentStep - 1);
  };

  const addProgram = async () => {
    var params = new URLSearchParams();
    params.append("category_id", "1");
    params.append("program_name", formData.program_title);
    params.append("information", formData.program_description);
    params.append("start_date", "20 08:03");
    params.append("end_date", "20 08:03");
  };

  //   if (window.confirm("프로그램을 추가하시겠습니까?")) {
  //     console.log("----------------------");
  //     const response = await axios.post("http://localhost:8080/swap/program/add", params);
  //     console.log("++++++++++++++++++++++");
  //     alert(response.data);
  //   }
  // };

  const steps = [
    {
      id: 1,
      title: "프로그램 기본 정보 작성",
      content: <BasicInformation data={formData} handleChange={handleChange} setStart_date={setStart_date} next={next} />,
    },
    {
      id: 2,
      title: "프로그램 신청서 Form 제작",
      content: <CoursesMedia data={formData} handleChange={handleChange} next={addProgram} previous={previous} />,
    },
    // {
    //   id: 3,
    //   title: "프로그램 설문지 Form 제작",
    //   content: <Curriculum data={formData} handleChange={handleChange} next={next} previous={previous} />,
    // },
    // {
    //   id: 4,
    //   title: "Settings",
    //   content: <Settings data={formData} handleChange={handleChange} next={next} previous={previous} />,
    // },
  ];

  return (
    <Fragment>
      <div className="py-4 py-lg-6 bg-primary">
        <Container>
          <Row>
            <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
              <div className="d-lg-flex align-items-center justify-content-between">
                <div className="mb-4 mb-lg-0">
                  <h1 className="text-white mb-1">새 프로그램 추가</h1>
                  {/* <p className="mb-0 text-white lead">Just fill the form and create your courses.</p> */}
                </div>
                <div>
                  <Link to="#" className="btn btn-white ">
                    프로그램 목록 보기
                  </Link>{" "}
                  <Link to="#" className="btn btn-success ">
                    저장
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <GKStepper currentStep={currentStep} steps={steps} />
    </Fragment>
  );
};

export default AddNewCourse;
