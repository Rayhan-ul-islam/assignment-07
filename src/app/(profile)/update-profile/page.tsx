import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const upDatePage = async () => {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    return (
        <div>
            <h1>this is update profiel</h1>
        </div>
    );
};

export default upDatePage;