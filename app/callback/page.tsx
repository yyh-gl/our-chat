'use client';

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {authenticateByTmpCode} from "@/app/_auth/actions";

export default function CallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [success, setSuccess] = useState<boolean>()

    useEffect(() => {
        const code = searchParams.get('code')
        if (!code) {
            const loginUrl = process.env.NEXT_PUBLIC_SAASUS_LOGIN_URL || '';
            router.replace(loginUrl);
            return;
        }

        (async () => {
            const result = await authenticateByTmpCode(code)
            if (result.success) {
                setSuccess(result.success)
            }
        })()
    }, [searchParams]);

    useEffect(() => {
        if (success) {
            router.replace('/');
        }
    }, [success]);

    return <div>Processing authentication...</div>;
}
