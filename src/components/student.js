import React,{useState} from 'react';
import Base from '../Base/base.js';
import Addstudent from './addstudents.jsx';
import Editstudent from './editstudent.jsx';
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

function Students({student,setstudent}){
    async function deleteStudent(Id){
        let response = await fetch(`https://student-dashboard-backend.vercel.app/students/delete/${Id}`,{
          method: "DELETE", 
        });
        let data =await response.json();
        if(data){
            let remainingdata = student.filter((prod,index)=>prod._id!==Id);
            setstudent(remainingdata)
        }
    }
    let history=useHistory();
    return(
        <Base
        title={"Students Dashboard"}
        description={"Students Data"}
        >
            {/* <Editstudent editid={editid}/> */}

            
            <div className="container">
                <div className="card-container">
                      {student.map((prod,index)=>(
                         <Card sx={{ maxWidth: 200, height:240 }} key={index}>
                         <CardContent>
                           <Typography gutterBottom variant="h5" component="div">
                             {prod.name}
                           </Typography>
                           <Typography gutterBottom variant="h5" component="div">
                             {prod.gender}
                           </Typography>
                           <Typography gutterBottom variant="h5" component="div">
                             {prod.batch}
                           </Typography>
                           <Typography gutterBottom variant="h5" component="div">
                             {prod.qualification}
                           </Typography>
                         </CardContent>
                         <CardActions>
                           <Button size="small"
                           onClick={()=>history.push(`/edit/${prod._id}`)}
                           ><ModeEditOutlineIcon/></Button>
                           <Button size="small"
                           onClick={()=>deleteStudent(prod._id)}
                           ><DeleteIcon/></Button>
                         </CardActions>
                       </Card>
                      ))}
                </div>
            </div>
        
        </Base>
    );
}
export default Students;