'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get("name")

    const [prompts, setPrompts] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPrompts = async () => {
            setLoading(true)
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setPrompts(data);
            setLoading(false);
        }

        if (params?.id) fetchPrompts();
    }, [])

    if (loading) return <div className='loader mt-10'></div>

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={prompts}
        />
    )
}

export default UserProfile