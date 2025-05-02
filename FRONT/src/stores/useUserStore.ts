import { Preferences } from "@/types/generic.types";
import { UserLoginReturn } from "@/types/shared.types";
import { Cazzios } from "@/utils/axios.utils";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useUserStore = defineStore('preferences', {
    getters: {
        all () {
            return {
                name:window.localStorage.getItem('name'),
                email:window.localStorage.getItem('email'),
                image:window.localStorage.getItem('image'),
            }
        },
        token () { return window.localStorage.getItem('t'); },
        name () { return window.localStorage.getItem('name'); },
        email () { return window.localStorage.getItem('email'); },
        image () { return window.localStorage.getItem('image'); },
    },
    actions: {
        deleteToken () { window.localStorage.removeItem('t'); },
        setImage (image:string) { window.localStorage.setItem('image', image); },
        setPreferences(user:UserLoginReturn | null)
        {
            if (user?.info?.name) window.localStorage.setItem('name', user.info.name);
            if (user?.info?.email) window.localStorage.setItem('email', user.info.email);
            if (user?.info?.image) window.localStorage.setItem('image', user.info.image);

            if (user?.token) window.localStorage.setItem('t', user.token);
        },
        async savePreferences ()
        {
            const response = await Cazzios.post<Preferences>('/user/configs');
            if (!response.isOk) toast.error(`PREFERENCES ERROR: ${response.error!}`)
            else toast.error(`Preferences Saved Correctly`);
        },
        async previewImage ()
        {
            // const res = await invokeMainFunction('getImage');
            // if (res.isOk) return res.response;
            // else
            // {
            //     toast.error(`PREFERENCES ERROR: ${res.error!}`);
            //     return null;
            // }
        },
        async login (email:string, password:string)
        {
            const response = await Cazzios.post<UserLoginReturn>('/user/login', { email, password });
            if (!response.isOk)
            {
                toast.error(response.error);
                Cazzios.isAuth.value = true;
                return false;
            }
            else
            {
                this.setPreferences(response.response);
                Cazzios.isAuth.value = false;
                return true;
            }
        },
        async signin (name:string, email:string, password:string)
        {
            const response = await Cazzios.post<UserLoginReturn>('/user/signin', { name, email, password });
            if (!response.isOk)
            {
                toast.error(response.error);
                Cazzios.isAuth.value = false;
            }
            else
            {
                Cazzios.isAuth.value = true;
                this.setPreferences(response.response);
            }
        },
        logout()
        {
            window.localStorage.removeItem('t');
            Cazzios.isAuth.value = false;
        }
    }
})
