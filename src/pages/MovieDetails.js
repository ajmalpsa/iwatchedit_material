import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from '../functions/useFetch';
import EditIcon from '@material-ui/icons/Edit';
import ReadReview from "./ReadReviewById";
import MoviDetailsGrid from "./MoviDetailsGrid";
import ErrorMessage from "./ErrorMessage";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        backgroundColor: theme.palette.primary,
    },
}));

function MovieDetails() {
    const classes = useStyles();
    const { id } = useParams();
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=0ed3985d5e8f198fd16c397d20cb401e&language=en-US';
    const { item, isLoaded, error } = useFetch(url);
    console.log(item);
    const history = useHistory();
    var poster, title;
    if (item) {
        poster = item.backdrop_path;
        title = item.original_title;
    }

    const FabClick = () => {

        history.push({
            pathname: "/addreview",
            id: id,
            poster: poster,
            title: title
        });

    }

    return (
        <>
            {item && <div className={classes.root}>
                <MoviDetailsGrid poster={item.poster_path}
                    title={item.original_title}
                    overview={item.overview}
                    vote={item.vote_average}
                    genres={item.genres}
                    imdbid={item.imdb_id}
                    status={item.status}
                    release={item.release_date}
                />
                {item.status == "Released" && <Fab variant='extended' aria-label='Add Review' className={classes.fab} onClick={FabClick}>
                    <EditIcon /><p> Write Review</p>
                </Fab>}
                <ReadReview movieid={id} />

            </div>}
            {!isLoaded && <>Loading...</>}
            {error && <ErrorMessage message={error.status} />}
        </>
    )
}

export default MovieDetails
