import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [finishRidePanel, setfinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function (){
        if(finishRidePanel){
          gsap.to(finishRidePanelRef.current,{
            transform: 'translateY(0)'
          })
        }else{
          gsap.to(finishRidePanelRef.current,{
            transform: 'translateY(100%)'
          })
        }
      },[finishRidePanel])

  return (
    <div className='h-screen'>
       
    <div className='fixed p-4 top-0 flex items-center justify-between w-full'>
       <Link to='/captain-login' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
       <i className="text-lg font-medium ri-logout-box-r-line"></i>
       </Link>
    </div>
       <div className='h-4/5'>
        <LiveTracking/>
       </div>
        <div className='h-1/5 p-6 relative items-center flex justify-between bg-yellow-400'
          onClick={()=>{
            setfinishRidePanel(true)
          }}
        > 
            <h5 className='p-1 text-center absolute w-[93%] top-0'>
                <i className="text-3xl text-gray-500 ri-arrow-up-wide-line"></i>
            </h5>
            <h4 className='text-xl font-semibold'>4 KM away</h4>
            <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
        </div>

        <div ref={finishRidePanelRef} className='fixed w-full z-10 h-screen bottom-0 bg-white translate-y-full px-3 py-10 pt-12 '>
            <FinishRide 
             ride={rideData}
             setfinishRidePanel={setfinishRidePanel}
            />
        </div>
     </div>
  )
}

export default CaptainRiding
