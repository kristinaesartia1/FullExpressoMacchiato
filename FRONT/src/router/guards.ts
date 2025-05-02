import { Cazzios } from "@/utils/axios.utils";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

type Guards = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => void;

const toLogin = { path: '/hero/login' };
export const beforeEachGuard: Guards = async (to, _, next) =>
{
	const requiresAuth = to.meta.secure ?? false;
	// INSIDE APP
	if (requiresAuth)
	{
		if (!Cazzios.isAuth.value)
		{
			const token = window.localStorage.getItem('t');
			if (!token) { next(toLogin); return; }

			const cazziosCheck = await Cazzios.checkAuth();
			if (cazziosCheck) { next(); return; }
			else { next(toLogin); return; }
		}
		else
		{
			next();
			return;
		}
	}
	// OUTSIDE APP
	else
	{
		if (Cazzios.isAuth.value)
		{
			const token = window.localStorage.getItem('t');
			if (!token) { next(); return; }

			const cazziosCheck = await Cazzios.checkAuth();
			if (cazziosCheck) { next('/'); return; }
			else { next(); return; }
		}
		else
		{
			next();
			return;
		}
	}
};
