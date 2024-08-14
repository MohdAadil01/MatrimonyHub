import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
function SearchBar({value, changeInput}) {
  return (
    <div className='searchbar-wrap flex items-center border-b-2 border-solid border-b-slate-500 py-[1.5rem] px-[1rem]' >
    <SearchIcon className="searchbar-icon text-slate-500 mr-8" />
    <input className='text-2xl outline-none border-none w-full placeholder:text-slate-500 bg-inherit' type='text' placeholder='Search Services...' value={value} onChange={changeInput} />
    </div>
  )
}

export default SearchBar;