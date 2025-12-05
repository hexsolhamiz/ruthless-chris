import Image from 'next/image'
import React from 'react'

export const Seb = () => {
    return (
        <div className='relative w-10 h-10 rounded-full'>
            <Image
                src="/icons/seb.png"
                alt='seb'
                fill
                className='bg-contain'
            />
        </div>
    )
}
