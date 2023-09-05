import { useState, useEffect } from 'react';

async function fetchGW2Info(dataRoute) {
    try {
        const response = await fetch('http://localhost:3001/gw2' + dataRoute);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching server info:', error);
        throw error; // Rethrow the error to propagate it
    }
}

function useGW2InfoFetch(dataRoute) {
    const [serverInfo, setServerInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchGW2Info(dataRoute);
                setServerInfo(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return { serverInfo, error, isLoading };
}

export { useGW2InfoFetch };

