import { useState, useContext, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles';
import { Container, CssBaseline, Typography, TextField, Button, Card, CardMedia } from '@material-ui/core';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import fire from '../functions/FirebaseInitialize';
import {AuthContext} from '../functions/AuthContext';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function WriteReview() {
    const classes = useStyles();
    const {id, poster, title} = useParams();
    const [review, setReview] = useState('');
    const db = fire.firestore();
    const history = useHistory();
    const {state} = useLocation();
    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        if(state.creview){
            setReview(state.creview);
        }
    },[]);

    const saveData = () =>{
        const postsDb = db.collection('posts').doc(state.docid);
        postsDb.update({
            review: review
        }).then(()=>{
            history.push('/reviews')
        }
        )
        
    }

    return (
        <>
        
        <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
            <Typography variant='h4'>{state.moviename}</Typography>
            <br />
            <Card>
                <CardMedia component='img'
                image={'https://image.tmdb.org/t/p/w500/' + state.poster}/>
            </Card>
            <form className={classes.form} noValidate onSubmit={(e)=>e.preventDefault()}>
            <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={4}
                id="review"
                label="Write Review"
                name="review"
                value={review}
                autoFocus
                onChange={(e)=>setReview(e.target.value)}
              />
              <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={saveData}>
            Submit
          </Button>
            </form>
            </div>

        </Container>
        </>
    )
}

export default WriteReview
