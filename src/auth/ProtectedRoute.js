import React from "react";
import {Route,Redirect} from "react-router-dom";
import {userAuth} from "./isAuthenticated";

export const ProtectedRoute = ({component :Component, ...rest})=>{
   
    
     return <Route {...rest} render={(props) => {
             return userAuth.isAuthenticated ? rest.claim === userAuth.claim? <Component {...props} />: <Redirect to ="/" />:
              <Redirect to ={{pathname:"login", state :{from :props.location, claim: rest.claim}}} />
           
     }}/>
      
}
