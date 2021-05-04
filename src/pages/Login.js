import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import fire from '../functions/FirebaseInitialize';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        iWatchedit
     </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const history = useHistory();
  const auth = fire.auth();
  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const classes = useStyles();

  const createAccount = () =>{
    auth.createUserWithEmailAndPassword(email, password)
    .then((cred)=> {
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
        history.push('/finishsignup');

    })
    .catch((err)=>{
        switch (err.code) {
            case 'auth/email-already-exists':
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
                setEmailError(err.message);
                break;
            case 'auth/invalid-password':
            case 'auth/weak-password':
            case 'auth/wrong-password':
                setPasswordError(err.message);
                break;
            default:
                setEmailError('error');
                //console.log(err);

                break;
        }
    });
}
const loginAccount = () =>{
    auth.signInWithEmailAndPassword(email, password)
    .then((cred)=> {
      console.log(cred);
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
        history.push('/');
    })
    .catch((err)=>{
        switch (err.code) {
            case 'auth/email-already-exists':
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
            case 'auth/user-not-found':
                setEmailError(err.message);
                break;
            case 'auth/invalid-password':
            case 'auth/weak-password':
            case 'auth/wrong-password':
                setPasswordError(err.message);
                break;
            default:
                setEmailError('error');
                console.log(err);

                break;
        }
        console.log(err);
    });
} 

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const handelHasAccount = () => {
    setHasAccount(!hasAccount);
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        {hasAccount && <Typography component="h1" variant="h5">
          Sign in
        </Typography>}
        {!hasAccount && <Typography component="h1" variant="h5">
          Sign up
        </Typography>}

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={emailError}
            error={emailError}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={passwordError}
            error={passwordError}
            onChange={(e)=>setPassword(e.target.value)}
          />


          {hasAccount && <Button
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginAccount}
          >
            Sign In
          </Button>}
          {!hasAccount && <Button
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={createAccount}
          >
            Sign Up
          </Button>}


          <Grid container>
            <Grid item xs>
              {hasAccount && <Link href="#" variant="body2">
                Forgot password?
              </Link>}
            </Grid>
            <Grid item>

              {hasAccount && <Link onClick={handelHasAccount} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>}
              {!hasAccount && <Link onClick={handelHasAccount} variant="body2">
                {"Have an account? Sign In"}
              </Link>}

            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}