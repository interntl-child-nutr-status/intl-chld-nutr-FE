import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, admin, ...rest}) =>{
    if (admin){
        console.log(admin, localStorage.getItem('adminStatus'));
        return(
            <Route
                {...rest}
                render={props =>
                (localStorage.getItem("token") && localStorage.getItem('adminStatus') === 'true')? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/countries" />
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