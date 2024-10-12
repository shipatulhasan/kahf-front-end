import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/main-layout'
import LinkEditor from '../pages/Editor/link-editor'
import Preview from '../pages/preview'
import ProfileDetails from '../pages/Editor/profile-details'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <LinkEditor />
      },
      {
        path: '/profile-details',
        element: <ProfileDetails />
      }
    ]
  },
  {
    path: '/preview',
    element: <Preview />
  }
])
export default router
