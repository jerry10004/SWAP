import React, { useState, Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// import custom components
import GKStepper from "components/elements/stepper/GKStepper";

// import sub components ( Steps )
import BasicInformation from "components/marketing/pages/courses/add-new-course/steps/BasicInformation";
import CoursesMedia from "components/marketing/pages/courses/add-new-course/steps/ApplicationForm";
import ApplicationFormPractice from "pages/ApplicationFormPractice";

import ApplicationForm from "components/marketing/pages/courses/add-new-course/steps/ApplicationForm";
const AddNewCourse = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [poster, setPoster] = useState();
  const [files, setFiles] = useState();
  const [start_date, setStart_date] = useState(new Date());
  const [end_date, setEnd_date] = useState(new Date());
  const [Applystart_date, setApplyStart_date] = useState(new Date());
  const [Applyend_date, setApplyEnd_date] = useState(new Date());
  const [validated, setValidated] = useState(false);
  const [preview, setPreview] = useState();
  const [formData, setFormData] = useState({
    program_title: "Title",
    program_category: "1",
    program_description: "Hello, world!",
    program_quota: "0",
    program_img: "img",
    start_date: "",
    end_date: "",
    Applystart_date: "",
    Applyend_date: "",
    manager_name: "",
    manager_contact: "",
    application_form: "",
    poster: "",
  });

  const onLoadPoster = async (e) => {
    setPoster(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const onLoadFile = async (e) => {
    setFiles(e.target.files);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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

  const next = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setCurrentStep(currentStep === 4 ? 1 : currentStep + 1);
    }
    setValidated(true);
  };
  const previous = () => {
    setCurrentStep(currentStep === 1 ? 1 : currentStep - 1);
  };

  const addProgram = async (form) => {
    var params = new URLSearchParams();
    var formattedStartDate = getFormatDate(start_date);
    var formattedEndDate = getFormatDate(end_date);
    var formattedApplyStartDate = getFormatDate(Applystart_date);
    var formattedApplyEndDate = getFormatDate(Applyend_date);

    const imgFormData = new FormData();
    if (poster != null) {
      imgFormData.append("img", poster);
    }

    const fileFormData = new FormData();
    if (files != null) {
      for (var i = 0; i < files.length; i++) {
        fileFormData.append("attach_file", files[i]);
      }
    }

    params.append("admin_id", "8");
    params.append("category_id", formData.program_category);
    // params.append("application_form", formData.application_form);
    params.append("program_quota", formData.program_quota);
    params.append("program_name", formData.program_title);
    params.append("information", formData.program_description);
    params.append("start_date", formattedStartDate);
    params.append("end_date", formattedEndDate);
    params.append("Applystart_date", formattedApplyStartDate);
    params.append("Applyend_date", formattedApplyEndDate);
    params.append("manager_name", formData.manager_name);
    params.append("manager_contact", formData.manager_contact);
    params.append("application_form", form);
    if (window.confirm("프로그램을 추가하시겠습니까?")) {
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/add", params).then((response) => {
        console.log("응답: " + response.data);
        // 포스터 업로드
        if (poster != null) {
          imgFormData.append("program_id", response.data);
          imgFormData.append("file_name", poster.name);
          // 0: 파일 1: 이미지
          imgFormData.append("file_type", "1");

          const posterRes = axios({
            url: process.env.REACT_APP_RESTAPI_HOST + "program/addPoster",
            cache: false,
            contentType: false,
            processData: false,
            data: imgFormData,
            method: "post",
            headers: { "Content-Type": "multipart/form-data" },
            success: function (posterRes) {
              console.log(posterRes);
            },
            error: function (error) {
              console.log(error);
            },
          });
        }

        //파일 업로드
        if (files != null) {
          fileFormData.append("program_id", response.data);
          for (var i = 0; i < files.length; i++) {
            fileFormData.append("file_name", files[i].name);
          }
          // 0: 파일 1: 이미지
          fileFormData.append("file_type", "0");
          const filesRes = axios({
            url: process.env.REACT_APP_RESTAPI_HOST + "program/addFiles",
            cache: false,
            contentType: false,
            processData: false,
            data: fileFormData,
            method: "post",
            headers: { "Content-Type": "multipart/form-data" },
            success: function (filesRes) {
              console.log(filesRes);
            },
            error: function (error) {
              console.log(error);
            },
          });
        }
      });

      alert(formData.program_title + " 프로그램이 추가 되었습니다.");

      navigate("/admin/program");
    }
  };

  const steps = [
    {
      id: 1,
      title: "프로그램 기본 정보 작성",
      content: (
        <BasicInformation
          data={formData}
          handleChange={handleChange}
          setStart_date={setStart_date}
          setEnd_date={setEnd_date}
          setApplyStart_date={setApplyStart_date}
          setApplynd_date={setApplyEnd_date}
          next={next}
          validated={validated}
          setValidated={setValidated}
          preview={preview}
          onLoadPoster={onLoadPoster}
          onLoadFile={onLoadFile}
        />
      ),
    },
    {
      id: 2,
      title: "프로그램 신청서 Form 선택",
      // content: <CoursesMedia data={formData} handleChange={handleChange} setStart_date={setStart_date} setEnd_date={setEnd_date} submit={addProgram} previous={previous} />,
      content: <ApplicationFormPractice data={formData} handleChange={handleChange} setEnd_date={setEnd_date} previous={previous} submit={addProgram} />,
      // content: <FormBuilder />,
      // content: <ApplicationForm data={formData} handleChange={handleChange} setStart_date={setStart_date} setEnd_date={setEnd_date} submit={addProgram} previous={previous} />,
    },
    // {
    //   id: 3,
    //   title: "프로그램 설문지 Form 제작",
    //   content: <Curriculum data={formData} handleChange={handleChange} next={next} previous={previous} />,
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
                </div>
                <div>
                  <Link to="../admin/program" className="btn btn-white ">
                    프로그램 목록 보기
                  </Link>{" "}
                  {/* 저장 기능 나중에 추가 */}
                  {/* <Link to="#" className="btn btn-success ">
                    저장
                  </Link> */}
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
