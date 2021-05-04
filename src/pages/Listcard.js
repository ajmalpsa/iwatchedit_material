import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton'
import ReadMore from '../functions/ReadMore';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  overlay: {
    position: 'absolute',
    top: 125,
    left: 0,
    color: 'white',
    marginLeft: 10,
    textShadow: 10,
 },
});

export default function Listcard({ image, title, rating, overview, id, loading }) {
  const classes = useStyles();

 

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={"/details/"+id}>
        {loading ? (
          <Skeleton animation="wave" variant="rect" style={{ height: 190 }} />
        ) : (
          <div>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="200"
            image={image}
            title={title}
          />
          <Typography gutterBottom variant="h5" component="h2" className={classes.overlay}>
              {title}
            </Typography>
          </div>
        )}
        
      </CardActionArea>
        <CardContent>
          {loading ? (
            <><Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} width='40%' />
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} width='40%' /></>
          ) : (
           <> 
            <Box component='fieldset' borderColor='transparent'>
            <Rating name="half-rating-read" value={rating} precision={0.5} readOnly size="small" />
          </Box>
            </>
          )}
          {loading ? (
            <>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            </>
          ) : (
            <ReadMore>
              <Typography variant="body2" color="textSecondary" component="p" >
            {overview} 
            </Typography>
            </ReadMore>

          )}
        </CardContent>
      
    </Card>
  );
}
