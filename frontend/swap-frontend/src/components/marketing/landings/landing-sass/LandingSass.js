// import node module libraries
import { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';

// import sub components
import HeroGradient from './HeroGradient';
import Features4Columns from './Features4Columns';
import AppIntegration from './AppIntegration';
import CustomersTestimonials from './CustomersTestimonials';
import SimplePricingPlans from './SimplePricingPlans';
import HeroLeftImage from './HeroLeftImage';
import HeroRightImage from './HeroRightImage';
import CTADarkBG from 'components/marketing/common/call-to-action/CTADarkBG';

// import layouts
import NavbarLanding from 'layouts/marketing/navbars/NavbarLanding';
import FooterCenter from 'layouts/marketing/footers/FooterWithLinks';

const LandingSass = () => {
	useEffect(() => {
		document.body.className = 'bg-white';
	});

	const title = 'Just try it out! You’ll fall in love';
	const subtitle = 'Get things done';
	const description = `Designed for modern companies looking to launch a simple, premium and modern website and apps.`;
	const btntext = 'Try For Free';
	const btnlink = '#';

	return (
		<Fragment>
			{/* Landing Page Navbar */}
			<NavbarLanding transparent />

			{/* hero gradient */}
			<HeroGradient />

			{/* features */}
			<Features4Columns />

			{/* image sections */}
			<div className="pb-lg-16 pb-8">
				<Container>
					{/* hero with left side image */}
					<HeroLeftImage />

					{/* divider */}
					<hr className="my-lg-12 my-8" />

					{/* hero with right side image */}
					<HeroRightImage />
				</Container>
			</div>

			{/* integrate with the apps */}
			<AppIntegration />

			<div className="pt-lg-16 pb-lg-14 pt-8 pb-8">
				<Container>
					{/* customer's testimonials  */}
					<CustomersTestimonials />

					{/* divider  */}
					<hr className="my-lg-12 my-8" />

					{/* simple pricing plans */}
					<SimplePricingPlans />
				</Container>
			</div>

			{/* cta with bg color  */}
			<CTADarkBG
				title={title}
				description={description}
				subtitle={subtitle}
				btntext={btntext}
				btnlink={btnlink}
			/>

			{/* Footer with center alignment */}
			<FooterCenter />
		</Fragment>
	);
};

export default LandingSass;
