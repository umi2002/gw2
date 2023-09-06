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

    async function fetchData() {
        try {
            const data = await fetchGW2Info(dataRoute);
            setServerInfo(data);
            setError(null);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [dataRoute]);

    return { serverInfo, error };
}

export { useGW2InfoFetch };

