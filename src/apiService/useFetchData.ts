import axios from "axios";
import { useEffect, useState } from "react";
import { Router } from "../types/router";
import { API_URL } from "./api";

export const useFetchData = () => {
    const [routers, setRouters] = useState<Router[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const {data} = await axios.get<Router[]>(API_URL);
            setRouters(data);
        } catch (error: any) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchData();

    }, []);

    return {
        fetchData,
        routers,
        loading,
        error
    }
}