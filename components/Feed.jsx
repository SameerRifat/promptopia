'use client'

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPrompts, setAllPrompts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [prompts, setPrompts] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true)
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setAllPrompts(data);
      setLoading(false)
    }

    fetchPrompts();
  }, [])

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPrompts.filter(
      (item) => regex.test(item.creator.userName) || regex.test(item.tag) || regex.test(item.prompt) 
    )
  }

  const handleSearhChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value)
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult)
  }
  
  if(loading) return <div className='loader mt-10'></div>

  return (
    <section className='feed'>
      <form className='w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearhChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList 
        data={searchText !== '' ? searchResults : allPrompts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed