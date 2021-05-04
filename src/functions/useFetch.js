import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);

    useEffect(()=>{
        fetch(url)
        .then((res)=>{
            if(!res.ok){
                throw res;
            }
            return res.json();
        })
        .then((data)=>{
            setIsloaded(true);
            setItem(data);
            setError(null);
            
        })
        .catch((err)=>{
            setIsloaded(true);
            setError(err);
        })
    },[url]);
    
    
    
    return {item, isLoaded, error};
}

export default useFetch
