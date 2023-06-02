import React, {useState,useEffect} from "react";
import Base from '../Base/base.js';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button,TextField } from "@mui/material";


function Editstudent({students,setstudent}){
    let history=useHistory();
    let editid=useParams().id;
    let editindex = students.filter((prod,index)=>prod._id!==editid)
    let[name,setname]=useState("")
    let[gender,setgender]=useState("")
    let[batch,setbatch]=useState("")
    let[qualification,setqualification]=useState("")

    useEffect(()=>{
        setname(editindex.name)
        setgender(editindex.gender)
        setbatch(editindex.batch)
        setqualification(editindex.qualification)
    },[editindex])

    async function updatestudent(){
       
        let updatedstudent={
            name:name,
            gender:gender,
            batch:batch,
            qualification:qualification
        }
        let response = await fetch(`https://student-dashboard-backend.vercel.app/students/edit/${editid}`,{
          method: "PUT",
          body:JSON.stringify(updatedstudent),
          headers:{
            "Content-Type":"application/json"
          }  
        })
        let data=await response.json()
        if(data){
            students[editid] = updatedstudent;
            setstudent([...students])
            history.push("/students")
        }
    }
    
    return(
        <Base
        title={"Edit Students"}
        description={"You can edit a students data here"}
        >
          <div className="text-area-col">
          <TextField id="filled-basic" label="Enter Your name" variant="filled"
            type="text"
            value={name}
            onChange={(res)=>setname(res.target.value)}
            fullWidth sx={{ m: 1 }}
            />

            <TextField id="filled-basic" label="Gender" variant="filled" 
            type="text"
            value={gender}
            onChange={(res)=>setgender(res.target.value)}
            fullWidth sx={{ m: 1 }}
            />
            
            <TextField id="filled-basic" label="Batch" variant="filled" 
            type="text"
            value={batch}
            onChange={(res)=>setbatch(res.target.value)}
            fullWidth sx={{ m: 1 }}
            />
            
            <TextField id="filled-basic" label="Qualification" variant="filled" 
            fullWidth sx={{ m: 1 }}
            type="text"
            value={qualification}
            onChange={(res)=>setqualification(res.target.value)}
            />
            <Button
            variant='contained' onClick={()=>updatestudent()}>Update</Button>
          </div>
        </Base>
    );
}

export default Editstudent;