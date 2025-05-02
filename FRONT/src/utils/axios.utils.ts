import { UserLoginReturn } from "@/types/shared.types";
import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import { CatchedResponse } from "utils-stuff";
import { ref } from "vue";
import { utils } from "./renderer.utils";

export class Cazzios
{
    public static isAuth = ref(false);

    private static readonly DEV_URL = 'http://127.0.0.1:3000/apiUrl';
    public static instance:Axios;
    public static setInstance = async () =>
    {
        const apiUrl = await this.getApiUrls();
        this.instance = axios.create({
            baseURL: apiUrl ?? ''
            // validateStatus: () => true
        });
    }
    private static setHeaders = () => ({
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.localStorage.getItem('t')}` }
    })

    private static getApiUrls = async ():Promise<string | undefined> =>
    {
        try
        {
            const res = await axios.get(import.meta.env.DEV ? this.DEV_URL : '/apiUrl');
            return res.data as string;
        }
        catch
        {
            return undefined;
        }
    }
    private static checkIfAuth = (err: AxiosError) =>
    {
        if (!err.isAxiosError) return false;
        if (!err.status) return false;
        if (err.status >= 400 && err.status < 500) return false;
        else return true;
    }

    public static checkAuth = async () =>
    {
        try
        {
            const res = await this.get<UserLoginReturn>('/auth', this.setHeaders());
            if (!res.isOk) throw new Error(res.error ?? 'Unauth');

            if (res.response?.info?.name) window.localStorage.setItem('name', res.response.info.name)
            if (res.response?.info?.email) window.localStorage.setItem('email', res.response.info.email)
            if (res.response?.info?.image) window.localStorage.setItem('image', res.response.info.image)
            if (res.response?.token) window.localStorage.setItem('token', res.response.token)
            this.isAuth.value = true;

            return true;
        }
        catch
        {
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('image');
            window.localStorage.removeItem('token');
            this.isAuth.value = false;

            return false;
        }
    }


    public static async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<CatchedResponse<T>>
    {
        try
        {
            const res = await this.instance.get(url, Object.assign(this.setHeaders(), config ?? {}));
            return utils.resOk(res.data)
        }
        catch (err)
        {
            if (!this.checkIfAuth(err as AxiosError)) this.isAuth.value = false
            return utils.resError((err as AxiosError).response?.data ?? err);
        }
    }

    public static async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CatchedResponse<T>>
    {
        try
        {
            const res = await this.instance.post(url, data, Object.assign(this.setHeaders(), config ?? {}));
            return utils.resOk(res.data)
        }
        catch (err)
        {
            console.error(err)
            if (!this.checkIfAuth(err as AxiosError)) this.isAuth.value = false
            return utils.resError((err as AxiosError).response?.data ?? err);
        }
    }

    public static async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CatchedResponse<T>>
    {
        try
        {
            const res = await this.instance.put(url, data, Object.assign(this.setHeaders(), config ?? {}));
            return utils.resOk(res.data)
        }
        catch (err)
        {
            if (!this.checkIfAuth(err as AxiosError)) this.isAuth.value = false
            return utils.resError((err as AxiosError).response?.data ?? err);
        }
    }

    public static async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<CatchedResponse<T>>
    {
        try
        {
            const res = await this.instance.delete(url, Object.assign(this.setHeaders(), config ?? {}));
            return utils.resOk(res.data)
        }
        catch (err)
        {
            if (!this.checkIfAuth(err as AxiosError)) this.isAuth.value = false
            return utils.resError((err as AxiosError).response?.data ?? err);
        }
    }



    public static async postMultipart<T = any>(url: string, data: Record<string, any>): Promise<CatchedResponse<T>> {
        try
        {
            const formData = new FormData();
            for (const key in data) formData.append(key, data[key]);

            const res = await this.instance.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            });

            return utils.resOk(res.data);
        }
        catch (err)
        {
            if (!this.checkIfAuth(err as AxiosError)) this.isAuth.value = false;
            return utils.resError((err as AxiosError).response?.data ?? err);
        }
    }
}
