import { useContext } from 'react'
import { AppContext } from '@providers/AppProvider'

const Profile = () => {
  const { state } = useContext(AppContext)
  return <div>Профиль: {state.user.username}</div>
}

export default Profile
