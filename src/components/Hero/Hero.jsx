import React from 'react'
import Personaje from '../../assets/personaje.png'

const Hero = () => {
  return (
    <section className=''>
      <div>
       texto
      </div>
      <div>
        <img src={Personaje} alt="El personaje de jesus:" />
      </div>
    </section>
  )
}

export default Hero