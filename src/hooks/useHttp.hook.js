import { useCallback, useState, useCallback } from "react";

export default function useHttp(url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

    const request = useCallback(async () => {

        setIsLoading(true);

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error('Could not fetch...')
            }

            const data = await response.json();

            setIsLoading(false);

            return data;


        } catch (error) {
            setIsLoading(false);
            setHasError(true);
            throw error;
        }

    }, [])

    const clearError = useCallback(() => setHasError(false), []);

    return {isLoading, hasError, request, clearError}

}