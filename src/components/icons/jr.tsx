import Image from 'next/image'
import React from 'react'

export const JR = () => {
    return (
        <div className='relative overflow-hidden w-15 h-15 rounded-full'>
            <Image
                src="/icons/jr-icon.png"
                alt='jr'
                fill
                className='bg-contain'
            />
        </div>
    )
}
