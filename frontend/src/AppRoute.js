import React, { useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AppRoute(){
    const { user: currentUser } = useSelector((state) => state.auth);
      useEffect(() => {
        if(currentUser){
    
        }else {
    
        }
      }, [currentUser]);
      return currentUser ? <Outlet/> : <Navigate to="/login" />;
} 