// ** Import from react dom
import { Route, Switch } from 'react-router-dom';

// ** Import core SCSS styles
import 'assets/scss/theme.scss';

// ** Import Layouts
import DashboardIndex from 'layouts/dashboard/DashboardIndex';
import AuthLayout from 'layouts/dashboard/AuthLayout';

// ** Import Dahbaord Menu Pages
import Overview from 'components/dashboard/overview/Overview';
import Analytics from 'components/dashboard/analytics/Analytics';

// ** Import Courses Pages
import AllCourses from 'components/dashboard/courses/all-courses/AllCourses';
import CoursesCategory from 'components/dashboard/courses/CoursesCategory';
import CategorySingle from 'components/dashboard/courses/CategorySingle';

// ** Import Users Pages
import Instructor from 'components/dashboard/user/Instructor';
import Students from 'components/dashboard/user/Students';

// ** Import CMS Pages
import CMSDashboard from 'components/dashboard/cms/CMSDashboard';
import AllPosts from 'components/dashboard/cms/all-posts/AllPosts';
import AddNewPost from 'components/dashboard/cms/AddNewPost';
import Category from 'components/dashboard/cms/Category';

// ** Import Authentication components
import SignIn from 'components/dashboard/authentication/SignIn';
import SignUp from 'components/dashboard/authentication/SignUp';
import ForgetPassword from 'components/dashboard/authentication/ForgetPassword';
import Notifications from 'components/dashboard/authentication/Notifications';

// ** Import Settings components
import General from 'components/dashboard/settings/General';
import Google from 'components/dashboard/settings/Google';
import Social from 'components/dashboard/settings/Social';
import SocialLogin from 'components/dashboard/settings/SocialLogin';
import Payment from 'components/dashboard/settings/Payment';
import SMTPServer from 'components/dashboard/settings/SMTPServer';

// Dashboard Projects ( new v1.2.0 )
import ProjectGrid from 'components/dashboard/projects/grid/ProjectGrid';
import ProjectList from 'components/dashboard/projects/list/ProjectList';
import CreateProject from 'components/dashboard/projects/create-project/CreateProject';
import ProjectBudget from 'components/dashboard/projects/single/budget/ProjectBudget';
import ProjectFiles from 'components/dashboard/projects/single/files/ProjectFiles';
import ProjectOverview from 'components/dashboard/projects/single/overview/ProjectOverview';
import ProjectSummary from 'components/dashboard/projects/single/summary/ProjectSummary';
import ProjectTask from 'components/dashboard/projects/single/task/ProjectTask';
import ProjectTeam from 'components/dashboard/projects/single/team/ProjectTeam';

// ** Boostrap Forms components
import ChecksRadios from 'components/elements/bootstrap/forms/ChecksRadios';
import FloatingLabels from 'components/elements/bootstrap/forms/FloatingLabels';
import FormControls from 'components/elements/bootstrap/forms/FormControls';
import FormText from 'components/elements/bootstrap/forms/FormText';
import BSInputGroup from 'components/elements/bootstrap/forms/BSInputGroup';
import Layouts from 'components/elements/bootstrap/forms/Layouts';
import Range from 'components/elements/bootstrap/forms/Range';
import BSSelect from 'components/elements/bootstrap/forms/BSSelect';
import Validation from 'components/elements/bootstrap/forms/Validation';

