import { useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Box, TextField, InputAdornment } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const useStyle = makeStyles((theme)=>({
    inputRoot: {
        color: 'inherit',
      },
      search: {
        marginTop: theme.spacing(2),
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.action.active, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.action.active, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: '50%',
        },
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
}));

function SearchField() {
    const [searchlist, setSearchlist] = useState([]);
    const history = useHistory();
    const classes = useStyle();
    const FetchAutoComplete = (e) =>{
        const search = e.target.value;
        if(search){
          const url = 'https://api.themoviedb.org/3/search/multi?api_key=0ed3985d5e8f198fd16c397d20cb401e&language=&query='+e.target.value+'&page=1&include_adult=true';
        fetch(url).then((res)=>{
          return res.json();
        }).then((data)=>{
          if(data){
            let moviename = [{'title' : ' ','id': ' '}];
            data.results.map((result)=>{
              if(result.title){
                moviename.push({'title' : result.title,'id' : result.id});
              }
            });
            console.log(moviename);
            setSearchlist(moviename);
          }
        })
        }
      }
    
      const eventOnChange = (event, newValue) => {
        if(newValue.id){
          history.push('/details/'+newValue.id);
        }
        else{
          history.push('/results/'+event.target.value);
        }
      }
    return (
        <div style={{ width: "100%" }}>
        <Box display="flex" justifyContent="center">
          <div className={classes.search}>
          <Autocomplete
              options={searchlist}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              getOptionLabel={searchlist => searchlist.title}
              onChange={eventOnChange}
              renderInput={(params) => (
                <TextField
                  onChange={FetchAutoComplete}
                  placeholder="Search movies/series"
                  {...params}
                  margin="none"
                  size="small"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps, type: 'search', startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  
                />
              )}
            />
          </div>
        </Box>
      </div>
    )
}

export default SearchField
