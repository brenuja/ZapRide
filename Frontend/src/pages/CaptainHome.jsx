import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {
  
  const [ridePopUpPanel, setridePopUpPanel] = useState(false)
  const [confirmridePopUpPanel, setconfirmridePopUpPanel] = useState(false)
  const [ride, setride] = useState(null)  


  const ridePopUpPanelRef = useRef(null)
  const confirmridePopUpPanelRef = useRef(null)

  const { socket }= useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(()=>{
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () =>{
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {

          // console.log({userId: captain._id,
          //   location: {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude
          //   }})

          socket.emit('update-location-captain',{
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    socket.on('new-ride', (data) =>{
      console.log(data)
      setride(data)
      setridePopUpPanel(true)
    })
    
  }, [])


  async function confirmRide(){

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,

    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setridePopUpPanel(false)
    setconfirmridePopUpPanel(true)

  }
  

  useGSAP(function (){
    if(ridePopUpPanel){
      gsap.to(ridePopUpPanelRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(ridePopUpPanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[ridePopUpPanel])

  useGSAP(function (){
    if(confirmridePopUpPanel){
      gsap.to(confirmridePopUpPanelRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(confirmridePopUpPanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[confirmridePopUpPanel])

  return (
    <div className='h-screen'>
     <div className='fixed p-4 top-0 flex items-center justify-between w-full'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-login' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
     </div>
        <div className='h-3/5'>
          <img className='h-full w-full object-cover' src="https://cdn.prod.www.spiegel.de/images/f66d2af1-b1cd-4ca4-9d57-61ac7776d367_w920_r0.6801007556675063_fpx50_fpy48.93.jpg" alt="" />
        </div>
        <div className='h-2/5 p-6 '>
          <CaptainDetails/>
        </div>

        <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-10 pt-12 '>
            <RidePopUp 
            ride = {ride}
            setridePopUpPanel={setridePopUpPanel} 
            setconfirmridePopUpPanel={setconfirmridePopUpPanel}
            confirmRide={confirmRide}
            />
        </div>
        <div ref={confirmridePopUpPanelRef} className='fixed w-full z-10 h-screen bottom-0 bg-white translate-y-full px-3 py-10 pt-12 '>
            <ConfirmRidePopUp 
            ride = {ride}
            setconfirmridePopUpPanel={setconfirmridePopUpPanel} 
            setridePopUpPanel={setridePopUpPanel}/>
        </div>
      </div>
  )
}

export default CaptainHome
