import {  Grid } from '@material-ui/core';
import Listcard from './Listcard';
import { makeStyles } from '@material-ui/core/styles';
import useFetch from '../functions/useFetch';
import SearchField from './SearchField';

const useStyle = makeStyles((theme) => (
  {
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
  }
));

function Trending() {
  console.log(process.env.REACT_APP_API_KEY)
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  const { item, isLoaded, error } = useFetch(url);
  const roundRating = (num) => {
    return Math.round(num) / 2;
  }
  const n = 20;
  const classes = useStyle();
  return (

    <>
      <SearchField />
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
                <Listcard image={'https://image.tmdb.org/t/p/w500' + items.backdrop_path} title=
                  {items.original_title ? items.original_title : items.original_name}
                  rating={roundRating(items.vote_average)}
                  id={items.id}
                  overview={items.overview}

                />
              </Grid>

            )}
          </Grid>
        </div>
      }
    </>
  )


}

export default Trending
