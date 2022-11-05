import React, { useEffect} from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AppRoute({    component: Component,
    path, 
    isPrivate, 
    ...props
}){
    const { user: currentUser } = useSelector((state) => state.auth);
      useEffect(() => {
        if(currentUser){
    
        }else {
    
        }
      }, [currentUser]);
      return (
        <Route
            path={path}
            render={
                props => 
                isPrivate && !currentUser ? (
                    <div>Por favor, inicie sesion</div>
                ) : (
                    <Component {...props} />
                )
            }
            {...props} 
        />
      );
} 