import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
    <h5
      onClick={() => {
        props.setconfirmRidePanel (false);
      }}
      className="p-1 text-center absolute w-[93%] top-0">
      <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
    </h5>
    
    <div className='flex items-center justify-between'>
      <img className="h-10"src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"alt=""/>
        <div className='text-right'>
          <h2 className='text-xl font-medium'>{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h2>
          <h4 className='font-semibold -mb-1 -mt-1 text-lg'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-700'>White Suzuki S-Presso LXI</p>
          <h1 className='text-lg font-semibold'>OTP {props.ride?.otp}</h1>
        </div>
    </div>

    <div className="flex gap-2 flex-col justify-between items-center">
      <div className="w-full mt-5">
        <div className="border-t-2 border-b-2 flex items-center gap-5 p-3">
          <i className="ri-map-pin-2-fill"></i>
          <div>
            {/* <h3 className="font-medium text-lg">562/11-A</h3> */}
            <p className="text-sm text-gray-700">{props.ride?.pickup}</p>
          </div>
        </div>

        <div className="border-b-2 flex items-center gap-5 p-3">
          <i className="ri-square-fill"></i>
          <div>
            {/* <h3 className="font-medium text-lg">Third Wave Coffee</h3> */}
            <p className="text-sm text-gray-700">{props.ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3">
          <i className="ri-cash-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
            <p className="text-sm text-gray-700">Cash Cash</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default WaitingForDriver

