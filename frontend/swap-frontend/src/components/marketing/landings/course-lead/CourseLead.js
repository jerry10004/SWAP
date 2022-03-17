// import node module libraries
import { Fragment } from 'react';

// import custom components
import LogosTopHeading from 'components/marketing/common/clientlogos/LogosTopHeading';

// import sub components
import HeroFormRight from './HeroFormRight';
import TestimonialSection from './TestimonialSection';
import FeaturesWithBullets from './FeaturesWithBullets';
import CourseDescriptionSection from './CourseDescriptionSection';
import FAQsection from './FAQsection';
import YourInstructor from './YourInstructor';

// import layouts
import NavbarDefault from 'layouts/marketing/navbars/NavbarDefault';
import FooterLandings from 'layouts/marketing/footers/FooterLandings';

// import data files
import LogoList2 from 'data/marketing/clientlogos/LogoList2';

const CourseLead = () => {
	return (
		<Fragment>
			{/* Default Navbar */}
			<NavbarDefault headerstyle="dark" />

			{/* Hero section with right form */}
			<HeroFormRight />

			{/* Feature section with bullet  */}
			<FeaturesWithBullets />

			{/* Course description section  */}
			<CourseDescriptionSection />

			{/* Your instructor section */}
			<YourInstructor />

			{/*  Logo section */}
			<LogosTopHeading
				title="Trusted by top-tier product companies"
				logos={LogoList2}
			/>

			{/* Testimonial slider section */}
			<TestimonialSection />

			{/*  FAQs section */}
			<FAQsection />

			{/* Footer with CTA section */}
			<FooterLandings />
		</Fragment>
	);
};
export default CourseLead;
