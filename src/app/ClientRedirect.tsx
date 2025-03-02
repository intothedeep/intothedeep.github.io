'use client';

import { useIsMounted } from '@/hooks/useIsMounted.hook';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const ClientRedirect = () => {
    const router = useRouter();

    const { isMounted } = useIsMounted();

    useEffect(() => {
        if (isMounted) {
            router.push('/about');
        }
    }, [isMounted]);

    return undefined;
};

export default ClientRedirect;
