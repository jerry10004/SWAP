// import node module libraries
import { Fragment } from 'react';
import { Container } from 'react-bootstrap';

// import custom components
import LogosTopHeading from 'components/marketing/common/clientlogos/LogosTopHeading';

// import sub components
import Features4Columns from './Features4Columns';
import BrowseCategories from './BrowseCategories';
import WorldClassInstructors from './WorldClassInstructors';
import HeroTyped from './HeroTyped';
import BecomeInstructor from './BecomeInstructor';
import TestimonialSection from './TestimonialSection';

// import layouts
import NavbarDefault from 'layouts/marketing/navbars/NavbarDefault';
import FooterLandings from 'layouts/marketing/footers/FooterLandings';

// import required data files
import LogoList2 from 'data/marketing/clientlogos/LogoList2';

const LandingCourses = () => {
	return (
		<Fragment>
			{/* Default Navbar */}
			<NavbarDefault />

			{/* Page Content */}
			<HeroTyped />

			{/*  Featured in section */}
			<LogosTopHeading title="Featured In" logos={LogoList2} />

			{/* Why learn with geeks */}
			<Features4Columns />

			{/* Browse Categories Section  */}
			<BrowseCategories />

			<hr className="my-0" />

			{/*  World Class Instructors Section  */}
			<WorldClassInstructors />

			<div className="py-8 py-lg-16 bg-white">
				{/*  Become an Instructor  */}
				<BecomeInstructor />

				<Container>
					<hr className="my-10 my-lg-16" />
					{/*  Testimonials start */}
					<TestimonialSection />
				</Container>
			</div>

			{/* Footer with CTA section */}
			<FooterLandings />
		</Fragment>
	);
};
export default LandingCourses;
