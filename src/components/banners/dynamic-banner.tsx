import Image from 'next/image'
import React from 'react'

export const DynamicBanner = () => {
    return (
        <div className='min-h-[350px] w-full px-4'>

            <div className='flex justify-center items-center h-[180px] w-full bg-white/10 rounded-4xl'>
                <Image
                    src="/seb.png"
                    alt="logo"
                    height={150}
                    width={150}
                    className=''

                />
            </div>
        </div>
    )
}
