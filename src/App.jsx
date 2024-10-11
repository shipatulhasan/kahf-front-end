import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { Stack } from '@chakra-ui/react'

function App() {
  return (
    <Stack bg='gray.100'>
      <RouterProvider router={router} />
    </Stack>
  )
}

export default App
