import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

const RobotAvatar = "https://cdn-icons-png.flaticon.com/512/6134/6134346.png"

export default function BotAvatar() {

    return (
        <Avatar className='w-8 h-8 bg-white'>
            <AvatarImage
                className='p-1'
                src={RobotAvatar}
            />


        </Avatar>
    )
}
