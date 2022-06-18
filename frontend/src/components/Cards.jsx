import React from 'react'
import House from '../assets/1.png'
import Map from '../assets/2.png'
import Shop from '../assets/3.png'

function Cards() {
  return (
    // <div className='w-full py-[10rem] px-4 bg-white'>

    //     <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>

    //         <div className='w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
    //             <img className='w-20 mx-auto mt-[-3rem] bg-white' src={House} alt="/"></img>
    //             <h2 className='text-4xl font-bold text-center py-8'>Gambling House</h2>
    //             <p className='text-center text-3xl font-bold'>Choose your favourite type of Game</p>
                
    //             <div>
    //                 <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black'>Start Gambling</button>
    //             </div>

    //         </div>

    //         <div className='w-full shadow-xl flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
    //             <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Map} alt="/"></img>
    //             <h2 className='text-4xl font-bold text-center py-8'>Map</h2>
    //             <p className='text-center text-3xl font-bold'>Choose wisely your location</p>
                
    //             <div>
    //                 <button className='bg-black w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-[#00df9a]'>Location</button>
    //             </div>

    //         </div>

    //         <div className='w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
    //             <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Shop} alt="/"></img>
    //             <h2 className='text-4xl font-bold text-center py-8'>Shop</h2>
    //             <p className='text-center text-3xl font-bold'>Spend your Money</p>
                
    //             <div>
    //                 <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-black'>Start shopping </button>
    //             </div>

    //         </div>

    //     </div>

    // </div>

    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>

          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={House} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Gambling House</h2>
              <p className='text-center text-3xl font-bold'>Choose your Game</p>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Gambling</button>
          </div>

          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={Map} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Map</h2>
              <p className='text-center text-3xl font-bold'>Go to map</p>
              <a className='bg-[#01283f] text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3' href='/map'>Set your Location</a>
          </div>

          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Shop} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Shop</h2>
              <p className='text-center text-3xl font-bold'>Spend your Money</p>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Shopping</button>
          </div>

      </div>
    </div>
  )
}

export default Cards