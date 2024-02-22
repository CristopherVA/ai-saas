import React from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limits'
import ModalProvider from '@/components/modal-provider'
import { checkSubscription } from '@/lib/subscription'
import { ToasterProvider } from '@/components/toaster-provider'


const DashboardLayout = async ({
    children
}: { children: React.ReactNode }) => {

    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();
    console.log(apiLimitCount, isPro)
    return (
        <div className='h-full relative'>
            <div className='hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0  bg-gray-900'>
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
            </div>
            <main className='md:ml-72'>
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout