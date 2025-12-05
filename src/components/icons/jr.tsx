import Image from 'next/image'
import React from 'react'

export const JR = () => {
    return (
        <div className='relative w-10 h-10 rounded-full'>
            <Image
                src="/icons/jr-icon.png"
                alt='jr'
                fill
                className='bg-contain'
            />
        </div>
    )
}
