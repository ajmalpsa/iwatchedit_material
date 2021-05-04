import Postcard from "./Postcard";
import { useCallback, useContext, useRef } from 'react';
import { AuthContext } from "../functions/AuthContext";
import { Typography } from "@material-ui/core";
import { useState, useEffect } from 'react';
import fire from '../functions/FirebaseInitialize';
import { makeStyles } from '@material-ui/core/styles';
import ReviewSkelton from './ReviewSkelton';


const useStyle = makeStyles((theme) => ({
    container: {
        maxHeight: '10%',
        boxSizing: "border-box",
        overflow: "Auto",

    }
}));
function Reviews() {
    const { currentUser } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [lastkey, setLastkey] = useState(null);
    const db = fire.firestore();
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    var dbref = db.collection('posts').limit(5).orderBy('date', 'desc');
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        dbref.get()
            .then(
                (doc) => {
                    docFunction(doc);
                })
            .catch((err) => {
            })
    }

    const docFunction = (doc) => {
        const dataArray = doc.docs.map((data) => ({ ...data.data(), ['docid']: data.id }));
        console.log(dataArray);
        setData([...data, ...dataArray]);
        setLastkey(doc.docs[doc.docs.length - 1]);
        setLoading(false);
        
    }
    const fetchMoreData = () => {
            setLoading(true);
            dbref.startAfter(lastkey).get()
                .then(
                    (doc) => {
                        if (!doc.size == 0) {
                            docFunction(doc);
                        }
                        else {
                            console.log("no mor data")
                            setIsEmpty(true);
                        }
                    })
                .catch((err) => {
                })
    }

    const observer = useRef();
    const lastCardRefElement = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting && !isEmpty){
                fetchMoreData();
            }
        })
        if(node) observer.current.observe(node)
    }, [loading, isEmpty])


    const Posts = () => {
        if (data) {
            return (<>{data.map((post, index) => {
                if (data.length === index + 1) {
                    return <div ref={lastCardRefElement}>
                        <Postcard name={post.name}
                            posterpath={post.posterpath}
                            moviename={post.moviename}
                            review={post.review}
                            date={post.date}
                            uid={post.uid}
                            movieid={post.movieid}
                            moviename={post.moviename}
                            docid={post.docid}
                            isOwner={currentUser.uid == post.uid}
                        />
                    </div>
                }
                else {
                    return <div >
                        <Postcard name={post.name}
                            posterpath={post.posterpath}
                            moviename={post.moviename}
                            review={post.review}
                            date={post.date}
                            uid={post.uid}
                            movieid={post.movieid}
                            moviename={post.moviename}
                            docid={post.docid}
                            isOwner={currentUser.uid == post.uid}
                        />
                    </div>
                }
            }
            )}</>)
        }
        else {
            return (<>No data</>)
        }
    }

    const LoadingSkelton = () => {
        const numberOfCard = 3;
        return (<>
            {[...Array(numberOfCard)].map((e, i) => <ReviewSkelton />)}
        </>)
    }

    return (
        <div>
        {console.log(`isEmpty ${isEmpty}`)}
            {data && <Posts />}
            {loading && !isEmpty && <LoadingSkelton />}
            {/* {error && <p>Error loading</p>} */}
            {isEmpty && <Typography align="center">Awesome! You read all...</Typography>}

        </div>
    )
}

export default Reviews
