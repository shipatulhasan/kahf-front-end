import { Container, Stack } from '@chakra-ui/react'
import Header from '../components/header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <Container maxW={'container.xl'} minH={'100vh'}>
      <Stack spacing={10}>
        <Header />
        <Outlet />
      </Stack>
    </Container>
  )
}

export default MainLayout
