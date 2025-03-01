'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const ClientRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/about');
    }, []);

    return undefined;
};

export default ClientRedirect;
