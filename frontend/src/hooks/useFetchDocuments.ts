import { useCallback, useEffect, useState } from 'react';

import { API_BASE_URL } from '../shared/constants';
import { Document } from '../shared/models';

export const useFetchDocuments = (autoFetch = true) => {
    const [data, setData] = useState<Document[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDocs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/documents`);
            const json: Document[] = await res.json();
            setData(json ?? []);
        } catch (err: any) {
            console.error(err);
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchDocs();
        }
    }, [autoFetch, fetchDocs]);

    return { data, loading, error, refresh: fetchDocs };
};
