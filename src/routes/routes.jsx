import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/main-layout'
import LinkEditor from '../pages/Editor/link-editor'
import Preview from '../pages/preview'
import ProfileDetails from '../pages/Editor/profile-details'
import Signup from '../pages/signup-page'
import Login from '../pages/login-page'
import ProtectedRoute from '../components/protected-route'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
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
    element: (
      <ProtectedRoute>
        <Preview />
      </ProtectedRoute>
    )
  },
  {
    path: '/sign-up',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
])
export default router
