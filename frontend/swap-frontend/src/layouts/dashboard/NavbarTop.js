// import node module libraries
import { Fragment } from 'react';
import { Menu, Search } from 'react-feather';
import { Link } from 'react-router-dom';
import {
	Nav,
	Navbar,
	InputGroup,
	Dropdown,
	Form,
	ListGroup,
	Row,
	Col,
	OverlayTrigger,
	Tooltip,
	Image
} from 'react-bootstrap';

// import simple bar scrolling used for notification item scrolling
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// import custom components
import DotBadge from 'components/elements/bootstrap/DotBadge';

// import media files
import Avatar1 from 'assets/images/avatar/avatar-1.jpg';

// import data files
import NotificationList from 'data/Notification';

const NavbarTop = (props) => {
	return (
		<Fragment>
			<Navbar expanded="lg" className="navbar-default">
				<div className="d-flex justify-content-between w-100">
					<div className="d-flex align-items-center">
						<Link
							id="nav-toggle"
							to="#"
							onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}
						>
							<Menu size="18px" />
						</Link>
						<div className="ms-lg-3 d-none d-md-none d-lg-block">
							{/* <!-- Form --> */}
							<Form className=" d-flex align-items-center">
								<InputGroup
									className="input-group-merge search-bar"
									bsPrefix="group-of-input"
								>
									<InputGroup.Text className="ps-2 pe-1 mx-2 my-1 h-40 position-absolute search-icon border-0">
										<Search size="12px" className="text-secondary" />
									</InputGroup.Text>
									<Form.Control
										type="search"
										className="form-control form-control-sm ps-6"
										placeholder="Search Entire Dashboard"
									/>
								</InputGroup>
							</Form>
						</div>
					</div>

					<Nav className="navbar-nav navbar-right-wrap ms-auto d-flex align-items-center nav-top-wrap">
						<Dropdown as={Nav.Item}>
							<Dropdown.Toggle
								as={Nav.Link}
								bsPrefix="dt"
								className="text-dark icon-notifications me-lg-2 me-2 btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted"
								id="dropdownNotification"
							>
								<i className="fe fe-bell"></i>
							</Dropdown.Toggle>
							<Dropdown.Menu
								className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end mt-4 py-0"
								aria-labelledby="dropdownNotification"
								align="end"
							>
								<div className="border-bottom px-3 pt-3 pb-3 d-flex justify-content-between align-items-end">
									<span className="h4 mb-0">Notifications</span>
									<Link to="# " className="text-muted">
										<span className="align-middle">
											<i className="fe fe-settings me-1"></i>
										</span>
									</Link>
								</div>
								<SimpleBar style={{ maxHeight: '300px' }}>
									<ListGroup variant="flush">
										{NotificationList.map(function (item, index) {
											return (
												<ListGroup.Item
													className={index === 0 ? 'bg-light' : ''}
													key={index}
												>
													<Row>
														<Col>
															<Link className="text-body" to="#">
																<div className="d-flex">
																	<Image
																		src={item.image}
																		alt=""
																		className="avatar-md rounded-circle"
																	/>
																	<div className="ms-3">
																		<h5 className="fw-bold mb-1">
																			{item.sender}
																		</h5>
																		<p className="mb-3">{item.message}</p>
																		<span className="fs-6 text-muted">
																			<span>
																				<span className="fe fe-thumbs-up text-success me-1"></span>
																				{item.date}
																			</span>
																			<span className="ms-1">{item.time}</span>
																		</span>
																	</div>
																</div>
															</Link>
														</Col>
														<Col className="col-auto text-center me-2">
															<OverlayTrigger
																key="top"
																placement="top"
																overlay={
																	<Tooltip id="tooltip-top">
																		Mark as unread
																	</Tooltip>
																}
															>
																<Link to="#">
																	<DotBadge bg="secondary"></DotBadge>
																</Link>
															</OverlayTrigger>
														</Col>
													</Row>
												</ListGroup.Item>
											);
										})}
									</ListGroup>
								</SimpleBar>
								<div className="border-top px-3 pt-3 pb-3">
									<Link
										to="/authentication/notifications"
										className="text-link fw-semi-bold"
									>
										See all Notifications
									</Link>
								</div>
							</Dropdown.Menu>
						</Dropdown>

						<Dropdown as={Nav.Item}>
							<Dropdown.Toggle
								as={Nav.Link}
								bsPrefix="dt"
								className="rounded-circle border-bottom-0"
								id="dropdownUser"
							>
								<div className="avatar avatar-md avatar-indicators avatar-online">
									<Image
										alt="avatar"
										src={Avatar1}
										className="rounded-circle"
									/>
								</div>
							</Dropdown.Toggle>
							<Dropdown.Menu
								className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
								aria-labelledby="dropdownUser"
								align="end"
							>
								<Dropdown.Item className="mt-3">
									<div className="d-flex">
										<div className="avatar avatar-md avatar-indicators avatar-online">
											<Image
												alt="avatar"
												src={Avatar1}
												className="rounded-circle"
											/>
										</div>
										<div className="ms-3 lh-1">
											<h5 className="mb-1">Annette Black</h5>
											<p className="mb-0 text-muted">annette@geeksui.com</p>
										</div>
									</div>
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="2">
									<i className="fe fe-user me-2"></i> Profile
								</Dropdown.Item>
								<Dropdown.Item eventKey="3">
									<i className="fe fe-star me-2"></i> Subscription
								</Dropdown.Item>
								<Dropdown.Item>
									<i className="fe fe-settings me-2"></i> Settings
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item className="mb-3">
									<i className="fe fe-power me-2"></i> Sign Out
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Nav>
				</div>
			</Navbar>
		</Fragment>
	);
};

export default NavbarTop;
