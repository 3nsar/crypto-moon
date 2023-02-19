import React from 'react'
import videobg from "../assets/tunnel-64814.mp4"
const Banner = () => {
  return (
    <div className='banner-content'>
      <video src={videobg} autoPlay loop muted/>
        <h1>WELCOME TO THE MARKET</h1>
    </div>
  )
}

export default Banner