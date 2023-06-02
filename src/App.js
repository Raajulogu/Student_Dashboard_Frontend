import { Switch,Route } from 'react-router-dom';
import './App.css';
import Students from'./components/student.js';
import Addstudents from'./components/addstudents';
import Editstudent from'./components/editstudent';
import React,{useState,useEffect} from 'react';
import Nopage from './components/errorpage.js';
import Dashboard from './components/Dashboard';
import { Redirect } from 'react-router-dom';

function App() {
  let [student,setstudent]=useState([]);
  useEffect(()=>{
    let getstudents=async()=>{
      let response =await fetch("https://student-dashboard-backend.vercel.app/students/data",{
        method: "GET",
      });
      let data=await response.json();
      if(data){
        setstudent(data.data)
      }
    }
    getstudents();
    },[])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
         <Dashboard/> 
        </Route>
        <Route path="/details">
          <Redirect to ="/students"/>
        </Route>

        <Route path="/students">
          <Students
          student={student}
          setstudent={setstudent}
          />
          </Route>
        <Route path="/add">
          <Addstudents
          students={student}
          setstudent={setstudent}/>
        </Route>
        <Route path="/edit/:id">
          <Editstudent
          students={student}
          setstudent={setstudent}
          />
        </Route>
        <Route path="***">
          <Nopage/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
