import React, { useState, useEffect } from 'react';
import axios from 'axios';

const usePhotoSearch = (query, pageNumber, pageSize) => {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ photos, setPhotos ] = useState([]);
    const [ hasMore, setHasMore ] = useState(false);

    useEffect(() => {
        setPhotos([]);
    }, [query])

    useEffect(() => {
            const fetcher = async () => {
                setLoading(true);
                setError(false);
                try {
                    const res = await axios.get(`/api/searchphotos/${query}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
                    // const res = await axios.get(`/api/searchphotos/demoquery?pageNumber=demoPageNumber&pageSize=demoPageSize`);
                    const data = res.data;
                    // console.log(data);
                    setPhotos(prevPhotos => [...prevPhotos, ...data.hits])
                    // setPhotos(prevPhotos => [...prevPhotos, ...data])
                    setHasMore(data.hits.length > 0);
                    setLoading(false);
                } catch(error) {
                    setError(true);
                    setHasMore(false);
                    setLoading(false);
                }

            };

            if(
                query !== undefined && 
                pageNumber !== undefined && 
                pageSize !== undefined
            ) 
                fetcher();

    }, [query, pageNumber]);

    return {
        photos,
        loading,
        hasMore,
        error
    };
}

export default usePhotoSearch;