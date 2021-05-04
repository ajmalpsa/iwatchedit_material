import { useState, useContext } from 'react'
import { Container, CssBaseline, Avatar, Typography, TextField, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import fire from '../functions/FirebaseInitialize';
import {AuthContext} from '../functions/AuthContext';
import {useHistory} from 'react-router-dom';


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

function UserForm() {
    const history = useHistory();
    const classes = useStyles();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const currentUser = useContext(AuthContext);
    const updateName = () =>{
        let user = fire.auth().currentUser;
        user.updateProfile({
            displayName : fname +' '+ lname
        }).then(()=>history.push('/'))
        .catch(e=>console.log(e))
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                        {/* {(user.email).charAt(0).toUpperCase()} */}
                </Avatar>

                <Typography component="h1" variant="h5">
                    Continue Signup...
        </Typography>

                <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fname"
                        label="First Name"
                        name="fname"
                        autoComplete="fname"
                        autoFocus
                        onChange={(e) => setFname(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lname"
                        label="Last Name"
                        id="lname"
                        autoComplete="lname"
                        onChange={(e) => setLname(e.target.value)}
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={updateName}
                    >
                        Finish Sign Up
          </Button>






                </form>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    )
}

export default UserForm
