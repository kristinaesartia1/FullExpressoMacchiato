import GenericLayout from "@/layouts/GenericLayout.vue";
import OutLayout from "@/layouts/OutLayout.vue";
import Login from "@/pages/Login.vue";
import PersonalPage from "@/pages/PersonalPage.vue";
import Signin from "@/pages/Signin.vue";
import Welcomer from "@/pages/Welcomer.vue";
import { CustomRoutePath, NavigationLink } from "@/types/routes.types";


// --- SIDEBAR
export const navigationLinks:NavigationLink[] = [
	{ icon: "mdi-text", title: "First Page", href:"/" },
];

// --- ROUTERS PATH
// const backButton = (linkPath:string):GenericLayoutButtons => ({ icon: 'mdi-menu-left', onClick: () => router.push(linkPath) })
export const routes:CustomRoutePath[] = [
	{
		path: "/",
		name: "App",
		component: GenericLayout,
		meta: { secure:true },
		children: [
			{ path: "", name: "Homepage", component: Welcomer },
			{ path: "personalPage", name: "My Page", component: PersonalPage }
		]
	},
	{
		path: '/hero',
		name: "Hero",
		component: OutLayout,
		children: [
			{ path: "login", name: "Login", component: Login },
			{ path: "signin", name: "Signin", component: Signin }
		]
	}
];
