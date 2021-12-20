import React from 'react'
import Profile from '../../components/ProfilePage'
import { useSelector } from 'react-redux'
function ProfilePage() {
  const currenUser = useSelector(state => state.auth.current)
  return (
    <div>
      <Profile currenUser={currenUser} />
    </div>
  )
}

export default ProfilePage
