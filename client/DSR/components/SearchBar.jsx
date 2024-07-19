import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      onClearSearch();
    }
  };

  return (
    <div className='w-full max-w-xl flex items-center justify-center px-4 bg-slate-100 rounded-md border border-transparent hover:border-blue-500 transition-transform transform hover:scale-105'>
      <FaMagnifyingGlass
        className={`text-xl text-slate-400 cursor-pointer hover:text-green-500 transition-transform transform hover:scale-110 shrink-0`}
        onClick={handleSearch}
      />
      <input
        type='text'
        placeholder='Search Entries'
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className='w-full text-sm bg-transparent px-3 py-[11px] outline-none input-placeholder'
      />

      {
        value && (
          <IoMdClose
            className='text-xl text-slate-500 cursor-pointer hover:text-red-500 ml-3 transition-transform transform hover:scale-110'
            onClick={onClearSearch}
          />
        )
      }


    </div>

    
  );
};

export default Searchbar;
