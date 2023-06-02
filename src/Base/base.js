import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Button,Toolbar,Typography } from "@mui/material";
 
function Base({title,description,children}){
    let history=useHistory();
    return(
        <div className="main-component base">
            <div className="nav-bar">
                <AppBar>
                    <Toolbar>
                    <Button 
                    onClick={()=>history.push("/")}
                    color="inherit">Dashboard</Button>

                    <Button 
                    onClick={()=>history.push("/students")}
                    color="inherit">Student-List</Button>

                    <Button 
                    onClick={()=>history.push("/add")}
                    color="inherit">Add-student</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <header>
            <Typography 
            className="heading" variant="h3" gutterBottom>
                {title}
            </Typography>
            </header>
            <Typography 
            className="main-content" variant="h4" gutterBottom>
                {description}
                {children}
            </Typography>
        </div>
    );
}
export default Base;