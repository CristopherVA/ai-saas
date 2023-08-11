"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'
import { Badge } from './ui/badge'
import { Check, CodeIcon, ImageIcon, MessagesSquare, MusicIcon, VideoIcon, Zap } from 'lucide-react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import axios from 'axios'

const tools = [
    {
        label: 'Conversation',
        icon: MessagesSquare,
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        href: '/conversation'
    },
    {
        label: 'Music Generation',
        icon: MusicIcon,
        color: 'text-emedald-500',
        bgColor: 'bg-emedald-500/10',
        href: '/music'
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: 'text-pink-700',
        bgColor: 'bg-pink-700/10',
        href: '/image'
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        href: '/video'
    },
    {
        label: 'Code Generation',
        icon: CodeIcon,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        href: '/code'
    },
]

export const ProModal = () => {
    const proModal = useProModal()
    const [loading, setLoading] = useState(false)

    const onSubcribe = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe');
            window.location.href = response.data.url;
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }


    return (
        <Dialog open={proModal.isOpen} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2 '>
                        <div className='flex items-center gap-x-2 font-bold py-1'>
                            Upgrade to Smater
                            <Badge variant='premiun' className='uppercase text-sm py-1'>
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
                        {tools.map((tool) => (
                            <Card key={tool.label} className='flex border-black/5 items-center justify-between'>
                                <div className='flex items-center gap-x-4'>
                                    <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div>{tool.label}</div>
                                </div>
                                <Check className='text-primary w-5 h-5 mr-2' />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={onSubcribe}
                        disabled={loading}
                        size="lg"
                        variant='premiun'
                        className='w-full'
                    >
                        Upgrade
                        <Zap className='w-4 h-4 fill-white ml-2' />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