// ** Boostrap components
import Accordions from 'components/elements/bootstrap/Accordions';
import Alerts from 'components/elements/bootstrap/Alerts';
import AvatarStyles from 'components/elements/bootstrap/AvatarStyles';
import Badges from 'components/elements/bootstrap/Badges';
import Breadcrumbs from 'components/elements/bootstrap/Breadcrumbs';
import Buttons from 'components/elements/bootstrap/Buttons';
import ButtonGroup from 'components/elements/bootstrap/ButtonGroup';
import Cards from 'components/elements/bootstrap/Cards';
import Carousels from 'components/elements/bootstrap/Carousels';
import CloseButtons from 'components/elements/bootstrap/CloseButtons';
import Collapses from 'components/elements/bootstrap/Collapses';
import Dropdowns from 'components/elements/bootstrap/Dropdowns';
import Listgroups from 'components/elements/bootstrap/Listgroups';
import Navbars from 'components/elements/bootstrap/Navbars';
import Navs from 'components/elements/bootstrap/Navs';
import BSOffcanvas from 'components/elements/bootstrap/BSOffcanvas';
import Overlays from 'components/elements/bootstrap/Overlays';
import Paginations from 'components/elements/bootstrap/Paginations';
import Popovers from 'components/elements/bootstrap/Popovers';
import Progress from 'components/elements/bootstrap/Progress';
import Spinners from 'components/elements/bootstrap/Spinners';
import Modals from 'components/elements/bootstrap/Modals';
import Tables from 'components/elements/bootstrap/Tables';
import Toasts from 'components/elements/bootstrap/Toasts';
import Tooltips from 'components/elements/bootstrap/Tooltips';

// ** Import docs and change log pages
import Documentation from 'components/dashboard/documentation/Documentation';
import ChangeLog from 'components/dashboard/changelog/ChangeLog';

/* ----------------------------------- */
/* IMPORTS FOR MARKETING PAGES - START */
import DefaultLayout from 'layouts/marketing/DefaultLayout';
import LayoutFooterLinks from 'layouts/marketing/LayoutFooterLinks';
import BlankLayout from 'layouts/marketing/BlankLayout';
import NotFound from 'layouts/marketing/NotFound';

import CourseIndex from 'components/marketing/pages/courses/course-index/CourseIndex';
import CourseCategory from 'components/marketing/pages/courses/course-category/CourseCategory';

/* IMPORTS FOR FRONT SIDE PAGES MENU */
import CourseSingle from 'components/marketing/pages/courses/course-single/CourseSingle';
import CourseSingle2 from 'components/marketing/pages/courses/course-single2/CourseSingle2';
import CourseResume from 'components/marketing/pages/courses/course-resume/CourseResume';
import CourseCheckout from 'components/marketing/pages/courses/course-checkout/CourseCheckout';
import CourseFilterPage from 'components/marketing/pages/courses/course-filter-page/CourseFilterPage';
import AddNewCourse from 'components/marketing/pages/courses/add-new-course/AddNewCourse';
import CoursePath from 'components/marketing/pages/courses/course-path/CoursePath';
import CoursePathSingle from 'components/marketing/pages/courses/course-path-single/CoursePathSingle';
import About from 'components/marketing/pages/about/About';
import Pricing from 'components/marketing/pages/pricing/Pricing';
import ComparePlan from 'components/marketing/pages/compare-plan/ComparePlan'; // new v1.1.0
import Contact from 'components/marketing/pages/contact/Contact'; // new v1.1.0

/* IMPORTS FOR FRONT BLOG SUBMENU  ROUTERS */
import BlogListing from 'components/marketing/blog/BlogListing';
import BlogArticleSingle from 'components/marketing/blog/BlogArticleSingle';
import BlogCategory from 'components/marketing/blog/BlogCategory';
import BlogSidebar from 'components/marketing/blog/BlogSidebar';

/* IMPORTS FOR FRONT CAREER SUBMENU  ROUTERS */
import Career from 'components/marketing/pages/career/career/Career'; // new v1.1.0
import CareerList from 'components/marketing/pages/career/career-list/CareerList'; // new v1.1.0
import CareerSingle from 'components/marketing/pages/career/career-single/CareerSingle'; // new v1.1.0

/* IMPORTS FOR FRONT SPECIALTY SUBMENU  ROUTERS */
import ComingSoon from 'components/marketing/pages/specialty/ComingSoon';
import Error404 from 'components/marketing/pages/specialty/Error404';
import MaintenanceMode from 'components/marketing/pages/specialty/MaintenanceMode';
import TermsAndConditions from 'components/marketing/pages/specialty/TermsAndConditions';

