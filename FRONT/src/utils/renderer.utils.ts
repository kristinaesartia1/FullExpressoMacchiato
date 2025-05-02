import { VuetifyThemeVariables } from "@/types/theme.types";
import { GenericUtils } from "utils-stuff";

class Utils extends GenericUtils
{
    public vueRgbStyle = (color:VuetifyThemeVariables | string) =>
    {
        return `var(--v-theme-${color})`
    }

    public getError = (err:any):string =>
    {
        return (err as Error)?.message ?? `${err}`;
    }
}


const utils = new Utils();
export { utils };
