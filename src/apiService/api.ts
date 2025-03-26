import axios from "axios";
import { Router } from "../types/router";

export const API_URL = "http://localhost:3001/routers/";

export const fetchRouter = async (id: string) => {
    try {
        const res = await axios.get<Router>(API_URL+id);
        return res.data;
    } catch (err: any) {
        throw err;
    }
}

export const updateRouter = async (router: Partial<Router>) => {
    try {
        const res = await axios.patch<Router>(API_URL+router.id, router);
        return res.data;
    } catch (err: any) {
                console.log('error updating router', err);
        throw err;
    }
}

export const createRouter = async (router: Partial<Router>) => {
    try {
        const res = await axios.post<Router>(API_URL, router);
        return res.data;
    } catch (err: any) {
        console.log('error creating new router', err);
        throw err;
    }
}