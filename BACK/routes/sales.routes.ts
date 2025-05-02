import { RouterWrapper } from "../_super_express/RouterWrapper";
import { SalesData } from "../db/models/salesData.model";

export const salesRouter = new RouterWrapper({
	tag:'sales',
	basePath:'/api/sales',
	dbRouting: { entity: SalesData },
})
