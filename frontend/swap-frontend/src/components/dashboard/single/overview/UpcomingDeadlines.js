// import node module libraries
import { Card, Table, ProgressBar, Image } from 'react-bootstrap';

// import data files
import UpcomingDeadlinesData from 'data/dashboard/projects/UpcomingDeadlinesData';

const UpcomingDeadlines = () => {
	return (
		<Card>
			<Card.Header>
				<h4 className="mb-0">Upcoming Deadlines</h4>
			</Card.Header>

			{/* table */}
			<div className="table-responsive overflow-y-hidden">
				<Table className="table mb-0 text-nowrap">
					<thead className="table-light">
						<tr>
							<th scope="col" className="border-top-0">
								Member
							</th>
							<th scope="col" className="border-top-0 ">
								Task
							</th>
							<th scope="col" className="border-top-0 ">
								Deadline{' '}
							</th>
							<th scope="col" className="border-top-0 ">
								Workload
							</th>
						</tr>
					</thead>
					<tbody>
						{UpcomingDeadlinesData.map((item, index) => {
							return (
								<tr key={index}>
									<td className="align-middle">
										<div className="d-flex align-items-center">
											<div className="avatar avatar-sm">
												<Image
													src={item.memberimage}
													alt=""
													className="rounded-circle"
												/>
											</div>
											<div className="ms-2">
												<h5 className="mb-0">{item.member}</h5>
											</div>
										</div>
									</td>
									<td className="align-middle ">{item.task}</td>
									<td className="align-middle ">{item.deadline}</td>
									<td className="align-middle ">
										<div className="d-flex align-items-center">
											<ProgressBar
												className="flex-auto"
												style={{ height: '6px' }}
											>
												<ProgressBar variant="success" now={item.workload} />
											</ProgressBar>
											<div className="ms-2">
												{' '}
												<span>{item.workload}%</span>
											</div>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</Card>
	);
};
export default UpcomingDeadlines;
