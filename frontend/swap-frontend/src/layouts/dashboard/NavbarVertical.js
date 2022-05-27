// import node module libraries
import { Fragment, useContext, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ListGroup, Accordion, Card, Image, Badge, useAccordionButton, AccordionContext } from "react-bootstrap";

// import simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
// import custom components
import axios from "axios";
// import media files
import InverseLogo from "assets/images/SWAPInverted.png";

import { v4 as uuid } from "uuid";

export const DashboardMenu = [
  {
    id: uuid(),
    title: "프로그램",
    icon: "clipboard",
    link: "/swap/admin/program",
  },
  {
    id: uuid(),
    title: "신청서 템플릿",
    icon: "book",
    link: "/swap/admin/application",
  },
  {
    id: uuid(),
    title: "설문지 템플릿",
    icon: "book",
    link: "/swap/admin/survey",
  },
];

export const DashboardSuperMenu = [
  {
    id: uuid(),
    title: "프로그램",
    icon: "clipboard",
    link: "/swap/admin/program",
  },
  {
    id: uuid(),
    title: "신청서 템플릿",
    icon: "book",
    link: "/swap/admin/application",
  },
  {
    id: uuid(),
    title: "설문지 템플릿",
    icon: "book",
    link: "/swap/admin/survey",
  },
  {
    id: uuid(),
    title: "사용자",
    icon: "user",
    link: "/swap/admin/user",
  },
];

const NavbarVertical = (props) => {
  const [Menu, setMenu] = useState([]);
  var ID = parseInt(window.sessionStorage.getItem("id"));

  useLayoutEffect(() => {
    readInformation();
    // readApplicantInformation(ID);
  }, []);

  const readInformation = () => {
    if (window.sessionStorage.getItem("status") === "-2") setMenu(DashboardSuperMenu);
    else setMenu(DashboardMenu);
  };

  const location = useLocation();

  const [applicantInformation, setApplicantInformation] = useState(null);

  const readApplicantInformation = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    setApplicantInformation(response.data);
    if (response.data[0].status === 0) {
      setMenu(DashboardMenu);
    } else if (response.data[0].status === -2) {
      setMenu(DashboardSuperMenu);
    }
    console.log(Menu);
  };

  const CustomToggle = ({ children, eventKey, icon }) => {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, () => console.log("totally custom!"));
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
      <li className="nav-item">
        <Link
          className="nav-link "
          onClick={decoratedOnClick}
          to="#!"
          data-bs-toggle="collapse"
          data-bs-target="#navDashboard"
          aria-expanded={isCurrentEventKey ? true : false}
          aria-controls="navDashboard"
        >
          <i className={`nav-icon fe fe-${icon} me-2`}></i> {children}
        </Link>
      </li>
    );
  };
  const CustomToggleLevel2 = ({ children, eventKey, icon }) => {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, () => console.log("totally custom!"));
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
      <Link
        className="nav-link "
        onClick={decoratedOnClick}
        to="#!"
        data-bs-toggle="collapse"
        data-bs-target="#navDashboard"
        aria-expanded={isCurrentEventKey ? true : false}
        aria-controls="navDashboard"
      >
        {children}
      </Link>
    );
  };

  const generateLink = (item) => {
    return (
      <Link className={`nav-link ${location.pathname === item.link ? "active" : ""}`} to={item.link} onClick={(e) => (isMobile ? props.onClick(!props.showMenu) : props.showMenu)}>
        {item.name}
        {""}
        {item.badge ? (
          <Badge className="ms-1" bg={item.badgecolor ? item.badgecolor : "primary"}>
            {item.badge}
          </Badge>
        ) : (
          ""
        )}
      </Link>
    );
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Fragment>
      <SimpleBar style={{ maxHeight: "100vh" }}>
        <div className="nav-scroller ">
          <Link className="navbar-brand" to="/swap/">
            <Image src={InverseLogo} alt="" />
          </Link>
        </div>
        {/* Dashboard Menu */}
        <Accordion defaultActiveKey="0" as="ul" className="navbar-nav flex-column fs-4">
          {Menu.map(function (menu, index) {
            if (menu.grouptitle) {
              return (
                <Card bsPrefix="nav-item" key={index}>
                  {/* group title item */}
                  <div className="navbar-heading">{menu.title}</div>
                  {/* end of group title item */}
                </Card>
              );
            } else {
              if (menu.children) {
                return (
                  <Fragment key={index}>
                    {/* main menu / menu level 1 / root items */}
                    <CustomToggle eventKey={index} icon={menu.icon}>
                      {menu.title}
                      {menu.badge ? (
                        <Badge className="ms-1" bg={menu.badgecolor ? menu.badgecolor : "primary"}>
                          {menu.badge}
                        </Badge>
                      ) : (
                        ""
                      )}
                    </CustomToggle>
                    <Accordion.Collapse eventKey={index} as="li" bsPrefix="nav-item">
                      <ListGroup as="ul" bsPrefix="" className="nav flex-column">
                        {menu.children.map(function (menuItem, menuItemIndex) {
                          if (menuItem.children) {
                            return (
                              <ListGroup.Item as="li" bsPrefix="nav-item" key={menuItemIndex}>
                                {/* second level menu started  */}
                                <Accordion defaultActiveKey="0" className="navbar-nav flex-column">
                                  <CustomToggleLevel2 eventKey={0}>
                                    {menuItem.title}
                                    {menuItem.badge ? (
                                      <Badge className="ms-1" bg={menuItem.badgecolor ? menuItem.badgecolor : "primary"}>
                                        {menuItem.badge}
                                      </Badge>
                                    ) : (
                                      ""
                                    )}
                                  </CustomToggleLevel2>
                                  <Accordion.Collapse eventKey={0} bsPrefix="nav-item">
                                    <ListGroup as="ul" bsPrefix="" className="nav flex-column">
                                      {/* third level menu started  */}
                                      {menuItem.children.map(function (subMenuItem, subMenuItemIndex) {
                                        return (
                                          <ListGroup.Item key={subMenuItemIndex} as="li" bsPrefix="nav-item">
                                            {generateLink(subMenuItem)}
                                          </ListGroup.Item>
                                        );
                                      })}
                                      {/* end of third level menu  */}
                                    </ListGroup>
                                  </Accordion.Collapse>
                                </Accordion>
                                {/* end of second level menu */}
                              </ListGroup.Item>
                            );
                          } else {
                            return (
                              <ListGroup.Item as="li" bsPrefix="nav-item" key={menuItemIndex}>
                                {/* first level menu items */}
                                {generateLink(menuItem)}
                                {/* end of first level menu items */}
                              </ListGroup.Item>
                            );
                          }
                        })}
                      </ListGroup>
                    </Accordion.Collapse>
                    {/* end of main menu / menu level 1 / root items */}
                  </Fragment>
                );
              } else {
                return (
                  <Card bsPrefix="nav-item" key={index}>
                    {/* menu item without any childern items like Documentation and Changelog items*/}
                    <Link to={menu.link} className={`nav-link ${location.pathname === menu.link ? "active" : ""}`}>
                      <i className={`nav-icon fe fe-${menu.icon} me-2`}></i> {menu.title}
                      {menu.badge ? (
                        <Badge className="ms-1" bg={menu.badgecolor ? menu.badgecolor : "primary"}>
                          {menu.badge}
                        </Badge>
                      ) : (
                        ""
                      )}
                    </Link>
                  </Card>
                );
              }
            }
          })}
        </Accordion>
      </SimpleBar>
    </Fragment>
  );
};

export default NavbarVertical;
