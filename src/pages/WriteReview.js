import { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Typography, TextField, Button, Card, CardMedia } from '@material-ui/core';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import fire from '../functions/FirebaseInitialize';
import { AuthContext } from '../functions/AuthContext';
import { useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import Dialog from "./Dialog";


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
  const [review, setReview] = useState('');
  const db = fire.firestore();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [haveName, setHaveName] = useState(false);
  const { id, poster, title } = useLocation();
  useEffect(() => {
    if (currentUser.displayName) {
      setHaveName(true);
    }
  }, [])

  const saveData = () => {
    const postsDb = db.collection('posts');
    if (!currentUser.displayName) {
      history.push('/finishsignup');
    }
    else {
      postsDb.add({
        name: currentUser.displayName,
        movieid: id,
        moviename: title,
        posterpath: poster,
        rating: '4',
        review: review,
        uid: currentUser.uid,
        date: new Date()
      }).then(
        history.push("/reviews")
      ).catch(
        console.log("som error occured")
      )
    }
  }

  return (
    <>
      {!haveName && <Dialog />}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant='h4'>{title}</Typography>
          <br />
          <Card>
            <CardMedia component='img'
              image={'https://image.tmdb.org/t/p/w500/' + poster} />
          </Card>
          <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              id="review"
              label="Write Review"
              name="review"
              onChange={(e) => setReview(e.target.value)}
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
