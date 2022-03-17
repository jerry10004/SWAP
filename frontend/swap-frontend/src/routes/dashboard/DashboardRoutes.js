import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		children: [
			{ id: uuid(), link: '/dashboard/overview', name: 'Overview' },
			{ id: uuid(), link: '/dashboard/analytics', name: 'Analytics' }
		]
	},

	{
		id: uuid(),
		title: 'Courses',
		icon: 'book',
		children: [
			{ id: uuid(), link: '/courses/all-courses', name: 'All Courses' },
			{
				id: uuid(),
				link: '/courses/courses-category',
				name: 'Courses Category'
			},
			{ id: uuid(), link: '/courses/category-single', name: 'Category Single' }
		]
	},
	{
		id: uuid(),
		title: 'User',
		icon: 'user',
		children: [
			{ id: uuid(), link: '/user/instructor', name: 'Instructor' },
			{ id: uuid(), link: '/user/students', name: 'Students' }
		]
	},

	{
		id: uuid(),
		title: 'CMS',
		icon: 'book-open',
		children: [
			{ id: uuid(), link: '/cms/cms-dashboard', name: 'Overview' },
			{ id: uuid(), link: '/cms/all-posts', name: 'All Posts' },
			{ id: uuid(), link: '/cms/add-new-post', name: 'New Post' },
			{ id: uuid(), link: '/cms/category', name: 'Category' }
		]
	},

	// Projects->Single children are used in below component for the comparision of router link and name
	// If you are changing main routes titles, i.e. Projects and Single you also need to modify on below component.
	// src/components/dashboard/projects/single/CommonHeaderTabs.js

	{
		id: uuid(),
		title: 'Projects',
		icon: 'file',
		badge: 'New',
		badgecolor: 'success',
		children: [
			{ id: uuid(), link: '/dashboard/projects/grid', name: 'Grid' },
			{ id: uuid(), link: '/dashboard/projects/list', name: 'List' },
			{
				id: uuid(),
				title: 'Single',
				children: [
					{
						id: uuid(),
						link: '/dashboard/projects/single/overview',
						name: 'Overview'
					},
					{ id: uuid(), link: '/dashboard/projects/single/task', name: 'Task' },
					{
						id: uuid(),
						link: '/dashboard/projects/single/budget',
						name: 'Budget'
					},
					{
						id: uuid(),
						link: '/dashboard/projects/single/files',
						name: 'Files'
					},
					{ id: uuid(), link: '/dashboard/projects/single/team', name: 'Team' },
					{
						id: uuid(),
						link: '/dashboard/projects/single/summary',
						name: 'Summary'
					}
				]
			},
			{
				id: uuid(),
				link: '/dashboard/projects/create-project',
				name: 'Create Project'
			}
		]
	},
	{
		id: uuid(),
		title: 'Authentication',
		icon: 'lock',
		children: [
			{ id: uuid(), link: '/authentication/sign-in', name: 'Sign In' },
			{ id: uuid(), link: '/authentication/sign-up', name: 'Sign Up' },
			{
				id: uuid(),
				link: '/authentication/forget-password',
				name: 'Forget Password'
			},
			{
				id: uuid(),
				link: '/authentication/notifications',
				name: 'Notifications'
			},
			{
				id: uuid(),
				link: '/marketing/specialty/404-error/',
				name: '404 Error'
			},
			{
				id: uuid(),
				link: '/marketing/specialty/terms-and-conditions/',
				name: 'Terms & Conditions'
			}
		]
	},
	{
		id: uuid(),
		title: 'Components',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'Forms',
		icon: 'book',
		children: [
			{
				id: uuid(),
				link: '/elements/forms/form-controls',
				name: 'Form Controls'
			},
			{ id: uuid(), link: '/elements/forms/form-text', name: 'Form Text' },
			{ id: uuid(), link: '/elements/forms/select', name: 'Select' },
			{
				id: uuid(),
				link: '/elements/forms/checks-and-radios',
				name: 'Checks & Radios'
			},
			{ id: uuid(), link: '/elements/forms/range', name: 'Range' },
			{ id: uuid(), link: '/elements/forms/input-group', name: 'Input Group' },
			{
				id: uuid(),
				link: '/elements/forms/floating-labels',
				name: 'Floating Labels'
			},
			{ id: uuid(), link: '/elements/forms/layouts', name: 'Layout' },
			{ id: uuid(), link: '/elements/forms/validation', name: 'Validation' }
		]
	},
	{
		id: uuid(),
		title: 'Components',
		icon: 'monitor',
		children: [
			{ id: uuid(), link: '/elements/accordions', name: 'Accordions' },
			{ id: uuid(), link: '/elements/alerts', name: 'Alerts' },
			{ id: uuid(), link: '/elements/avatar', name: 'Avatar' },
			{ id: uuid(), link: '/elements/badges', name: 'Badges' },
			{ id: uuid(), link: '/elements/breadcrumbs', name: 'Breadcrumbs' },
			{ id: uuid(), link: '/elements/buttons', name: 'Buttons' },
			{ id: uuid(), link: '/elements/button-group', name: 'ButtonGroup' },
			{ id: uuid(), link: '/elements/cards', name: 'Cards' },
			{ id: uuid(), link: '/elements/carousels', name: 'Carousel' },
			{ id: uuid(), link: '/elements/close-button', name: 'Close Button' },
			{ id: uuid(), link: '/elements/collapse', name: 'Collapse' },
			{ id: uuid(), link: '/elements/dropdowns', name: 'Dropdowns' },
			{ id: uuid(), link: '/elements/list-group', name: 'Listgroup' },
			{ id: uuid(), link: '/elements/modal', name: 'Modal' },
			{ id: uuid(), link: '/elements/navs', name: 'Navs' },
			{ id: uuid(), link: '/elements/navbar', name: 'Navbar' },
			{ id: uuid(), link: '/elements/offcanvas', name: 'Offcanvas' },
			{ id: uuid(), link: '/elements/overlays', name: 'Overlays' },
			{ id: uuid(), link: '/elements/pagination', name: 'Pagination' },
			{ id: uuid(), link: '/elements/popovers', name: 'Popovers' },
			{ id: uuid(), link: '/elements/progress', name: 'Progress' },
			{ id: uuid(), link: '/elements/spinners', name: 'Spinners' },
			{ id: uuid(), link: '/elements/tables', name: 'Tables' },
			{ id: uuid(), link: '/elements/toasts', name: 'Toasts' },
			{ id: uuid(), link: '/elements/tooltips', name: 'Tooltips' }
		]
	},
	{
		id: uuid(),
		title: 'Site Settings',
		icon: 'settings',
		children: [
			{ id: uuid(), link: '/settings/general', name: 'General' },
			{ id: uuid(), link: '/settings/google', name: 'Google' },
			{ id: uuid(), link: '/settings/social', name: 'Social' },
			{ id: uuid(), link: '/settings/social-login', name: 'Social Login' },
			{ id: uuid(), link: '/settings/payment', name: 'Payment' },
			{ id: uuid(), link: '/settings/smtp-server', name: 'SMPT' }
		]
	},
	{
		id: uuid(),
		title: 'Documentation',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'Documentation',
		icon: 'clipboard',
		link: '/dashboard/documentation'
	},
	{
		id: uuid(),
		title: 'Changelog',
		icon: 'git-pull-request',
		link: '/dashboard/changelog',
		badge: 'v1.2.0'
	}
];

export default DashboardMenu;
