import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
       <h5 onClick={()=>{
          props.setconfirmRidePanel(false)
          
        }}
         className='p-1 text-center absolute w-[93%] top-0'><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
         <h2 className='text-2xl font-semibold mb-5'>Confirm your ride</h2>

         <div className='flex gap-2 flex-col justify-between items-center'>
         <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
         <div className='w-full mt-5'>

            <div className='border-t-2 border-b-2 flex items-center gap-5 p-3'>
              <i className="ri-map-pin-2-fill"></i>
              <div>
                {/* <h3 className='font-medium text-lg'>562/11-A</h3> */}
                <p className='text-sm text-gray-700'>{props.pickup}</p>
              </div>
            </div>

            <div className='border-b-2 flex items-center gap-5 p-3'>
              <i className="ri-square-fill"></i>
              <div>
                {/* <h3 className='font-medium text-lg'>Third Wave Coffee</h3> */}
                <p className='text-sm text-gray-700'>{props.destination}</p>
              </div>
            </div>

            <div className='flex items-center gap-5 p-3'>
              <i className="ri-cash-line"></i>
              <div>
                <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]}</h3>
                <p className='text-sm text-gray-700'>Cash Cash</p>
              </div>
            </div>

         </div>
            <button onClick={()=>{
                props.setvehicleFound(true)
                props.setconfirmRidePanel(false)
                props.createRide()
            }}
            className="w-full mt-5 font-semibold  bg-black text-white p-2 rounded-xl">Confirm</button>
         </div>

    </div>
  )
}

export default ConfirmRide
