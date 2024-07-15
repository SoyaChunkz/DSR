import React from 'react'

const Controls = () => {
  return (
    <div className='flex items-center justify-around mt-3'>
        <button className='bg-purple-700 text-white rounded-full px-7 py-2 '>ADD</button>
        <button className='bg-purple-700 text-white rounded-full px-7 py-2 '>UPDATE</button>
        <button className='bg-purple-700 text-white rounded-full px-7 py-2 '>DELETE</button>
        <button className='bg-purple-700 text-white rounded-full px-7 py-2 '>EXPORT</button>
    </div>
  )
}

export default Controls