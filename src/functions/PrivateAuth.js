import {Route, Redirect} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../functions/AuthContext';

const PrivateAuth = ({children, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
      return (
        <Route
          {...rest}
          render={
            ({location})=> currentUser ? (
              children
            ) : (
              <Redirect 
                to={{pathname: "/login",
                state: {from : location}}}
              />
            )
          }
         />
      );
  }

  export default PrivateAuth