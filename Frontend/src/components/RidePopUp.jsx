import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
       <h5 onClick={()=>{
          props.setridePopUpPanel(false)
        }}
         className='p-1 text-center absolute w-[93%] top-0'><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
         <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
         <div className='flex items-center justify-between p-3 bg-gray-100 rounded-lg'>
           <div className='flex items-center gap-3'>
                <img className='h-12 w-12 rounded-full object-cover' src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947" alt="" />
                <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.firstname}</h2>
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
            <button onClick={() => {
              props.setridePopUpPanel(false)
            }}
            className="w-full px-8 font-semibold bg-gray-400 text-black p-2 rounded-xl"> Ignore
            </button>
             <button onClick={() => {
              props.setconfirmridePopUpPanel(true)
              props.confirmRide()
            }}
            className="w-full  px-8 font-semibold bg-emerald-700 text-white p-2 rounded-xl">Accept
            </button>
           
          </div>
         </div>

    </div>
  )
}

export default RidePopUp
