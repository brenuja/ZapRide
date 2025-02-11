import React, { useContext, useEffect, useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Home = () => {
  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const [panelOpen, setpanelOpen] = useState(false)
  const [vehiclePanel, setvehiclePanel] = useState(false)
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)
  const [vehicleFound, setvehicleFound] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)
  const [pickupSuggestions, setpickupSuggestions] = useState([])
  const [destinationSuggestions, setdestinationSuggestions] = useState([])
  const [activeField, setactiveField] = useState(null)
  const [fare, setfare] = useState({})
  const [vehicleType, setvehicleType] = useState(null)
  const [ride, setride] = useState(null)

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  const navigate = useNavigate()

  useEffect(() =>{
    socket.emit("join", {userType: "user", userId: user._id})
  }, [user])

  socket.on('ride-confirmed', ride =>{

    setvehicleFound(false)
    setwaitingForDriver(true)
    setride(ride)
  })

  socket.on('ride-started', ride =>{
    console.log(ride)
    setwaitingForDriver(false)
    navigate('/riding', { state: {ride} })
  })

  const  handlePickupChange = async (e) => {
    
    setpickup(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setpickupSuggestions(response.data)
    } catch(error) {
      
    }
 }

 const handleDestinationChange = async (e) =>{
  setdestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setdestinationSuggestions(response.data)
        } catch {
            // handle error
        }
 }

  const submitHandler = (e)=>{
    e.preventDefault()
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height: '70%',
        padding: 22
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
        gsap.to(panelRef.current,{
          height: '0%'
        })
        gsap.to(panelCloseRef.current,{
          opacity:0
        })
      }
  },[panelOpen])

  useGSAP(function (){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehiclePanel])

  useGSAP(function (){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[confirmRidePanel])

  useGSAP(function (){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehicleFound])

  useGSAP(function (){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[waitingForDriver])


  async function findTrip() {
    try {
        setvehiclePanel(true);
        setpanelOpen(false);

        const token = localStorage.getItem('token');

        // console.log("Making request to:", `${import.meta.env.VITE_BASE_URL}/rides/get-fare`);
        // console.log("Token:", token);

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, 
            {
                pickup,
                destination
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("Response data:", response.data);
        setfare(response.data)
    } catch (err) {
        console.error("Error:", err.response?.data || err.message);
    }
 }

 async function createRide () {
 const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
    pickup,
    destination,
    vehicleType
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  console.log("Response data2:", response.data);

 }




  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-20 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div onClick={()=>{
        setvehiclePanel(false)
      }}
       className='h-screen w-screen'>
        <LiveTracking/>
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[35%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef}
          onClick={()=>{
           setpanelOpen(false)
          }} 
          className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-bold'>Find a trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[40%] left-10 bg-gray-800"></div>
            <input 
            onClick={()=>{
              setpanelOpen(true)
              setactiveField('pickup')
            }}
            value={pickup}
            onChange={handlePickupChange}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
            <input 
            onClick={()=>{
              setpanelOpen(true)
              setactiveField('destination')
            }}
            value={destination}
            onChange={handleDestinationChange}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg mt-3 w-full' type="text" placeholder='Enter your destination' />
          </form>
          <button
            onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>

        
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setpanelOpen={setpanelOpen}
              setvehiclePanel={setvehiclePanel}
              setpickup={setpickup}
              setdestination={setdestination}
              activeField={activeField}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bg-white px-3 py-6 translate-y-full pt-12 bottom-0'>
         <VehiclePanel 
         setconfirmRidePanel={setconfirmRidePanel} 
         setvehiclePanel={setvehiclePanel} 
         selectVehicle={setvehicleType}
         fare={fare} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bg-white px-3 py-6 translate-y-full pt-12 bottom-0'>
         <ConfirmRide 
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          fare={fare}
          vehicleType={vehicleType}
          setconfirmRidePanel={setconfirmRidePanel} 
          setvehicleFound={setvehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bg-white px-3 py-6 translate-y-full pt-12 bottom-0'>
        <LookingForDriver
        pickup={pickup}
        destination={destination}
        createRide={createRide}
        fare={fare}
        vehicleType={vehicleType}
        setvehicleFound={setvehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bg-white px-3 py-6 pt-12 bottom-0'>
        <WaitingForDriver 
         ride={ride}
         setvehicleFound={setvehicleFound}
         setwaitingForDriver ={setwaitingForDriver}
         waitingForDriver={waitingForDriver} 
        />
      </div>
    </div>
  )
}

export default Home
