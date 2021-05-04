import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Divider, Menu, MenuItem, Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Skeleton from '@material-ui/lab/Skeleton'


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


function ReviewSkelton() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Skeleton animation="wave" variant="circle" width={40} height={40} />
                    }
                    
                    title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
                    subheader={<Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />}>

                </CardHeader>
                <Skeleton animation="wave" variant="rect" className={classes.media} />
                <CardContent>
                    <Skeleton animation="wave" height={10} width="80%" height="15%" style={{ marginBottom: 6 }}
                        align="center"
                    />
                    <Divider />
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6, marginTop: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </CardContent>
                <CardActions>
                <Skeleton animation="wave" variant="circle" width={25} height={25} />
                <Skeleton animation="wave" variant="circle" width={25} height={25} />
                </CardActions>
            </Card>
        </div>
    )
}

export default ReviewSkelton
