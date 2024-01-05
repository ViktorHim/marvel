import { useState, useEffect, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type' : 'aplication/json'}) => {
        setLoading(true);

        try{
            const response = await fetch(url, {method, body, headers});
            if(!response.ok) {
                throw new Error(`could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();

            setLoading(false);
            return data;
        } catch (err) {
            handleError(error);
            throw err;
        }
    }, []);

    const handleError = (err) => {
        setLoading(false);
        setError(err);
    }

    const clearError = useCallback(() => {setError(null)}, []);

    return {loading, request, error, clearError};
}

export default useHttp;