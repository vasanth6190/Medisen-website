import React,{useState,useContext,useEffect} from "react"
import {useHistory,useLocation} from "react-router-dom"
import {toast} from "react-toastify"
import {createcontext} from "../../App"
import axios from "axios"
function Displaycard(props){
    const location = useLocation()
    const history = useHistory()
    const routename = location.pathname
    const main = useContext(createcontext)
    const [appointments,setappointments] = main.appointments
    const [currentuser,setcurrentuser] = main.currentuser
    const [currentcard,setcurrentcard] = useState(props.res)
    async function onclick(e){
        e.preventDefault()
        if(appointments.length===0){
            currentcard.booked = !currentcard.booked
            currentcard.removed=!currentcard.removed
            const role = currentcard.role
            const pat_id = currentuser.pat_id
            let id = 0
            if(role==="doctor"){
              id = currentcard.doc_id
            }
            else if(role==="clinic"){
                id = currentcard.cli_id
            }
            const body = {role,id,pat_id}
            const ans = await fetch("http://localhost:5000/appointments",{
              method:"POST",
              headers:{"Content-type":"application/json"},
              body:JSON.stringify(body)
            })
            toast.success("Appointment Booked",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
            setappointments([...appointments,{...currentcard}])
            history.push(routename)
        }
        else{
        appointments.map(async res=>{
        if(currentcard.name===res.name){
          toast.error("Already Booked",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
          history.push(routename)
        }
        else{
            currentcard.booked = !currentcard.booked
            currentcard.removed=!currentcard.removed
            const role = currentcard.role
            const pat_id = currentuser.pat_id
            let id = 0
            if(role==="doctor"){
              id = currentcard.doc_id
            }
            else if(role==="clinic"){
                id = currentcard.cli_id
            }
            const body = {role,id,pat_id}
            const ans = await fetch("http://localhost:5000/appointments",{
              method:"POST",
              headers:{"Content-type":"application/json"},
              body:JSON.stringify(body)
            })
        toast.success("Appointment Booked",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
        setappointments([...appointments,{...currentcard}])
        history.push(routename)
        }})}
    }
    async function removeapp(e){
        currentcard.booked = !currentcard.booked
        currentcard.removed=!currentcard.removed
        const pat_id = currentuser.pat_id
        const role = currentcard.role
        let id=0
        if(role==="doctor"){
          id = currentcard.doc_id
        }
        else if(role==="clinic"){
            id = currentcard.cli_id
        }
        const ans = await axios.delete(`http://localhost:5000/docclidelete?pat_id=${pat_id}&role=${role}&id=${id}`)
        let indextodel=0
        toast.success("Appointment cancelled",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
        e.preventDefault()
        appointments.map((result,index)=>{
            if(result.name===currentcard.name){
                indextodel=index
            }
        })
        appointments.splice(indextodel,1)
        history.push(routename)
    }
    return(
        <div className="container">
        <div className="card" style={{marginBottom:"20px"}}>
        <h3 className="card-header font-italic font-weight-bold text-white bg-dark">{currentcard.name}</h3>
        <div className="card-body" style={{backgroundColor:"aliceblue"}}>
          <h3 className="card-title font-italic  font-weight-bold"> {currentcard.specializations.charAt(0).toUpperCase()+currentcard.specializations.slice(1)}</h3>
          <p className="card-text font-weight-bold"><h5 className="font-italic font-weight-bold">Address:</h5> {currentcard.address}</p>
          <p className="font-weight-bold"><h5 className="font-italic font-weight-bold">Contact:</h5> {currentcard.mobile}</p>
          <h5 className="font-weight-bold font-italic">Consulting Hours:</h5>
          <div className="d-flex justify-content-start mb-3">
          <h6 className="font-weight-bold"><span className="font-weight-bold">From:</span> {currentcard.from}</h6>
          <h6 className="ml-3 font-weight-bold"><span className="font-weight-bold">To:</span> {currentcard.to}</h6>
          </div>
        {routename==="/homepage"?<button className="btn btn-sm btn-warning mr-2 font-weight-bold" onClick={e=>onclick(e)}>Book Appointment</button>:null}
         {routename==="/appointments"?<button onClick={e=>removeapp(e)} className="btn btn-sm btn-danger mr-2 font-weight-bold">Cancel Appointment</button>:null}
         </div>
      </div>
      </div>
    )
}

export default Displaycard