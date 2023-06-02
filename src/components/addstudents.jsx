import React,{useState} from "react";
import Base from '../Base/base.js';
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import {Button,IconButton,Snackbar} from '@mui/material';
import * as yup  from "yup";
import { useFormik } from "formik";

export let filedValidationSchema=yup.object({
    name:yup.string().required("Please fill the student name"),
    batch:yup.string().required("Please fill in the student batch")
    .min(5,"please pass avalid batchname"),
    qualification:yup.string().required("Please fill the student Qualification"),
    gender:yup.string().required("Please Mention your gender")
   });

function Addstudent({students,setstudent}) {

    let {handleSubmit,values,handleChange,handleBlur,errors,touched}=useFormik({
        initialValues:{
            name:"",
            batch:"",
            qualification:"",
            gender:""
        },
        validationSchema : filedValidationSchema,
        onSubmit:(newstudent)=>{
            createstudent(newstudent)
        }
    })

    let history=useHistory();
    let[name,setname]=useState("")
    let[gender,setgender]=useState("")
    let[batch,setbatch]=useState("")
    let[qualification,setqualification]=useState("")

async function createstudent(newstudent){
let response= await fetch("https://student-dashboard-backend.vercel.app/students/add",{
    method: "POST",
    body:JSON.stringify(newstudent),
    headers:{
        "Content-Type":"application/json"
    },
});
    let data= await response.json()
   setstudent([...students,data])
   history.push("/students");

}

    return(
        <Base
        title={"Add new Students"}
        description={"You can add new students here"}
        >
            <div className="tex-area-col">
            <form onSubmit={handleSubmit}>
            <TextField id="filled-basic" label="Enter Your name" variant="filled"
            name="name"
            type="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth sx={{ m: 1 }}
            />
            <div style={{color:"crimson"}}>
                {touched.name && errors.name ? errors.name:""}
            </div>
            
            <TextField id="filled-basic" label="Gender" variant="filled" 
            name="gender"
            type="gender"
            value={values.gender}
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth sx={{ m: 1 }}
            />
            <div style={{color:"crimson"}}>
                {touched.gender && errors.gender ? errors.gender:""}
            </div>
            
            <TextField id="filled-basic" label="Batch" variant="filled" 
            name="batch"
            type="batch"
            value={values.batch}
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth sx={{ m: 1 }}
            />
            <div style={{color:"crimson"}}>
                {touched.batch && errors.batch ? errors.batch:""}
            </div>
            
            <TextField id="filled-basic" label="Qualification" variant="filled" 
            name="qualification"
            type="qualification"
            value={values.qualification}
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth sx={{ m: 1 }}
            />
            <div style={{color:"crimson"}}>
                {touched.qualification && errors.qualification ? errors.qualification:""}
            </div>
            <Button variant="contained" 
            type="submit">Add Student</Button>
            </form>
            </div>
        </Base>
    );
}
export default Addstudent;