// Landing menu item pages
import LandingCourses from 'components/marketing/landings/landing-courses/LandingCourses';
import CourseLead from 'components/marketing/landings/course-lead/CourseLead';
import RequestAccess from 'components/marketing/landings/request-access/RequestAccess';
import LandingSass from 'components/marketing/landings/landing-sass/LandingSass'; // new v1.1.0

// Instructor Dashboard Pages
import InstructorDashboard from 'components/marketing/instructor/Dashboard';
import InstructorMyCourses from 'components/marketing/instructor/MyCourses';
import InstructorReviews from 'components/marketing/instructor/Reviews';
import Earnings from 'components/marketing/instructor/Earnings';
import InstructorOrders from 'components/marketing/instructor/Orders';
import InstructorStudents from 'components/marketing/instructor/Students';
import ViewProfile from 'components/marketing/instructor/ViewProfile';

// Student Dashboard Pages
import StudentDashboard from 'components/marketing/student/Dashboard';
import DeleteProfile from 'components/marketing/account-settings/DeleteProfile';
import EditProfile from 'components/marketing/account-settings/EditProfile';
import LinkedAccounts from 'components/marketing/account-settings/LinkedAccounts';
import AccountNotifications from 'components/marketing/account-settings/Notifications';
import StudentPayment from 'components/marketing/account-settings/Payment';
import ProfilePrivacy from 'components/marketing/account-settings/ProfilePrivacy';
import Security from 'components/marketing/account-settings/Security';
import SocialProfiles from 'components/marketing/account-settings/SocialProfiles';
import Subscriptions from 'components/marketing/account-settings/Subscriptions';

// Account Settings
import BillingInfo from 'components/marketing/account-settings/BillingInfo';
import Payouts from 'components/marketing/account-settings/Payouts';
import Invoice from 'components/marketing/account-settings/Invoice';
import InvoiceDetails from 'components/marketing/account-settings/InvoiceDetails';

/* IMPORTS FOR MARKETING PAGES - END */
/* --------------------------------- */

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (
			<Layout>
				<Component {...props}></Component>
			</Layout>
		)}
	></Route>
);

