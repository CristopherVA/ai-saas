import Image from 'next/image'
import React from 'react'
import Logo from '@/public/robot.png'

export default function Loader() {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center '>
      <div className='w-10 h-10 relative animate-ping'>
        <Image
          alt='Loader'
          fill
          src={Logo}
        />
      </div>
      <p>Smater is thinking...</p>
    </div>
  )
}
