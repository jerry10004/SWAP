// import node module libraries
import { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';

// import sub components
import Version010000 from './Version010000';
import Version010100 from './Version010100';
import Version010200 from './Version010200';

const ChangeLog = () => {
	return (
		<Fragment>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-0 h2 fw-bold">Changelog</h1>
							<p className="mb-0">
								We’re constantly improving & updating Geeks. See the latest
								features and improvements.
							</p>
						</div>
					</div>
				</Col>
			</Row>

			<Version010200 />

			<hr className="my-5" />

			<Version010100 />

			<hr className="my-5" />

			<Version010000 />
		</Fragment>
	);
};

export default ChangeLog;
