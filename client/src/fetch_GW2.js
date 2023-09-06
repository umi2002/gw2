import { useState, useEffect } from 'react';

async function fetchGW2Info(dataRoute) {
    try {
        const response = await fetch(dataRoute);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching server info:', error);
        throw error;
    }
}

function useGW2InfoFetch(dataRoute) {
    const [serverInfo, setServerInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        try {
            const data = await fetchGW2Info(dataRoute);
            setServerInfo(data);
            setIsLoading(false);
            setError(null);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [dataRoute]);

    return { serverInfo, error, isLoading };
}

export { useGW2InfoFetch };

