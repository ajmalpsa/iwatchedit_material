import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Divider, Menu, MenuItem, Dialog, DialogTitle, DialogActions, Button, Snackbar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import fire from "../functions/FirebaseInitialize";
import { Alert } from "@material-ui/lab";
import moment from "moment";



const useStyles = makeStyles((theme) => (
    {
        root: {
            maxWidth: 400,
            padding: theme.spacing(2),
            marginRight: 'auto',
            marginLeft: 'auto',
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
        },
    }
));


function Postcard({ name, date, posterpath, review, uid, movieid, moviename,docid, isOwner }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [divHide, setDivHide] = useState(false);
    const history = useHistory();
    const db = fire.firestore();
    const adate = date.toDate();
    // const newdate = dateformat(adate, "dd/mm/yyyy h:MM TT");

    const handleDialogOpen = () => {
        setOpen(true);
        handleClose();
    }
    const handleDialogClose = () => {
        setOpen(false);
    }
    const handleDelete = () => {
        db.collection('posts').doc(docid).delete().then(()=>{
            setSnackOpen(true);
            setDivHide(true);
        })
        setOpen(false);
    }

    const handleSnackBarClose = (e, reason) =>{
        if(reason === 'clickaway'){
            return
        }
        setSnackOpen(false)
    }



    const handleClick = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleEditClose = () => {
        history.push({
            pathname: '/editreview',
            state: {
                creview : review,
                poster: posterpath,
                moviename: moviename,
                movieid: movieid,
                docid: docid
            }});
        setAnchorEl(null);
    }

    const dialogue = (<Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id = "alert-dialog-title">
            {"Are you sure?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
          </DialogActions>

    </Dialog>)



    return (
        <div className={classes.root} key={docid} id = {docid} style={divHide ? {display: "none"} : {}}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.purple}>
                            {name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={name}
                    subheader={moment(adate, "YYYYMMDDHHMM").fromNow()}>

                </CardHeader>
                <CardMedia
                    className={classes.media}
                    image={'https://image.tmdb.org/t/p/w500/' + posterpath}

                />
                <CardContent>
                    <Typography variant="h5" align="center">
                        {moviename}
                    </Typography>
                    <Divider />
                    <Typography>
                        {review}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Menu
                id="simple menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {isOwner && <MenuItem onClick={handleEditClose}>Edit</MenuItem>}
                {isOwner && <MenuItem onClick={handleDialogOpen}>Delete</MenuItem>}
                {!isOwner && <MenuItem onClick={handleClose}>Report</MenuItem>}
            </Menu>
            {dialogue}
            <Snackbar open={snackOpen} autoHideDuration={600} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="success">
                    Post deleted successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Postcard
