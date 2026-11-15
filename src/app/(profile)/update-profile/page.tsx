import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export const dynamic = "force-dynamic"; // এই লাইনটি যোগ করুন

const upDatePage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <div>
            <h1>this is update profiel</h1>
        </div>
    );
};

export default upDatePage;