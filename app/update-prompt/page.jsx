"use client"

import Form from '@components/Form';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const EditPrompt = () => {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    useEffect(() => {
        const getPromptDetails = async () => {
            setLoading(true)
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
            setLoading(false)
        }
        if(promptId) getPromptDetails()
    }, [promptId])
    const updatePrompt = async (e) => {
        e.preventDefault();
        // console.log('prompt: ', post.prompt)
        // console.log('userId: ', session?.user.id)
        // console.log('tag: ', post.tag)

        if(!promptId) return alert("Prompt ID not found")

        setSubmitting(true);

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if(response.ok) {
                router.push('/profile');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    if(loading) return <div className='loader mt-10'></div>

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt