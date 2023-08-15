"use client"

import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("9d9187e8-81c8-47a5-a6ae-f0199fab0cd6")
    }, [])

    return null;
}