function AllRoutes() {
	return (
		<Switch>
			{/* --------------------------- */}
			{/* LANDING PAGES ROUTERS - START */}
			<AppRoute exact path="/" layout={DefaultLayout} component={CourseIndex} />
			<AppRoute
				exact
				path="/marketing/course-category/"
				layout={DefaultLayout}
				component={CourseCategory}
			/>

			{/* FRONT SIDE LANDINGS MENU ROUTERS */}
			<AppRoute
				exact
				path="/marketing/landings/landing-courses/"
				layout={BlankLayout}
				component={LandingCourses}
			/>
			<AppRoute
				exact
				path="/marketing/landings/course-lead/"
				layout={BlankLayout}
				component={CourseLead}
			/>
			<AppRoute
				exact
				path="/marketing/landings/request-access/"
				layout={BlankLayout}
				component={RequestAccess}
			/>
			<AppRoute
				exact
				path="/marketing/landings/landing-sass/"
				layout={BlankLayout}
				component={LandingSass}
			/>

			{/* FRONT SIDE PAGES MENU ROUTERS */}
			<AppRoute
				exact
				path="/marketing/courses/course-single/"
				layout={DefaultLayout}
				component={CourseSingle}
			/>
			<AppRoute
				exact
				path="/marketing/courses/course-single2/"
				layout={DefaultLayout}
				component={CourseSingle2}
			/>
			<AppRoute
				exact
				path="/marketing/courses/course-resume/"
				layout={BlankLayout}
				component={CourseResume}
			/>
			<AppRoute
				exact
				path="/marketing/courses/course-checkout/"
				layout={DefaultLayout}
				component={CourseCheckout}
			/>
			<AppRoute
				exact
				path="/marketing/courses/course-filter-page/"
				layout={DefaultLayout}
				component={CourseFilterPage}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/add-new-course/"
				layout={DefaultLayout}
				component={AddNewCourse}
			/>
			<AppRoute
				exact
				path="/marketing/courses/course-path/"
				layout={DefaultLayout}
				component={CoursePath}
			/>
			<AppRoute
				exact
				path="/marketing/courses/course-path-single/"
				layout={DefaultLayout}
				component={CoursePathSingle}
			/>
			<AppRoute
				exact
				path="/marketing/pages/about/"
				layout={BlankLayout}
				component={About}
			/>
			<AppRoute
				exact
				path="/marketing/pages/pricing/"
				layout={DefaultLayout}
				component={Pricing}
			/>
			<AppRoute
				exact
				path="/marketing/pages/compare-plan/"
				layout={LayoutFooterLinks}
				component={ComparePlan}
			/>
			<AppRoute
				exact
				path="/marketing/pages/contact/"
				layout={BlankLayout}
				component={Contact}
			/>
			{/* FRONT SIDE BLOG SUBMENU ROUTERS */}
			<AppRoute
				exact
				path="/marketing/blog/article-single/:id"
				layout={DefaultLayout}
				component={BlogArticleSingle}
			/>
			<AppRoute
				exact
				path="/marketing/blog/category/"
				layout={DefaultLayout}
				component={BlogCategory}
			/>
			<AppRoute
				exact
				path="/marketing/blog/listing/"
				layout={DefaultLayout}
				component={BlogListing}
			/>
			<AppRoute
				exact
				path="/marketing/blog/sidebar/"
				layout={BlankLayout}
				component={BlogSidebar}
			/>

			{/* FRONT SIDE CAREER SUBMENU ROUTERS */}
			<AppRoute
				exact
				path="/marketing/pages/career/"
				layout={LayoutFooterLinks}
				component={Career}
			/>
			<AppRoute
				exact
				path="/marketing/pages/career-list/"
				layout={LayoutFooterLinks}
				component={CareerList}
			/>
			<AppRoute
				exact
				path="/marketing/pages/career-single/"
				layout={LayoutFooterLinks}
				component={CareerSingle}
			/>

			{/* FRONT SIDE BLOG SPECIALTY ROUTERS */}
			<AppRoute
				exact
				path="/marketing/specialty/coming-soon/"
				layout={NotFound}
				component={ComingSoon}
			/>
			<AppRoute
				exact
				path="/marketing/specialty/404-error/"
				layout={NotFound}
				component={Error404}
			/>
			<AppRoute
				exact
				path="/marketing/specialty/maintenance-mode/"
				layout={NotFound}
				component={MaintenanceMode}
			/>
			<AppRoute
				exact
				path="/marketing/specialty/terms-and-conditions/"
				layout={BlankLayout}
				component={TermsAndConditions}
			/>

			{/* FRONT SIDE INSTRUCTOR DASHBOARD ROUTERS */}
			<AppRoute
				exact
				path="/marketing/instructor/dashboard/"
				layout={DefaultLayout}
				component={InstructorDashboard}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-my-courses/"
				layout={DefaultLayout}
				component={InstructorMyCourses}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-reviews/"
				layout={DefaultLayout}
				component={InstructorReviews}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-earnings/"
				layout={DefaultLayout}
				component={Earnings}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-orders/"
				layout={DefaultLayout}
				component={InstructorOrders}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-students/"
				layout={DefaultLayout}
				component={InstructorStudents}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-payouts/"
				layout={DefaultLayout}
				component={Payouts}
			/>

			{/* FRONT SIDE INSTRUCTOR DASHBOARD-ACCOUNT SETTINGS ROUTERS */}
			<AppRoute
				exact
				path="/marketing/instructor/instructor-edit-profile/"
				layout={DefaultLayout}
				component={EditProfile}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-profile/"
				layout={DefaultLayout}
				component={ViewProfile}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-security/"
				layout={DefaultLayout}
				component={Security}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-social-profiles/"
				layout={DefaultLayout}
				component={SocialProfiles}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-notifications/"
				layout={DefaultLayout}
				component={AccountNotifications}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-profile-privacy/"
				layout={DefaultLayout}
				component={ProfilePrivacy}
			/>
			<AppRoute
				exact
				path="/marketing/instructor/instructor-delete-profile/"
				layout={DefaultLayout}
				component={DeleteProfile}
			/>

			{/* FRONT SIDE STUDENTS DASHBOARD ROUTERS */}
			<AppRoute
				exact
				path="/marketing/student/dashboard/"
				layout={DefaultLayout}
				component={StudentDashboard}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-subscriptions/"
				layout={DefaultLayout}
				component={Subscriptions}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-billing-info/"
				layout={DefaultLayout}
				component={BillingInfo}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-payment/"
				layout={DefaultLayout}
				component={StudentPayment}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-invoice/"
				layout={DefaultLayout}
				component={Invoice}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-invoice-details/"
				layout={DefaultLayout}
				component={InvoiceDetails}
			/>

			{/* FRONT SIDE STUDENTS DASHBOARD-ACCOUNT SETTINGS ROUTERS */}
			<AppRoute
				exact
				path="/marketing/student/student-edit-profile/"
				layout={DefaultLayout}
				component={EditProfile}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-security/"
				layout={DefaultLayout}
				component={Security}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-social-profiles/"
				layout={DefaultLayout}
				component={SocialProfiles}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-notifications/"
				layout={DefaultLayout}
				component={AccountNotifications}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-profile-privacy/"
				layout={DefaultLayout}
				component={ProfilePrivacy}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-delete-profile/"
				layout={DefaultLayout}
				component={DeleteProfile}
			/>
			<AppRoute
				exact
				path="/marketing/student/student-linked-accounts/"
				layout={DefaultLayout}
				component={LinkedAccounts}
			/>

			{/* LANDING PAGES ROUTERS - END */}
			{/* --------------------------- */}

			{/* ADMIN PAGES ROUTERS - START */}
			{/* --------------------------- */}

			{/* DASHBOARD ROUTERS */}
			<AppRoute
				exact
				path="/dashboard/overview"
				layout={DashboardIndex}
				component={Overview}
			/>
			<AppRoute
				exact
				path="/dashboard/analytics"
				layout={DashboardIndex}
				component={Analytics}
			/>

			{/* COURSES ROUTERS */}
			<AppRoute
				exact
				path="/courses/all-courses"
				layout={DashboardIndex}
				component={AllCourses}
			/>
			<AppRoute
				exact
				path="/courses/courses-category"
				layout={DashboardIndex}
				component={CoursesCategory}
			/>
			<AppRoute
				exact
				path="/courses/category-single"
				layout={DashboardIndex}
				component={CategorySingle}
			/>

			{/* USER ROUTERS */}
			<AppRoute
				exact
				path="/user/instructor"
				layout={DashboardIndex}
				component={Instructor}
			/>
			<AppRoute
				exact
				path="/user/students"
				layout={DashboardIndex}
				component={Students}
			/>

			{/* CMS ROUTERS */}
			<AppRoute
				exact
				path="/cms/cms-dashboard"
				layout={DashboardIndex}
				component={CMSDashboard}
			/>
			<AppRoute
				exact
				path="/cms/all-posts"
				layout={DashboardIndex}
				component={AllPosts}
			/>
			<AppRoute
				exact
				path="/cms/add-new-post"
				layout={DashboardIndex}
				component={AddNewPost}
			/>
			<AppRoute
				exact
				path="/cms/category"
				layout={DashboardIndex}
				component={Category}
			/>

			{/* AUTHENTICATION ROUTERS */}
			<AppRoute
				exact
				path="/authentication/sign-in"
				layout={AuthLayout}
				component={SignIn}
			/>
			<AppRoute
				exact
				path="/authentication/sign-up"
				layout={AuthLayout}
				component={SignUp}
			/>
			<AppRoute
				exact
				path="/authentication/forget-password"
				layout={AuthLayout}
				component={ForgetPassword}
			/>
			<AppRoute
				exact
				path="/authentication/notifications"
				layout={DashboardIndex}
				component={Notifications}
			/>

			{/* SETTINGS ROUTERS */}
			<AppRoute
				exact
				path="/settings/general"
				layout={DashboardIndex}
				component={General}
			/>
			<AppRoute
				exact
				path="/settings/google"
				layout={DashboardIndex}
				component={Google}
			/>
			<AppRoute
				exact
				path="/settings/social"
				layout={DashboardIndex}
				component={Social}
			/>
			<AppRoute
				exact
				path="/settings/social-login"
				layout={DashboardIndex}
				component={SocialLogin}
			/>
			<AppRoute
				exact
				path="/settings/payment"
				layout={DashboardIndex}
				component={Payment}
			/>
			<AppRoute
				exact
				path="/settings/smtp-server"
				layout={DashboardIndex}
				component={SMTPServer}
			/>

			{/* PROJECTS ROUTERS */}
			<AppRoute
				exact
				path="/dashboard/projects/grid"
				layout={DashboardIndex}
				component={ProjectGrid}
			/>
			<AppRoute
				exact
				path="/dashboard/projects/list"
				layout={DashboardIndex}
				component={ProjectList}
			/>
			<AppRoute
				exact
				path="/dashboard/projects/create-project"
				layout={DashboardIndex}
				component={CreateProject}
			/>
			<AppRoute
				exact
				path="/dashboard/projects/single/budget"
				layout={DashboardIndex}
				component={ProjectBudget}
			/>
			<AppRoute
				exact
				path="/dashboard/projects/single/files"
				layout={DashboardIndex}
				component={ProjectFiles}
			/>
			<AppRoute
				exact
				path="/dashboard/projects/single/overview"
				layout={DashboardIndex}
				component={ProjectOverview}
			/>
			<AppRoute
				exact
				path="/dashboard/projects/single/summary"
				layout={DashboardIndex}
				component={ProjectSummary}
			/>
			<AppRoute
				exact
				path="/dashboard/projects/single/task"
				layout={DashboardIndex}
				component={ProjectTask}
			/>
			<AppRoute
				exact
				path="/dashboard/projects/single/team"
				layout={DashboardIndex}
				component={ProjectTeam}
			/>

			{/* REACT-BOOTSTRAP FORMS COMPOENTS ROUTERS */}
			<AppRoute
				exact
				path="/elements/forms/checks-and-radios"
				layout={DashboardIndex}
				component={ChecksRadios}
			/>
			<AppRoute
				exact
				path="/elements/forms/floating-labels"
				layout={DashboardIndex}
				component={FloatingLabels}
			/>
			<AppRoute
				exact
				path="/elements/forms/form-controls"
				layout={DashboardIndex}
				component={FormControls}
			/>
			<AppRoute
				exact
				path="/elements/forms/form-text"
				layout={DashboardIndex}
				component={FormText}
			/>
			<AppRoute
				exact
				path="/elements/forms/input-group"
				layout={DashboardIndex}
				component={BSInputGroup}
			/>
			<AppRoute
				exact
				path="/elements/forms/layouts"
				layout={DashboardIndex}
				component={Layouts}
			/>
			<AppRoute
				exact
				path="/elements/forms/range"
				layout={DashboardIndex}
				component={Range}
			/>
			<AppRoute
				exact
				path="/elements/forms/select"
				layout={DashboardIndex}
				component={BSSelect}
			/>
			<AppRoute
				exact
				path="/elements/forms/validation"
				layout={DashboardIndex}
				component={Validation}
			/>

			{/* REACT-BOOTSTRAP COMPOENTS ROUTERS */}
			<AppRoute
				exact
				path="/elements/accordions"
				layout={DashboardIndex}
				component={Accordions}
			/>
			<AppRoute
				exact
				path="/elements/alerts"
				layout={DashboardIndex}
				component={Alerts}
			/>
			<AppRoute
				exact
				path="/elements/avatar"
				layout={DashboardIndex}
				component={AvatarStyles}
			/>
			<AppRoute
				exact
				path="/elements/badges"
				layout={DashboardIndex}
				component={Badges}
			/>
			<AppRoute
				exact
				path="/elements/breadcrumbs"
				layout={DashboardIndex}
				component={Breadcrumbs}
			/>
			<AppRoute
				exact
				path="/elements/buttons"
				layout={DashboardIndex}
				component={Buttons}
			/>
			<AppRoute
				exact
				path="/elements/button-group"
				layout={DashboardIndex}
				component={ButtonGroup}
			/>
			<AppRoute
				exact
				path="/elements/cards"
				layout={DashboardIndex}
				component={Cards}
			/>
			<AppRoute
				exact
				path="/elements/carousels"
				layout={DashboardIndex}
				component={Carousels}
			/>
			<AppRoute
				exact
				path="/elements/close-button"
				layout={DashboardIndex}
				component={CloseButtons}
			/>
			<AppRoute
				exact
				path="/elements/collapse"
				layout={DashboardIndex}
				component={Collapses}
			/>
			<AppRoute
				exact
				path="/elements/dropdowns"
				layout={DashboardIndex}
				component={Dropdowns}
			/>
			<AppRoute
				exact
				path="/elements/list-group"
				layout={DashboardIndex}
				component={Listgroups}
			/>
			<AppRoute
				exact
				path="/elements/modal"
				layout={DashboardIndex}
				component={Modals}
			/>
			<AppRoute
				exact
				path="/elements/navs"
				layout={DashboardIndex}
				component={Navs}
			/>
			<AppRoute
				exact
				path="/elements/offcanvas"
				layout={DashboardIndex}
				component={BSOffcanvas}
			/>
			<AppRoute
				exact
				path="/elements/overlays"
				layout={DashboardIndex}
				component={Overlays}
			/>
			<AppRoute
				exact
				path="/elements/navbar"
				layout={DashboardIndex}
				component={Navbars}
			/>
			<AppRoute
				exact
				path="/elements/pagination"
				layout={DashboardIndex}
				component={Paginations}
			/>
			<AppRoute
				exact
				path="/elements/popovers"
				layout={DashboardIndex}
				component={Popovers}
			/>
			<AppRoute
				exact
				path="/elements/progress"
				layout={DashboardIndex}
				component={Progress}
			/>
			<AppRoute
				exact
				path="/elements/spinners"
				layout={DashboardIndex}
				component={Spinners}
			/>
			<AppRoute
				exact
				path="/elements/tables"
				layout={DashboardIndex}
				component={Tables}
			/>
			<AppRoute
				exact
				path="/elements/toasts"
				layout={DashboardIndex}
				component={Toasts}
			/>
			<AppRoute
				exact
				path="/elements/tooltips"
				layout={DashboardIndex}
				component={Tooltips}
			/>

			<AppRoute
				exact
				path="/dashboard/documentation"
				layout={DashboardIndex}
				component={Documentation}
			/>
			<AppRoute
				exact
				path="/dashboard/changelog"
				layout={DashboardIndex}
				component={ChangeLog}
			/>

			{/* ADMIN PAGES ROUTERS - END */}
			{/* ------------------------- */}
		</Switch>
	);
}

export default AllRoutes;
