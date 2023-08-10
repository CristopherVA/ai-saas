import Image from 'next/image';
import React from 'react'

import EmptyImage from '@/public/empty.png'
interface EmptyProps {
    label: string;
}

const Empty = ({ label }: EmptyProps) => {
    return (
        <div className='h-full p-20 flex flex-col items-center '>
            <div className='relative w-72 h-72'>
                <Image
                    fill
                    alt='Empty'
                    src={EmptyImage}
                />
            </div>
            <p className='text-muted-foreground text-sm text-center'>{label}</p>
        </div>
    )
}

export default Empty