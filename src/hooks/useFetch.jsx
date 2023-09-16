import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../utils/api"; // Make sure the import path is correct

const useFetch = (url,params) => { // Accept params as an argument
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Start with loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true); // Set loading to true when starting a new request
        setData(null);
        setError(null);

        fetchDataFromAPI(url, params) // Pass the URL and params to the fetchDataFromAPI function
            .then((res) => {
                setLoading(false);
                setData(res);
                
            })
            .catch((err) => {
                if (err) { console.log(err); }
                setLoading(false);
                setError("Something went wrong!");
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]); // Include params in the dependency array

    return { data, loading, error };
};

export default useFetch;
