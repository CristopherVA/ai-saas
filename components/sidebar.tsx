"use client"
import { cn } from '@/lib/utils'
import { Code, ImageIcon, LayoutDashboard, MessageSquarePlus, Music, MusicIcon, Settings, VideoIcon } from 'lucide-react'
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Robot from '@/public/robot.png'
import FreeLimitCount from './free-counter'

const monserrat = Montserrat({
    weight: '700',
    subsets: ['latin']
})

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: 'Conversation',
        icon: MessageSquarePlus,
        href: '/conversation',
        color: 'text-violet-500'
    },
    {
        label: 'Image Generator',
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-700'
    },
    {
        label: 'Video Generator',
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-700'
    },
    {
        label: 'Music Generation',
        icon: Music,
        href: '/music',
        color: 'text-emerald-700'
    },
    {
        label: 'Code Genearation',
        icon: Code,
        href: '/code',
        color: 'text-green-700'
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
]

interface PropsSidebar {
    apiLimitCount: number,
    isPro: boolean
}

const Sidebar = ({ apiLimitCount = 0, isPro }: PropsSidebar) => {
    const pathname = usePathname()

    console.log(isPro)
    return (
        <div className='space-y-4 py-4 h-full flex-col flex text-white bg-[#111827]'>
            <div className='px-3 py-2 flex-1'>
                <Link
                    href='/dashboard'
                    className='flex items-center pl-3 mb-14'
                >
                    <div className='relative w-8 h-8 mr-4'>
                        <Image
                            fill
                            alt='logo'
                            src={Robot}
                        />
                    </div>
                    <h1 className={cn('text-2xl font-bold', monserrat.className)}>Smater</h1>
                </Link>
                <div>
                    {routes.map(route => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400')}
                        >
                            <div className='flex items-center flex-1'>
                                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {!isPro && (
                <FreeLimitCount isPro={isPro} apiLimitCount={apiLimitCount} />
            )}
        </div>
    )
}

export default Sidebar