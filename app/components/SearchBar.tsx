"use client"
import React, { FormEvent, useState } from "react";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    if (
      hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')
    ) {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
}

const SearchBar = () => {
  const [searchpromt, setSearchPromt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValidLink = isValidAmazonProductURL(searchpromt);

    if (!isValidLink) return alert('please provide a valid amazon link');

    try {
      setIsLoading(true)
      //scraping
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mt-12">
      <input type="text"
        placeholder="enter product link"
        value={searchpromt}
        onChange={(e) => setSearchPromt(e.target.value)}
        className="searchbar-input" />
      <button type="submit" className="searchbar-btn" disabled={searchpromt === ''}>{isLoading ? 'Searching....' : "Search"}</button>
    </form>
  )
}

export default SearchBar;
