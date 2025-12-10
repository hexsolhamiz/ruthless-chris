import Image from 'next/image'
import React from 'react'

export const Seb = () => {
    return (
        <div className='relative w-20 h-20 rounded-full'>
            <Image
                src="/icons/seb.png"
                alt='seb'
                fill
                className='bg-contain'
            />
        </div>
    )
}
