import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Trending from './pages/Trending';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import Reviews from './pages/Reviews';
import { useEffect, useState, useContext } from 'react';
import fire from './functions/FirebaseInitialize';
import MovieDetails from './pages/MovieDetails';
import WriteReview from './pages/WriteReview';
import User from './pages/User';
import Userform from './pages/UserForm';
import {AuthContext, AuthProvider} from './functions/AuthContext';
import PrivateAuth from './functions/PrivateAuth';
import SearchResults from './pages/SearchResults';
import EditReview from './pages/EditReview';


function App() {

  const [themev, setThemev] = useState('light');
  const history = useHistory();

  


  const changeTheme = (themev) => {
    localStorage.setItem('theme', themev);
    window.location.reload();
  }

  useEffect(() => {
  
    const themeName = localStorage.getItem('theme');
    if (themeName) {
      setThemev(themeName);
    }
    else {
      localStorage.setItem('theme', 'light');
    }


  }, []);

  const theme = createMuiTheme({
    palette: {
      type: themev,
    },
  });
  

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar themev={themev} changeTheme={changeTheme} />
            <Trending />
          </Route>
          <Route path='/login'>
              <Login />
          </Route>

          <PrivateAuth path='/finishsignup'>
            <Userform />
          </PrivateAuth>
          <PrivateAuth path='/reviews'>
              <Navbar themev={themev} changeTheme={changeTheme} />
              <Reviews />
          </PrivateAuth>
          <PrivateAuth path='/details/:id'>
              <Navbar themev={themev} changeTheme={changeTheme} />
              <MovieDetails />
          </PrivateAuth>
          <PrivateAuth path='/addreview'>
              <Navbar themev={themev} changeTheme={changeTheme} />
              <WriteReview />
          </PrivateAuth>
          <PrivateAuth path='/results/:query'>
              <Navbar themev={themev} changeTheme={changeTheme} />
              <SearchResults />
          </PrivateAuth>
          <PrivateAuth path='/editreview'>
              <Navbar themev={themev} changeTheme={changeTheme} />
              <EditReview />
          </PrivateAuth>
          
        </Switch>
      </Router>
      
      </AuthProvider>
      </ThemeProvider>
  );

  
}

export default App;
