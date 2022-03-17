// import node module libraries
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import {
	Col,
	Row,
	Container,
	Card,
	Form,
	Button,
	ListGroup,
	Badge,
	OverlayTrigger,
	Tooltip
} from 'react-bootstrap';

// import custom components
import { FormSelect } from 'components/elements/form-select/FormSelect';
import PageHeading from 'components/marketing/common/page-headings/PageHeading';

const CourseCheckout = () => {
	const [status, setStatus] = useState(1); // 0: no show, 1: show yes, 2: show no.

	const radioHandler = (status) => {
		setStatus(status);
	};

	const statelist = [
		{ value: '1', label: 'Gujarat' },
		{ value: '2', label: 'Rajasthan' },
		{ value: '3', label: 'Maharashtra' }
	];
	const countrylist = [
		{ value: '1', label: 'India' },
		{ value: '2', label: 'UK' },
		{ value: '3', label: 'USA' }
	];

	// Month select control values
	const months = [
		{ value: 'Jan', label: 'Jan' },
		{ value: 'Feb', label: 'Feb' },
		{ value: 'Mar', label: 'Mar' },
		{ value: 'Apr', label: 'Apr' },
		{ value: 'May', label: 'May' },
		{ value: 'Jun', label: 'Jun' },
		{ value: 'Jul', label: 'Jul' },
		{ value: 'Aug', label: 'Aug' },
		{ value: 'Sep', label: 'Sep' },
		{ value: 'Oct', label: 'Oct' },
		{ value: 'Nov', label: 'Nov' },
		{ value: 'Dec', label: 'Dec' }
	];

	// Year select control values
	const year = [
		{ value: '2021', label: '2021' },
		{ value: '2022', label: '2022' },
		{ value: '2023', label: '2023' },
		{ value: '2024', label: '2024' }
	];

	const CardNumberInput = (props) => (
		<InputMask
			mask="9999-9999-9999-9999"
			placeholder="xxxx-xxxx-xxxx-xxxx"
			value={props.value}
			onChange={props.onChange}
			className="form-control bg-white px-4 p-2"
		>
			{(inputProps) => <Form.Control {...inputProps} type="tel" />}
		</InputMask>
	);

	const onChange = () => {
		console.log('onChange was called!');
	};

	const CreditDebitCardMethod = () => {
		return (
			<Fragment>
				{/*  Form */}
				<Form className="row " id="cardpayment">
					{/*  Card number */}
					<Col md={12} sm={12} className="mb-3 mt-4">
						{/*  Card Number */}
						<Form.Group controlId="formCardNumber">
							<Form.Label className="d-flex justify-content-between align-items-center ">
								Card Number
								<span>
									<i className="fab fa-cc-amex me-1  text-primary"></i>
									<i className="fab fa-cc-mastercard me-1  text-primary"></i>{' '}
									<i className="fab fa-cc-discover me-1  text-primary"></i>{' '}
									<i className="fab fa-cc-visa  text-primary"></i>
								</span>
							</Form.Label>
						</Form.Group>
						<CardNumberInput />

						<small className="text-muted">
							Full name as displayed on card.
						</small>
					</Col>
					{/*  Month */}
					<Col md={4} sm={12} className="mb-3">
						<Form.Group controlId="formMonth">
							<Form.Label>Month</Form.Label>
							<FormSelect options={months} required />
						</Form.Group>
					</Col>
					{/*  Year */}
					<Col md={4} sm={12} className="mb-3">
						<Form.Group controlId="formYear">
							<Form.Label>Year</Form.Label>
							<FormSelect options={year} required />
						</Form.Group>
					</Col>
					{/*  CVV Code */}
					<Col md={4} sm={12} className="mb-3">
						<Form.Group controlId="formCVVCode">
							<Form.Label>
								CVV Code
								<OverlayTrigger
									placement="top"
									overlay={
										<Tooltip id="tooltip-top">
											{' '}
											A 3 - digit number, typically printed on the back of a
											card.
										</Tooltip>
									}
								>
									<i className="fe fe-help-circle ms-1 fs-6"></i>
								</OverlayTrigger>
							</Form.Label>
						</Form.Group>
						<InputMask
							type="password"
							mask="999"
							maskChar={null}
							className="form-control"
							placeholder="xxx"
						/>
					</Col>
					{/*  Name on card */}
					<Col sm={12} md={12} className="mb-3">
						<Form.Group controlId="nameoncard">
							<Form.Label>Name on Card</Form.Label>
							<Form.Control type="text" placeholder="Name" required />
						</Form.Group>
					</Col>
					{/*  Country */}
					<Col md={6} sm={6} className="mb-3">
						<Form.Group controlId="formCountry">
							<Form.Label>Country</Form.Label>
							<FormSelect options={countrylist} />
						</Form.Group>
					</Col>
					{/*  Zip Code */}
					<Col md={6} sm={6} className="mb-3">
						<Form.Group controlId="postalcode">
							<Form.Label>Zip/Postal Code</Form.Label>
							<Form.Control type="text" placeholder="Zipcode" required />
						</Form.Group>
					</Col>
					{/*  CheckBox */}
					<Col md={12} sm={12} className="mb-5">
						{/*  Checkbox  */}
						<Form.Group controlId="customCheck1">
							<Form.Check type="checkbox" label="Remember this card" />
						</Form.Group>
					</Col>
					<Col md={4} sm={12}>
						{/*  Button */}
						<div>
							<Button variant="primary">Make a Payment</Button>
						</div>
					</Col>
					{/*  Text */}
					<Col
						md={8}
						sm={12}
						className="d-flex align-items-center justify-content-end"
					>
						<small className="mb-0">
							By click start learning, you agree to our{' '}
							<Link to="#">Terms of Service and Privacy Policy.</Link>
						</small>
					</Col>
				</Form>
			</Fragment>
		);
	};

	const PayPalMethod = () => {
		return (
			<Fragment>
				{/*  Paypal */}
				<Form id="internetpayment">
					<div className="mb-3 mt-4 ">
						<Form.Group controlId="paypalemail">
							<Form.Label>PayPal</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your PayPal email"
								required
							/>
						</Form.Group>
					</div>
					<Button variant="primary">PayPal Checkout</Button>
				</Form>
			</Fragment>
		);
	};
	return (
		<Fragment>
			{/* Page header */}
			<PageHeading pagetitle="Checkout Page" />

			{/*  Content */}
			<div className="py-6">
				<Container>
					<Row>
						<Col xl={8} lg={8} md={12} sm={12}>
							{/*  Card */}
							<Card className="mb-4">
								{/*  Card header */}
								<Card.Header>
									<h3 className="mb-0">Billing Address </h3>
								</Card.Header>
								{/*  Card body */}
								<Card.Body>
									{/*  Form */}
									<Form className="row">
										{/*  First name  */}
										<Col md={6} sm={12} className="mb-3">
											<Form.Group controlId="fname">
												<Form.Label>First Name</Form.Label>
												<Form.Control
													type="text"
													placeholder="First Name"
													required
												/>
											</Form.Group>
										</Col>
										{/*  Last name  */}
										<Col md={6} sm={12} className="mb-3">
											<Form.Group controlId="lname">
												<Form.Label>Last Name</Form.Label>
												<Form.Control
													type="text"
													placeholder="Last Name"
													required
												/>
											</Form.Group>
										</Col>
										{/*  Phone number  */}
										<Col md={12} sm={12} className="mb-3">
											<Form.Group controlId="phone">
												<Form.Label>
													Phone Number{' '}
													<span className="text-muted">(Optional)</span>
												</Form.Label>
												<Form.Control
													type="text"
													placeholder="Phone"
													required
												/>
											</Form.Group>
										</Col>
										{/*  Address  */}
										<Col md={12} sm={12} className="mb-3">
											<Form.Group controlId="address">
												<Form.Label>Address Line 1</Form.Label>
												<Form.Control
													type="text"
													placeholder="Address"
													required
												/>
											</Form.Group>
										</Col>
										{/*  Address  */}
										<Col md={12} sm={12} className="mb-3">
											<Form.Group controlId="address2">
												<Form.Label>
													Address Line 2{' '}
													<span className="text-muted">(Optional)</span>
												</Form.Label>
												<Form.Control
													type="text"
													placeholder="Address"
													required
												/>
											</Form.Group>
										</Col>
										{/*  State */}
										<Col md={4} sm={12} className="mb-3">
											<Form.Group className="mb-3" controlId="formState">
												<Form.Label>State</Form.Label>
												<FormSelect options={statelist} />
											</Form.Group>
										</Col>
										{/*  Country  */}
										<Col md={4} sm={12} className="mb-3">
											<Form.Group
												className="mb-3"
												controlId="formBillingCountry"
											>
												<Form.Label>Country</Form.Label>
												<FormSelect options={countrylist} />
											</Form.Group>
										</Col>
										{/*  Zip code  */}
										<Col md={4} sm={12} className="mb-3">
											<Form.Group controlId="zipCode">
												<Form.Label>Zip/Postal Code</Form.Label>
												<Form.Control type="text" placeholder="Zip" required />
											</Form.Group>
										</Col>
										<Col sm={12} md={12} lg={12}>
											{/*  Checkbox  */}
											<Form.Group controlId="shippingAddress">
												<Form.Check
													type="checkbox"
													label="Shipping address is the same as my billing address"
												/>
											</Form.Group>
											{/*  Checkbox  */}
											<Form.Group controlId="saveCard">
												<Form.Check
													type="checkbox"
													checked
													label="Save this information for next time"
													onChange={onChange}
												/>
											</Form.Group>
										</Col>
									</Form>
								</Card.Body>
							</Card>
							{/*  Card */}
							<Card className="mb-3 mb-lg-0">
								{/*  Card header */}
								<Card.Header>
									<h3 className="mb-0">Payment Method</h3>
								</Card.Header>
								{/*  Card body */}
								<Card.Body>
									<Form.Check
										inline
										label="Credit or Debit card"
										name="group1"
										type="radio"
										id="inline-radio-1"
										checked={status === 1}
										onChange={(e) => radioHandler(1)}
									/>
									<Form.Check
										inline
										label="PayPal"
										name="group1"
										type="radio"
										id="inline-radio-2"
										checked={status === 2}
										onChange={(e) => radioHandler(2)}
									/>
									{status === 1 ? CreditDebitCardMethod() : ''}
									{status === 2 ? PayPalMethod() : ''}
								</Card.Body>
							</Card>
						</Col>
						<Col lg={4} md={12} sm={12}>
							{/*  Card */}
							<Card className="border-0 mb-3">
								{/*  Card body */}
								<div className="p-5 text-center">
									<Badge bg="warning">Selected Plan</Badge>
									<div className="mb-5 mt-3">
										<h1 className="fw-bold">Individual</h1>
										<p className="mb-0 ">
											Access all{' '}
											<span className="text-dark fw-medium">
												premium courses, workshops, and mobile apps.
											</span>{' '}
											Renewed monthly.
										</p>
									</div>
									<div className="d-flex justify-content-center">
										<span className="h3 mb-0 fw-bold text-primary">$</span>
										<div className="display-4 fw-bold text-primary">39</div>
										<span className=" align-self-end mb-1">/Monthly</span>
									</div>
								</div>
								<hr className="m-0" />
								<div className="p-5">
									<h4 className="fw-bold mb-4">
										Everything in Starter, plus:{' '}
									</h4>
									{/*  List */}
									<ListGroup as="ul" className="mb-0" bsPrefix="list-unstyled">
										<ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
											<span className="text-success me-1">
												<i className="far fa-check-circle"></i>
											</span>
											<span>Offline viewing </span>
										</ListGroup.Item>
										<ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
											<span className="text-success me-1">
												<i className="far fa-check-circle"></i>
											</span>
											<span>
												<span className="fw-bold text-dark">Offline </span>
												projects{' '}
											</span>
										</ListGroup.Item>
										<ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
											<span className="text-success me-1">
												<i className="far fa-check-circle"></i>
											</span>
											<span>
												<span className="fw-bold text-dark">Unlimited </span>
												storage
											</span>
										</ListGroup.Item>
										<ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
											<span className="text-success me-1">
												<i className="far fa-check-circle"></i>
											</span>
											<span>Custom domain support </span>
										</ListGroup.Item>
										<ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
											<span className="text-success me-1">
												<i className="far fa-check-circle"></i>
											</span>
											<span>Bulk editing </span>
										</ListGroup.Item>
										<ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
											<span className="text-success me-1">
												<i className="far fa-check-circle"></i>
											</span>
											<span>12 / 5 support</span>
										</ListGroup.Item>
									</ListGroup>
								</div>
								<hr className="m-0" />
								<div className="p-4">
									<Link to="#" className="btn btn-outline-primary">
										Change the Plan
									</Link>
								</div>
							</Card>
							{/*  Card */}
							<Card className="border-0 mb-3 mb-lg-0">
								{/*  Card body */}
								<Card.Body>
									<h3 className="mb-2">Discount Codes</h3>
									<Form>
										<Form.Group
											className="input-group"
											controlId="discountcodes"
										>
											<Form.Control
												type="text"
												placeholder="Enter your code"
												required
											/>
											<Button variant="secondary" id="couponCode">
												Apply
											</Button>
										</Form.Group>
									</Form>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</Fragment>
	);
};

export default CourseCheckout;
