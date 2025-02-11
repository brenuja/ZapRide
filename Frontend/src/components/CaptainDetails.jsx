import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext)

  return (
    <div>
      <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-2'>
              <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUUzpyi3Hl2UdDKtdxchbn-UF-Y1BKBOd7hA&s" alt="" />
              <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
            </div>
            <div>
               <h4 className='text-xl font-semibold'>₹295.02</h4>
                <p className='text-sm font-medium text-gray-600'>Earned</p>
            </div>
          </div>  
          <div className='flex p-5 mt-10 bg-gray-200 rounded-xl justify-center gap-5 items-start'>
            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-time-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
               <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
               <h5 className='text-lg font-medium'>10.2</h5>
               <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
          </div>  
    </div>
  )
}

export default CaptainDetails
