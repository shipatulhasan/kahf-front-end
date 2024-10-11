import { createSlice } from '@reduxjs/toolkit'
import { FaGithub, FaYoutube } from 'react-icons/fa'

const initialState = {
  email_address: 'shipatulhasan328@gmail.com',
  first_name: 'Shipatul Hasan',
  last_name: 'Shakib',
  links: [
    {
      platform: 'github',
      link: '',
      background: '#000',
      icon: FaGithub
    },
    {
      platform: 'youtube',
      link: '',
      background: '#EB393E',
      icon: FaYoutube
    }
  ],
  profile_picture:
    'https://lh3.googleusercontent.com/a/ACg8ocIMKVpUyFnS_GwQvviruMX4INWeKP2P2qziz_DW3r-zfXwzDVCI=s288-c-no'
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addLink: (state, action) => {
      const exist = state.links.find(
        (i) => i.paltform == action.payload.paltform
      )
      if (exist) {
        exist.link = action.payload.link
      } else {
        state.links.push(action.payload)
      }
    }
  }
})

export const { addLink } = profileSlice.actions
export default profileSlice.reducer
