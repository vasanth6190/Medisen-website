import React,{useState,useContext} from 'react'
import {Link,useHistory} from "react-router-dom"
import "./Signup.css"
import { createcontext } from '../../App'
import {toast} from "react-toastify"

function Signup(props){
    const history = useHistory()
    const main = useContext(createcontext)
    const [loggedin,setloggedin] = main.loggedin
    const [currentuser,setcurrentuser] = main.currentuser
    const [doc,setdoc] = useState(false)
    const [count,setcount] = useState([])
    const [clinic,setclinic] = useState(false)
    const [patient,setpatient] = useState(false)
    const [user,setuser] = useState({})
    function onchange(e){
        setuser({...user,[e.target.name]:e.target.value})
        if(e.target.value==="doctor"){
            setdoc(true)
            setpatient(false)
            setclinic(false)
        }
        if(e.target.value==="clinic"){
            setdoc(false)
            setpatient(false)
            setclinic(true)
        }
        if(e.target.value==="patient"){
            setdoc(false)
            setpatient(true)
            setclinic(false)
        }
    }
      function onsubmit(e){
          e.preventDefault()
          toast.success("Successfully Registered",{className:"text-center mt-4 rounded"})
          setcurrentuser(user)
          setloggedin(true)
          history.push("/homepage")
      }
    
    return(
        <div className="signup">
        {loggedin?<p className="text-center font-weight-normal display-4">Already Logged In</p>:
        <div className="container pt-5 ">
    <p className="text-center font-italic display-4 font-weight-normal" style={{ color:"black"}}>Sign Up</p>
    <div className="d-flex justify-content-center">
    <form style={{width:"50%"}} onSubmit={onsubmit}>
    <input type="text" name="name" placeholder="Name" onChange={e=>onchange(e)}  className="form-control my-3" required/>
    <div className="form-row">
    <div className="form-group col-md-6 col-sm-3">
      <input type="email" name="email" onChange={e=>onchange(e)} placeholder="Email" className="form-control"  required/>
    </div>
    <div className="form-group col-md-6 col-sm-3">
      <input type="password" name="password" onChange={e=>onchange(e)} placeholder="Password" className="form-control"  required/>
    </div>
  </div>
    <div className="dropdown mr-1">
    <div className="form-group">
    <select onChange={e=>onchange(e)} name="sex" className="form-control mb-3" required>
    <option>Select Your Gender</option> 
    <option value="male">male</option>
      <option value="female">Female</option>
      <option value="others">Others</option>
    </select>
  </div>
  </div>
  <textarea cols="10" rows="4" placeholder="Enter your address here..." className="form-control" required>
  
  </textarea>
    <input type="text" name="mobile" placeholder="Mobile no" onChange={e=>onchange(e)} className="form-control my-3" required/>
    <div className="dropdown mr-1">
    <div className="form-group">
    <select onChange={e=>onchange(e)} name="role" className="form-control mb-3" required>
    <option>Select Your Role</option> 
    <option value="doctor" >Doctor</option>
      <option value="clinic">Clinic</option>
      <option value="patient">Patient</option>
    </select>
  </div>
  </div>
{/*doctor details*/}
{doc?
    <div>
  <div className="form-row">
  <div className="form-group col-md-6">
    <label htmlFor="inputEmail4" className="font-weight-bold">MCI Number</label>
    <input type="text" onChange={e=>onchange(e)} className="form-control" name="mcino" id="inputEmail4" placeholder="MCI NO" required/>
  </div>
  <div className="form-group col-md-6">
    <label htmlFor="inputPassword4" className="font-weight-bold">Qualifications</label>
    <input type="text"  onChange={e=>onchange(e)} name="qualifications" className="form-control" id="inputPassword4" placeholder="MBBS..,MD..,etc.." required/>
  </div>
</div>
<div className="form-group">
  <label htmlFor="inputAddress" className="font-weight-bold">Specialization</label>
  <input type="text"  onChange={e=>onchange(e)} name="specialization"  className="form-control" id="inputAddress" placeholder="Cardiologist,Neuroligist,etc..." required/>
</div>
<div className="form-group">
<p className="font-weight-bold text-center">Select Your Consulting Hours</p>
<div className="d-flex justify-content-around">
  <label htmlFor="from" className="font-weight-bold px-2">From:</label>
  <input type="time" name="from"  onChange={e=>onchange(e)}  className="form-control" id="from" required/>
  <label htmlFor="to" className="font-weight-bold px-2">To:</label>
  <input type="time" name="to" onChange={e=>onchange(e)}  className="form-control" id="to" required/>
</div>
</div>
  </div>
    :
    null}
    
{/*Clinic  details */}
{clinic?
<div>
<div className="form-row">
<div className="form-group col-md-6">
  <label htmlFor="inputEmail4" className="font-weight-bold">Clinic Name</label>
  <input type="text" onChange={e=>onchange(e)} className="form-control" name="clinicname" id="inputEmail4" placeholder="Clinic Name" required/>
</div>
<div className="form-group col-md-6">
<label htmlFor="inputAddress" className="font-weight-bold">Specializations Available</label>
<input type="text"  onChange={e=>onchange(e)} name="specializations"  className="form-control" id="inputAddress" placeholder="Cardiologist,Neuroligist,etc..." required/>

</div>
</div>

<div className="form-group">
<p className="font-weight-bold text-center">Clinic Working Hours</p>
<div className="d-flex justify-content-around">
<label htmlFor="from" className="font-weight-bold px-2">From:</label>
<input type="time" name="from"  onChange={e=>onchange(e)}  className="form-control" id="from" required/>
<label htmlFor="to" className="font-weight-bold px-2">To:</label>
<input type="time" name="to" onChange={e=>onchange(e)}  className="form-control" id="to" required/>
</div>
</div>
</div>
:null}

{/*patient*/}
{patient?
<div>
<div className="form-row">
<div className="form-group col-md-6">
  <label htmlFor="inputEmail4" className="font-weight-bold">Blood Group</label>
  <input type="text" onChange={e=>onchange(e)} className="form-control" name="bloodgroup" id="inputEmail4" placeholder="O+ve,AB-ve" required/>
</div>
<div className="form-group col-md-6">
<label htmlFor="inputAddress" className="font-weight-bold">Blood Pressure</label>
<input type="text"  onChange={e=>onchange(e)} name="bloodpressure"  className="form-control" id="inputAddress" placeholder="In numbers only" required/>
</div>
</div>
<div className="form-group">
  <label htmlFor="inputEmail4" className="font-weight-bold">Sugar Level</label>
  <input type="text" onChange={e=>onchange(e)} className="form-control" name="sugarlevel" id="inputEmail4" placeholder="In numbers only" required/>
</div>
</div>
:null}
    <div className="d-flex justify-content-center mt-5">
    <button className="btn btn-warning font-weight-bold px-5">Sign Up</button>
    </div>
    <div className="d-flex justify-content-center mb-3">
    <Link to="/login" className="text-center text-white font-weight-bold mt-2">Already a User?Login</Link>
    </div>
  </form>
    </div>
    </div>
}
    </div>
    )
}

export default Signup