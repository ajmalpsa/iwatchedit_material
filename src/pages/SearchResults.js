import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {  Grid } from '@material-ui/core';
import Listcard from './Listcard';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import noimage from '../resources/noimage.png';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

const useStyle = makeStyles((theme) => (
    {
        root: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
    }
));

function SearchResults() {
    const { query } = useParams();
    const [item, setItem] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState();
    const [totalPages, setTotalPages] = useState(1);
    // // const { item, isLoaded, error } = useFetch(url);
    // setItem(item);
    // setIsLoaded(isLoaded);
    // setError(error);
    // if (item) {
    //     setTotalPages = item.total_pages;
    // }
    const roundRating = (num) => {
        return Math.round(num) / 2;
    }
    const n = 20;
    const classes = useStyle();

    useEffect(() => {
        FetchData();
    }, []);

    const FetchData = () => {
        const url = 'https://api.themoviedb.org/3/search/multi?api_key=0ed3985d5e8f198fd16c397d20cb401e&language=&query=' + query + '&page=1&include_adult=true';
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw 'unable to fetch data or item not found';
                }
                return res.json();
            })
            .then((data) => {
                setItem(data);
                setIsLoaded(true);
                setError(null);
                setTotalPages(data.total_pages);

            })
            .catch((err) => {
                setIsLoaded(true);
                setError(err);
                console.log(err);
            })
    }

    const FetchMoreData = (event, page) => {
        setItem(null);
        setIsLoaded(false);
        setError('');
        window.scrollTo(0, 0);
        const url = 'https://api.themoviedb.org/3/search/multi?api_key=0ed3985d5e8f198fd16c397d20cb401e&language=&query=' + query + '&page=' + page + '&include_adult=true';
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw 'unable to fetch data or item not found';
                }
                return res.json();
            })
            .then((data) => {
                setItem(data);
                setIsLoaded(true);
                setError(null);
                setTotalPages(data.total_pages);

            })
            .catch((err) => {
                setIsLoaded(true);
                setError(err);
                console.log(err);
            })
    }

    return (
        <div>
            {error && <div className='white-text'>Error on loading</div>}
            {!isLoaded &&
                <div className={classes.root}>
                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {[...Array(n)].map((e, i) =>
                            <Grid item xs={12} sm={6} md={3}>
                                <Listcard loading='true'
                                />
                            </Grid>)
                        }

                    </Grid>
                </div>
            }

            {item &&
                <div className={classes.root}>
                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {(item.results).map(items =>
                            <Grid item xs={12} sm={6} md={3} id={items.id}>
                                <Listcard image={(items.backdrop_path ? 'https://image.tmdb.org/t/p/w500'+items.backdrop_path : BrokenImageIcon)} title=
                                    {items.original_title ? items.original_title : items.original_name}
                                    rating={roundRating(items.vote_average)}
                                    id={items.id}
                                    overview={(items.overview ? items.overview : "No descriptions Available")}

                                />
                            </Grid>

                        )}
                    </Grid>
                </div>
            }
            
                {!error && <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={FetchMoreData} />}
            
        </div>
    )
}

export default SearchResults
