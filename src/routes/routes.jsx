import { createBrowserRouter } from 'react-router-dom'
import Preview from '../pages/preview'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Preview />
  }
])
export default router
