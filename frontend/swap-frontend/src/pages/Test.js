import React, { useState, useEffect } from "react";
import axios from "axios";
// import Pagination from "react-js-pagination";
// import ReactLoading from "react-loading";

// import '../../../assets/css/table.css';
// import '../../../assets/css/default.css';
// import '../../../assets/css/admin_user.css';
// import GreyButton from '../../modules/button/admin_grey_btn';
import CommonModal from "./CommonModal";

function Test() {
  const [adminInfo, setAdminInfo] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);
  const postsPerPage = 10;
  const [isModalOpen, setisModalOpen] = useState(false);

  const [addEmail, setAddEmail] = useState(null);
  const [addName, setAddName] = useState(null);
  const [addPhone, setAddPhone] = useState(null);
  const [addEmailYN, setAddEmailYN] = useState(0);

  //   useEffect(() => {
  //     readAdministrator();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const readAdministrator = async () => {
    if (keyword !== null) {
      const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "administrator", {
        params: {
          keyword: encodeURI(keyword),
          token: window.sessionStorage.getItem("token"),
          manageID: window.sessionStorage.getItem("id"),
        },
      });
      setAdminInfo(response.data);
    } else {
      const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "administrator", {
        parmas: {
          token: window.sessionStorage.getItem("token"),
          manageID: window.sessionStorage.getItem("id"),
        },
      });
      setAdminInfo(response.data);
    }
  };

  const editMailYN = async (id, value) => {
    if (window.confirm("이메일 여부를 변경하시겠습니까?")) {
      axios({
        url: process.env.REACT_APP_RESTAPI_HOST + "administrator/" + id,
        method: "put",
        data: {
          editValue: value,
          token: window.sessionStorage.getItem("token"),
          manageID: window.sessionStorage.getItem("id"),
        },
      }).then(function (res) {
        alert("변경되었습니다.");
        //readAdministrator();
      });
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  function currentPosts(tmp) {
    var indexOfLast = page * postsPerPage;
    var indexOfFirst = indexOfLast - postsPerPage;

    let currentPosts = 0;
    currentPosts = adminInfo.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const removeAdministrator = async (id, email) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios({
        url: process.env.REACT_APP_RESTAPI_HOST + "administrator/del_date/" + id,
        method: "put",
        data: {
          email: email,
          token: window.sessionStorage.getItem("token"),
          manageID: window.sessionStorage.getItem("id"),
        },
      }).then(function (res) {
        alert("변경되었습니다.");
        readAdministrator();
      });
    }
  };

  const openModal = () => {
    setisModalOpen(true);
  };

  const closeModal = () => {
    setisModalOpen(false);
  };

  const createAdministrator = async () => {
    var params = new URLSearchParams();
    params.append("email", addEmail);
    params.append("phone", addPhone);
    params.append("name", addName);

    if (window.confirm("관리자를 추가하시겠습니까?")) {
      const response = await axios.post(
        "http://localhost:8080/swap/admin", //[loginID]로그인 후 변경
        params
      );
      alert(response.data);
      //   readAdministrator();
      closeModal();
    }
  };
  return (
    <div>
      <p className="admin-title-header">관리자 관리</p>
      <div className="admin-content-wrapper">
        <div className="table-wrapper mt0 relative">
          <p className="table-name mb40">관리자 관리</p>

          <div className="mb35">
            <input
              className="mr15 p48 w450"
              type="text"
              placeholder="관리자 이름 or 연락처 or 이메일로 키워드 검색"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <button className="admin-add-button" onClick={openModal}>
              관리자 추가
            </button>
          </div>
          <CommonModal open={isModalOpen} close={closeModal} func={createAdministrator} header="관리자 추가하기" footer="추가하기">
            <div className="lecture-info-wrapper">
              <div className="p4030">
                <div className="lecture-grid-layout2 mb15">
                  <span className="lecture-info-title">이메일</span>
                  <input
                    className="lecture-input mr15"
                    onChange={(e) => {
                      setAddEmail(e.target.value);
                    }}
                  />
                  <span className="lecture-info-title">이름</span>
                  <input
                    className="lecture-input mr15"
                    onChange={(e) => {
                      setAddName(e.target.value);
                    }}
                  />
                  <span className="lecture-info-title">연락처</span>
                  <input
                    className="lecture-input mr15"
                    onChange={(e) => {
                      setAddPhone(e.target.value);
                    }}
                  />
                  <span className="lecture-info-title">이메일 여부</span>
                  <select
                    onChange={(e) => {
                      setAddEmailYN(e.target.value);
                    }}
                    defaultValue="0"
                  >
                    <option value="1">O</option>
                    <option value="0">X</option>
                  </select>
                </div>
              </div>
            </div>
          </CommonModal>

          <div className="mt50 table-row-admin">
            <span className="th user-index"></span>
            <span className="th">이름</span>
            <span className="th">이메일</span>
            <span className="th user-date">연락처</span>
            <span className="th user-access">이메일 여부</span>
          </div>
          {/* {adminInfo !== null ? (
            currentPosts(adminInfo).map((data, index) => (
              <div className="table-row-admin" key={index}>
                <span className="td user-index">{index + 1 + (page - 1) * postsPerPage}</span>
                <span className="td">{data.name}</span>
                <span className="td">{data.email}</span>
                <span className="td user-date">{data.phone}</span>
                <span className="td user-access">
                  <select
                    onChange={(e) => {
                      editMailYN(data.id, e.target.value);
                    }}
                    defaultValue={data.emailYN}
                  >
                    <option value="1">O</option>
                    <option value="0">X</option>
                  </select>
                  <button
                    className="admin-remove-button"
                    onClick={() => {
                      removeAdministrator(data.id, data.email);
                    }}
                  >
                    X
                  </button>
                </span>
              </div>
            ))
          ) : (
            <div className="lecture-loading"></div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Test;
