import { createRouter, createWebHistory } from "vue-router";
import { routes } from "../utils/navigations.utils";
import { beforeEachGuard } from "./guards";
const router = createRouter({
	history: createWebHistory(),
	routes,
});


router.beforeEach(beforeEachGuard);
export { router };
