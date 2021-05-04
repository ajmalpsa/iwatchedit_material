import { useEffect, useState } from 'react'
import fire from './FirebaseInitialize';

function useReadDb(dbName) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [lastkey, setLastKey] = useState('');
    const db = fire.firestore();
    

    useEffect(()=>{
        fetchData();
    },[dbName]);

    const fetchData = () =>{
        const dbref = db.collection('posts').limit(1).orderBy('date');
        dbref.get()
            .then(
                (doc)=>{
                    const dataArray = doc.docs.map((data)=>data.data());
                    setData(dataArray)
                    setIsLoading(false);
                   })
            .catch((err)=>{
                setError(err);
            })
    }
    const fetchDataMoreData = () =>{
        
    } 
    return {data, isLoading, error, fetchDataMoreData};
}

export default useReadDb
