import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'



const orders = () => {

  const { products, currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])

  return (
    <div className='border-t pt-16'>

        <div className='text-2xl'>
          <h2 className='text-4xl font-serif text-[#053342] '>~My Orders~</h2> <br></br>
        </div>

        <div> 
            {
              products.slice(1,4).map((item,index) => (
                <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm'>
                        <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                        <div>
                          <p className='sm:text-base font-medium text-[#053342]'>{item.name}</p>
                          <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                            <p>{currency}{item.price}</p>
                            <p>Quantity:1 {item.quantity}</p>
                          </div>
                          <p className='mt-1'>Date: <span className=' text-gray-600'>27 july 2025</span></p>
                          
                        </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                            <p className='text-sm md:text-base'>shipped</p>
                        </div>
                        <button className='border px-4 py-2 text-sm font-medium '>Track Order</button>
                    </div>
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default orders
