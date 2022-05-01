import React from 'react'
import Casino from '../assets/casino-157595.png'

function Overview() {
  return (
    <div className='w-full bg-white py-16 px-4'>

        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <img className='w-[400px] mx-auto my-4' src={Casino} alt="/"></img>

            <div className='flex flex-col justify-center'>
                <h1 className='md:text-xl sm:text-3xl text-2xl font-bold py-2'>What is the Gambling House?</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet autem earum nobis ducimus distinctio doloribus cum dolore recusandae sequi vitae. Architecto dicta magnam labore quod similique temporibus reiciendis delectus perferendis, exercitationem distinctio amet cumque accusantium sit voluptatum nihil illum? Ipsum illum exercitationem hic dolore mollitia itaque maxime distinctio non temporibus?</p>
                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-black'>GET STARTED</button>
            </div>

        </div>

    </div>
  )
}

export default Overview