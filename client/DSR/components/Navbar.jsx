import React from 'react'
import ProfileInfo from './ProfileInfo'

const Navbar = () => {
    return (
        <div className='flex items-center pt-3 py-1 justify-between'>
            <div className=' w-[250px]'>
                <img  src="../../src/assets/Logo.png" />
            </div>
            <div className='mr-16'>
                <ProfileInfo />
            </div>
        </div>
    )
}

export default Navbar