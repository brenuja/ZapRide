import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {

  const location = useLocation()
  const {ride} = location.state || {}
  const {socket} = useContext(SocketContext) 
  const navigate = useNavigate()

  socket.on("ride-ended", () =>{
    navigate('/home')
  })

  return (
    
    <div className='h-screen'>
      <Link to='/home' className='fixed right-2 left-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
       <i className="text-lg font-bold ri-home-4-line"></i>
      </Link>
        <div className='h-1/2'>
         <LiveTracking/>
        </div>
        <div className='h-1/2 m-5'>
          <div className='flex items-center justify-between'>
            <img className="h-10 ml-2"src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"alt=""/>
            <div className='text-right mr-3'>
              <h2 className='text-xl font-medium'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
              <h4 className='font-semibold -mb-1 -mt-1 text-lg'>{ride?.captain.vehicle?.plate || "N/A" }</h4>
              <p className='text-sm text-gray-700'>White Suzuki S-Presso LXI</p>
            </div>
          </div>

          <div className="flex gap-2 flex-col justify-between items-center">
           <div className="w-full mt-5">
             <div className="border-b-2 flex items-center gap-5 p-3">
               <i className="ri-map-pin-2-fill"></i>
               <div>
                 {/* <h3 className="font-medium text-lg">562/11-A</h3> */}
                 <h4 className="text-sm -mt-1 text-black">{ride?.destination}</h4>
                </div>
              </div>

              <div className="flex items-center gap-5 p-3">
               <i className="ri-cash-line"></i>
               <div>
                 <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                 <p className="text-sm -mt-1 text-gray-700">Cash Cash</p>
                </div>
              </div>
            </div>
          </div>
            <button className=" w-full mt-6 font-semibold  bg-black text-white p-2 rounded-lg">Make a Payment</button>
        </div>
      </div>
  )
}

export default Riding

