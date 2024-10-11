import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/main-layout'
import LinkEditor from '../pages/Editor/link-editor'
import Preview from '../pages/preview'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <LinkEditor />
      }
    ]
  },
  {
    path: '/preview',
    element: <Preview />
  }
])
export default router
