import { Row, Col, Image } from "react-bootstrap";
import LevelIconWithTooltip from "components/marketing/common/miscellaneous/LevelIconWithTooltip";
import ProfileBackground from "assets/images/background/profile-bg.jpg";

const ProfileCover = (props) => {
  return (
    <Row className="align-items-center">
      <Col xl={12} lg={12} md={12} sm={12}>
        {/* <!-- Bg --> */}
        <div
          className="pt-16 rounded-top-md"
          style={{
            background: `url(${ProfileBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {" "}
        </div>
        <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
          <div className="d-flex align-items-center">
            <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
              <Image src={window.sessionStorage.getItem("profileImg")} className="avatar-xl rounded-circle border border-4 border-white position-relative" alt="" />
              {/* <Image src={dashboardData.avatar} className="avatar-xl rounded-circle border border-4 border-white position-relative" alt="" /> */}
            </div>
            <div className="lh-1">
              <h2 className="mb-0">
                {props.userInfo[0].name}
                <LevelIconWithTooltip level="" />{" "}
              </h2>
              <p className="mb-0 d-block">{props.userInfo[0].email}</p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileCover;
