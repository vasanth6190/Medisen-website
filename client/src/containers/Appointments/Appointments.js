import React,{useState,useContext} from "react"
import {useHistory} from "react-router-dom"
import Displaycard from "../../components/displaycard/displaycard"
import "./Appointments.css"
import {createcontext} from "../../App"
import { toast } from "react-toastify"
function Appointments(props){
    const history = useHistory()
    const main = useContext(createcontext)
    const [appointments,setappointments] = main.appointments
    const [currentuser,setcurrentuser] = main.currentuser
    const [changed,setchanged] = useState({})
    function onchange(e){
       setchanged({...changed,[e.target.name]:e.target.value})
    }
    function onsubmit(e){
        e.preventDefault()
        setcurrentuser({...currentuser,...changed})
        toast.success("Successfully Altered Consulting Hours",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
        history.push("/homepage")
    }
    return(
        <div className="appointments pt-5">
        {currentuser.role==="patient"?
        <div>
        {
            appointments.map((res,index)=>(
                <Displaycard key ={index} res={res}/>
            ))
        }
          </div>:
          <div className=" d-flex mt-5 justify-content-center container">
          <form className="form-inline justify-content-center" onSubmit={e=>onsubmit(e)}>
          <div className="form-group mb-2">
            <label htmlFor="staticEmail2" className="font-weight-bold font-italic mr-3" style={{fontSize:"20px"}}>From:</label>
            <input type="text" name="from" onChange={e=>onchange(e)} className="form-control mr-3" id="staticEmail2" placeholder={currentuser.from}/>
          </div>
          <div className="form-group ml-3 mb-2">
            <label htmlFor="inputPassword2" className="font-weight-bold font-italic mr-3" style={{fontSize:"20px"}}>To:</label>
            <input type="text" name="to" onChange={e=>onchange(e)} className="form-control" id="inputPassword2" placeholder={currentuser.to}/>
          </div>
          <button type="submit" className="btn btn-dark font-weight-bold border border-white px-5 ml-3 mb-2">Save</button>
        </form>
          </div>
    }
    </div>
    )
}

export default Appointments