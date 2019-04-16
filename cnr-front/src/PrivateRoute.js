import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, admin, ...rest}) =>{
    if (admin){
        return(
            <Route
                {...rest}
                render={props =>
                (localStorage.getItem("token") && localStorage.getItem('adminStatus'))? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
                }
             />
        )
    }
    else{
      return(
        <Route
            {...rest}
            render={props =>
            localStorage.getItem("token") ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
            }
        />
      )
    }
}

export default PrivateRoute;