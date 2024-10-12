import { createSlice } from '@reduxjs/toolkit'
import { FaGithub, FaYoutube } from 'react-icons/fa'

const initialState = {
  email_address: 'shipatulhasan328@gmail.com',
  first_name: 'Shipatul Hasan',
  last_name: 'Shakib',
  links: [
    {
      platform: 'github',
      url: '',
      background: '#000',
      icon: FaGithub
    },
    {
      platform: 'youtube',
      url: '',
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
        (i) => i.platform == action.payload.platform
      )
      if (!exist) {
        state.links.push(action.payload)
      }
    },
    updateLink: (state, action) => {
      const currentLink = state.links[action.payload.id]
      state.links[action.payload.id] = { ...currentLink, ...action.payload }
    },
    removeLink: (state, action) => {
      state.links.splice(action.payload, 1)
    },
    updateLinksOrder: (state, action) => {
      state.links = action.payload
    }
  }
})

export const { addLink, updateLink, removeLink, updateLinksOrder } =
  profileSlice.actions
export default profileSlice.reducer
