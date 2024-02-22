import { auth } from "@clerk/nextjs";

import { MAX_FREE_COUNT } from "@/constanst";
import prismadb from "@/lib/prismadb";

export const increaseApiLimit = async () => {
    const { userId } = auth()

    if (!userId) return;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId || ''
        }
    })

    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: { userId },
            data: { count: userApiLimit.count = userApiLimit.count + 1 }
        })
    } else {
        await prismadb.userApiLimit.create({
            data: { userId: userId, count: 1 }
        })
    }
}

export const checkApiLimit = async () => {
    const { userId } = auth()

    const userApiLimit = await prismadb.userApiLimit.findUnique({ where: { userId: userId || '' } })
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) {
        return true;
    } else {
        return false;
    }

}

export const getApiLimitCount = async () => {
    const { userId } = auth()

    if (!userId) return 0

    const userApiLimit = await prisma?.userApiLimit.findUnique({ where: { userId } })

    if (!userApiLimit) return 0

    return userApiLimit.count

}
















