import React from 'react'

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className='flex items-center gap-1 bg-white border-black border-[1px] rounded-2xl px-4 py-3 ml-2'>
      <p className='text-sm font-normal text-black '>
          {userInfo?.fullName}
        </p>
        <button className='text-sm text-black ml-2 bg-white py-2 px-2 border-2 border-black rounded-lg' 
         onClick={onLogout} >
          Logout
        </button>
    </div>
  )
}

export default ProfileInfo