'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [prompts, setPrompts] = useState([])
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchPrompts = async () => {
            setLoading(true)
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPrompts(data);
            setLoading(false);
        }

        if (session?.user.id) fetchPrompts();
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                setIsDeleting(true)
                const response = await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE'
                })
                // console.log('response: ', response)
                if (response.ok && response.status === 200) {
                    const filteredPrompts = prompts.filter((p) => p._id !== post._id)
                    setPrompts(filteredPrompts)
                }
                setIsDeleting(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (loading) return <div className='loader mt-10'></div>

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={prompts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isDeleting={isDeleting}
        />
    )
}

export default MyProfile