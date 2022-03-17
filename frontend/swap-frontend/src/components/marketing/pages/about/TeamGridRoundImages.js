// Section : Team Section
// Style : Grid with round images

// import node module libraries
import { Col, Row, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import tippy tooltip
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';

// import data files
import OurTeamData from 'data/marketing/AboutusOurTeamData';

const TeamGridRoundImages = () => {
	return (
		<div className="py-lg-16 py-10 bg-white">
			<Container>
				<Row>
					<Col md={6} sm={12} className="offset-right-md-6 mb-10">
						{/* <!-- heading --> */}
						<h2 className="display-4 mb-3 fw-bold">Our Team</h2>
						{/* <!-- lead --> */}
						<p className="lead mb-5">
							Want to work with some of the best global talent and build a tool
							used by all the companies you know and love? Join the Geeks team
							and help shape the future of design.
						</p>
						{/* <!-- btn --> */}
						<Link to="#" className="btn btn-primary">
							Openings
						</Link>
					</Col>
				</Row>
				<Row>
					{OurTeamData.map((item, index) => (
						<Col md={2} sm={3} key={index} className="col-3">
							<div className="p-xl-5 p-lg-3 mb-3 mb-lg-0">
								<Tippy
									content={
										<div>
											<h4 className="mb-0 fw-bold">{item.name}</h4>
											<span>{item.designation} </span>
										</div>
									}
									theme={'light'}
									animation={'scale'}
								>
									<Image
										src={item.image}
										alt=""
										className="imgtooltip img-fluid rounded-circle"
									/>
								</Tippy>
							</div>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
};

export default TeamGridRoundImages;
