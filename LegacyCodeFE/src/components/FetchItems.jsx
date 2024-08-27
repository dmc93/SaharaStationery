import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8082/items/getAll';

const useFetchItems = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    const fetchItems = useCallback(async () => {
        try {
            const response = await axios.get(API_URL);
            console.log('Data fetched from API:', response.data);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
            setError(error);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return { items, error, refetch: fetchItems };
};

export default useFetchItems;
