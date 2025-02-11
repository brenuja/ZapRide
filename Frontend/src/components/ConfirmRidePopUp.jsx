import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const [otp, setotp] = useState('')

  const navigate = useNavigate()

  const submitHandler = async (e)=>{
    e.preventDefault()


    try{
     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: props.ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(response.status === 200){
        props.setconfirmridePopUpPanel(false)
        props.setridePopUpPanel(false)
        navigate('/captain-riding', { state: { ride: props.ride } })
      }
    } catch(err){
      console.log("error confirming ride: ", err.response?.data || err.message)
      alert('invalid otp or network error. try again')
    }
    
  }

  return (
    <div>
    <h5 onClick={()=>{
       props.setridePopUpPanel(false)
     }}
      className='p-1 text-center absolute w-[93%] top-0'><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
      <div className='flex items-center justify-between p-3 bg-gray-200 rounded-lg'>
        <div className='flex items-center gap-3'>
             <img className='h-12 w-12 rounded-full object-cover' src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947" alt="" />
             <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5>2.2km</h5>
        </div>

      <div className='flex gap-2 flex-col justify-between items-center'>
      <div className='w-full mt-5'>

         <div className='border-t-2 border-b-2 flex items-center gap-5 p-3'>
           <i className="ri-map-pin-2-fill"></i>
           <div>
             {/* <h3 className='font-medium text-lg'>562/11-A</h3> */}
             <h4 className='text-sm text-black'>{props.ride?.pickup}</h4>
           </div>
         </div>

         <div className='border-b-2 flex items-center gap-5 p-3'>
           <i className="ri-square-fill"></i>
           <div>
             {/* <h3 className='font-medium text-lg'>Third Wave Coffee</h3> */}
             <h4 className='text-sm text-black'>{props.ride?.destination}</h4>
           </div>
         </div>

         <div className='flex items-center gap-5 p-3'>
           <i className="ri-cash-line"></i>
           <div>
             <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
             <p className='text-sm text-gray-700'>Cash Cash</p>
           </div>
         </div>

      </div>
      

      <div className="flex gap-5 space-x-4">
            <form onSubmit={submitHandler}>
                <input value={otp} onChange={(e)=> setotp(e.target.value)} type="text" placeholder='Enter OTP'className='bg-[#eee] px-12 py-2 mb-4 text-lg rounded-lg w-full mt-3' />
            <button className="w-full flex justify-center px-8 font-semibold bg-emerald-700 text-white p-2 rounded-xl">Confirm</button>
            <button onClick={() => {
              props.setconfirmridePopUpPanel(false)
              props.setridePopUpPanel(false)
            }}
            className="w-full px-8 font-semibold bg-red-500 text-white mb-4 p-2 rounded-xl">Cancel
            </button>
            </form>
          </div>
         
     
      </div>

 </div>
  )
}

export default ConfirmRidePopUp
