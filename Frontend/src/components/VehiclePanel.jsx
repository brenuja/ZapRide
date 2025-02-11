import React from 'react'

const VehiclePanel = (props) => {

  return (
    <div>
        <h5 onClick={()=>{
          props.setvehiclePanel(false)
        }}
         className='text-center absolute w-[93%] top-0'><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
        <h2 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h2>


        
        <div onClick={()=>{
          props.setconfirmRidePanel(true)
          props.selectVehicle('car')
        }}
        className='flex mb-2 border-2 active:border-black rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-12'src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className='w-[50%]'>
             <h4 className='font-medium text-lg'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
             <h5 className='font-medium text-sm'>2 mins away</h5>
             <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹{props.fare.car}</h2>
        </div>



        <div onClick={()=>{
          props.setconfirmRidePanel(true)
          props.selectVehicle('moto')
        }}
        className='flex mb-2 border-2 active:border-black rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-12'src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='w-[50%]'>
             <h4 className='font-medium text-lg'>Moto <span><i className="ri-user-fill"></i>1</span></h4>
             <h5 className='font-medium text-sm'>3 mins away</h5>
             <p className='font-medium text-xs text-gray-600'>Affordable motorcycle rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹{props.fare.moto}</h2>
        </div>



        <div onClick={()=>{
          props.setconfirmRidePanel(true)
          props.selectVehicle('auto')
        }}
        className='flex mb-2 border-2 active:border-black rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-12'src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className='w-[50%]'>
             <h4 className='font-medium text-lg'>UberAuto <span><i className="ri-user-fill"></i>3</span></h4>
             <h5 className='font-medium text-sm'>2 mins away</h5>
             <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹{props.fare.auto}</h2>
        </div>
        
    </div>
  )
}

export default VehiclePanel
