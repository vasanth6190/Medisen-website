import React,{useState,createContext,useContext,useEffect} from 'react';
import {Switch,Route,BrowserRouter,Link} from "react-router-dom"
import './App.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./containers/Login/Login"
import { FaHandHoldingHeart,FaHeartbeat } from 'react-icons/fa';
import Signup from "./containers/Signup/Signup"
import Homepage from "./containers/Homepage/Homepage"
import Appointments from "./containers/Appointments/Appointments"
import Profile from "./containers/Profile/Profile"
import {unregister} from "./Interceptor"
export const createcontext = createContext()
export const Contextvariables = (props)=>{
  const [loggedin,setloggedin] = useState(false)
  const [currentuser,setcurrentuser] = useState()
  const [appointments,setappointments] = useState([])
  const [docappointments,setdocappointments] =useState([])
  const [doctors,setdoctors] = useState([])
  const [clinic,setclinic] = useState([])
  const [patients,setpatients] = useState([])
  const [specialization,setspecialization] = useState([])
  return(
    <createcontext.Provider value={{
      loggedin : [loggedin,setloggedin],
      currentuser:[currentuser,setcurrentuser],
      appointments:[appointments,setappointments],
      doctors:[doctors,setdoctors],
      clinic:[clinic,setclinic],
      patients:[patients,setpatients],
      docappointments:[docappointments,setdocappointments],
      specialization:[specialization,setspecialization]
    }}>
    {props.children}
    </createcontext.Provider>
  )
}
toast.configure({autoClose:2000});
function App(props) {
  const main = useContext(createcontext)
  const [loggedin,setloggedin] = main.loggedin
  const [currentuser,setcurrentuser] = main.currentuser
  const [doctors,setdoctors] = main.doctors
  const [clinic,setclinic] = main.clinic
  const [specialization,setspecialization] = main.specialization
  async function getspecialization(){
    const ans3 = await fetch("http://localhost:5000/specializations",{headers:{}})
    const ans4 = await ans3.json()
    setspecialization(ans4)
  }
  async function clinicget(){
    const doct1 = await fetch("http://localhost:5000/clinics",{headers:{}})
    const ans1 = await doct1.json()
    setclinic(ans1)
    getspecialization()
  }
  async function doctorsget(){
    const doct = await fetch("http://localhost:5000/doc",{headers:{}})
    const ans = await doct.json()
    setdoctors(ans)
    clinicget()
  }
  useEffect(()=>{doctorsget()},[loggedin])
  let bool = false
  if(loggedin===true){
    bool=true
  }
  function onclick(){
    setloggedin(false)
    toast.success("Logged out Successfully",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
  }
  return (
    <React.Fragment>
    <BrowserRouter>
    <div style={{backgroundColor:"white"}}>
    <nav className="navbar navbar-expand container" style={{height:"55px"}}>
    <div className="container ml-3">
    <div className="d-flex justify-content-start">
    <Link to="/medisen" className="navbar-brand font-weight-bold"><FaHandHoldingHeart/>MEDISEN</Link>
    {loggedin?
    <ul className="navbar-nav">
    <li className="nav-item">
      <Link to="/homepage" className="nav-link font-weight-bold text-dark">Dashboard</Link>
    </li>
    </ul>:null
    }
    </div>
  <div className="d-flex justify-content-end mt-2">
  <div className="float-right d-flex">
  {loggedin?
    <div className="d-flex justify-content-between">
    <p className="pt-2 font-weight-bold">{currentuser.email.slice(0,5)}...</p>
    <Link to="/medisen" className="mt-1"><button className="btn btn-sm btn-warning font-weight-bold ml-2 border border-dark logout px-3 font-italic" onClick={onclick}>Log Out</button></Link>
    </div>
    :
    <div className="d-flex">
  <Link to="/login"><p className="font-weight-bold mr-4">Login</p></Link>
  <Link to="/signup"><p className="font-weight-bold ">Sign Up</p></Link>
  </div>
  }
  </div>
  </div>
    </div>
   </nav>
   </div>
   {loggedin?
    <div>
   <div className="">
   <Link to="/appointments" className="float-right" style={{marginTop:"10px"}}><button className="btn btn-sm btn-warning text-center font-italic border border-dark px-3 rounded font-weight-bold">{currentuser.role==="patient"?<span>Your Appointments</span>:<span>Edit Consulting Settings</span>}</button></Link>
   </div>
   <div className="">
   <Link to="/profile" className="float-right" style={{marginTop:"10px"}}><button className="btn btn-sm mr-2 btn-warning text-center font-italic border border-dark rounded font-weight-bold">Profile</button></Link>
   </div>
   </div>:null
   } 
   <Switch>
    <Route path="/homepage" exact component={Homepage}/>
    <Route path="/login" exact component={Login}/>
    <Route path="/signup" exact component={Signup}/>
    <Route path="/appointments" exact component={Appointments}/>
    <Route path="/profile" exact component={Profile}/>
    <Route path="/medisen" exact>
    <div className="app">
    <div className="row container">
    <div style={{paddingTop:"130px"}} className="col-sm-2 col-md-5">
    <div className="text-center text-white" style={{fontSize:"30px"}}><FaHeartbeat/></div>
    <h1 className="text-center font-italic text-white">We Are Committed To Your Health</h1>
    <p className="text-center mt-5 font-weight-bold text-white">The Richest Man in the World is Person without illness</p>
    {loggedin?
      null:
      <Link to="/login" className="justify-content-center d-flex"><button className="btn btn-warning font-weight-bold rounded">Make an Appointment</button></Link>
      }
    </div>
    </div>
    </div>
    </Route>
    
    </Switch>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
