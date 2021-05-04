import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import { Card, CardMedia, CardContent, Typography, Box } from "@material-ui/core";
import imdb from "../resources/imdb.png";

const useStyles = makeStyles((theme) => ({
  Card: {
    [theme.breakpoints.up('sm')]: {
      display: "flex",
      maxWidth: "80%",
    },
  }
}));


const MoviDetailsGrid = ({ poster, title, overview, vote, genres, imdbid, status, release }) => {
  const classes = useStyles();
  return (
    <Grid spacing={2}  container alignContens="center" justify="center">
    <Card className={classes.Card}>
      <Grid xs={12} sm={12} md={4}  item>
        
          <CardMedia 
            component='img'
            image={'https://image.tmdb.org/t/p/w500' + poster}
          />
        
      </Grid>
      <Grid xs={12} sm={12} md={8} item>
      <Grid  item  >
        
          <CardContent>
            <Typography variant='h3'>{title}</Typography>
            <Typography variant='body2' component='p'>{overview}</Typography><br/>
            <Typography>Rating: {vote}</Typography>
            <Typography>Status: {status}</Typography>
            <Typography>Genres: {genres.map((item)=>" "+item.name+",")}</Typography>
           <a href={"https://www.imdb.com/title/"+imdbid}> <img src={imdb} style={{width:40}}/></a>
            
          </CardContent>
        
      </Grid>
      <Grid item>
      
      </Grid>
      </Grid>
      </Card>
    </Grid>
  );
}

export default MoviDetailsGrid

