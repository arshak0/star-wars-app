import { useEffect, useState } from "react";
import type { Person } from "../../lib/types/Person";
export const useFetchPeople = (url: string) => {
    const [fetchData, setFetchData] = useState<Person[]>();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setFetchData (data.results)
            })
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, [url]);

    return { fetchData, error, isLoading };
};

export const useFetchPerson = (url: string) => {
    const [fetchData, setFetchData] = useState<Person>();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setFetchData (data)
            })
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, [url]);

    return { fetchData, error, isLoading };
};