import React from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limits'
import ModalProvider from '@/components/modal-provider'


const DashboardLayout = async ({
    children
}: { children: React.ReactNode }) => {

    const apiLimitCount = await getApiLimitCount()

    return (
        <div className='h-full relative'>
            <div className='hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0  bg-gray-900'>
                <Sidebar apiLimitCount={apiLimitCount} />
            </div>
            <main className='md:ml-72'>
                <Navbar />
                <ModalProvider />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout