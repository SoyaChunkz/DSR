import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url('../../src/assets/ClgBg.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
        className=' relative h-[100vh]'>

        <Navbar />

        <div className='flex items-center justify-center mt-12'>
          <div className=' w-[400px] bg-white border rounded px-7 py-6'>
            <form className='flex flex-col'>
              <h4 className=' text-2xl mb-5 mt-1 font-medium '>Home</h4>

              <label className='text-lg mb-3'>Department</label>
              <select className='select-abc'>
                <option value={'INFT'}>INFT</option>
                <option value={'CMPN'}>CMPN</option>
              </select>

              <label className='text-lg mb-3'>Lab</label>
              <select className='text-[14px] mb-4 px-4 h-9 border-black border-[1.5px] cursor-pointer bg-red-300 shadow-none'>
                <option value={7}>7 </option>
                <option value={11}>11</option>
                <option value={'CC'}>CC</option>
              </select>

              <label className='text-lg mb-3'>Section</label>
              <select className='text-[14px] mb-4 px-4 h-9 border-black border-[1.5px] cursor-pointer appearance-none'>
                <option value={'A'}>A</option>
                <option value={'B'}>B</option>
                <option value={'C'}>C</option>
                <option value={'D'}>D</option>
              </select>

              <button type='submit' className='w-full text-sm bg-purple-700 text-white p-3 rounded mt-4 mb-2 hover:bg-purple-900 transition-all ease-in-out duration-300'>
                Proceed
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home