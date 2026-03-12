import React from 'react'

const Bannerbox = (props) => {
  return (
    <div className='bannerbox ' >
        <a href="#">

        <img src={props.img} alt="" className=' w-150 h-[200px] hover:scale-105 transition-transform duration-300 '/>
        </a>
    </div>
  )
}
export default Bannerbox;
