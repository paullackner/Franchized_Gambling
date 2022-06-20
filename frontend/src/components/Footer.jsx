import React from 'react';
import { FaDribbbleSquare, FaFacebookSquare, FaGithubSquare, FaInstagram, FaTwitterSquare, } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>GAMBLING.</h1>
        <p className='py-4'>We're no strangers to love
          You know the rules and so do I
          A full commitment's what I'm thinking of
          You wouldn't get this from any other guy

          I just wanna tell you how I'm feeling
          Gotta make you understand</p>
        <div className='flex justify-between md:w-[75%] my-6'>
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
        <div>
          <h6 className='font-medium text-gray-400'>Solutions</h6>
          <ul>
            <li className='py-2 text-sm'>Never</li>
            <li className='py-2 text-sm'>gonna</li>
            <li className='py-2 text-sm'>give</li>
            <li className='py-2 text-sm'>you</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Support</h6>
          <ul>
            <li className='py-2 text-sm'>up</li>
            <li className='py-2 text-sm'>Never</li>
            <li className='py-2 text-sm'>gonna</li>
            <li className='py-2 text-sm'>let</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Company</h6>
          <ul>
            <li className='py-2 text-sm'>you</li>
            <li className='py-2 text-sm'>down</li>
            <li className='py-2 text-sm'>Never</li>
            <li className='py-2 text-sm'>gonna</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Legal</h6>
          <ul>
            <li className='py-2 text-sm'>run</li>
            <li className='py-2 text-sm'>around</li>
            <li className='py-2 text-sm'>and</li>
            <li className='py-2 text-sm'>desert</li>
            <li className='py-2 text-sm'>you</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;