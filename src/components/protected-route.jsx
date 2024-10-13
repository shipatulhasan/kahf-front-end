import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../lib/axios-instance'
import { saveUser } from '../features/profileSlice'
import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
  HStack,
  Button,
  Stack,
  Container,
  Grid
} from '@chakra-ui/react'
import PageLaout from '../layout/page-layout'
const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axiosInstance({
          url: '/account',
          method: 'GET'
        })
        if (response.data) {
          dispatch(saveUser(response.data))
        } else {
          throw new Error('No user data')
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Authentication failed:', error)
        navigate('/login')
      }
    })()
  }, [dispatch])

  if (isLoading) {
    return <LoadingSkeleton />
  }
  return <>{children}</>
}

export default ProtectedRoute
const LoadingSkeleton = () => {
  return (
    <Stack minH={'100vh'} justifyContent={'center'}>
      <PageLaout
        data={{
          leftItem: (
            <Stack
              alignItems={'center'}
              spacing={4}
              padding={6}
              bg='white'
              borderRadius='md'
              boxShadow='md'
              width='300px'>
              <SkeletonCircle size='120px' />
              <Skeleton height='20px' width='70%' />
              <Skeleton height='15px' width='50%' />
              <VStack spacing={2} width='100%'>
                <Skeleton height='40px' width='100%' />
                <Skeleton height='40px' width='100%' />
              </VStack>
            </Stack>
          ),
          rightItem: (
            <Stack spacing={4} align='start' width='100%' p={5}>
              <Skeleton height='30px' width='40%' />
              <SkeletonText noOfLines={2} spacing='2' width='60%' />

              <Button
                variant='outline'
                width='200px'
                isLoading
                loadingText='Add new link'
              />
              <VStack
                spacing={4}
                padding={6}
                bg='white'
                borderRadius='md'
                boxShadow='md'
                width='100%'>
                {[1, 2].map((link) => (
                  <VStack key={link} spacing={3} width='100%'>
                    <HStack width='100%' justifyContent='space-between'>
                      <Skeleton height='20px' width='20%' />
                      <Skeleton height='20px' width='15%' />
                    </HStack>
                    <Skeleton height='45px' width='100%' />
                    <Skeleton height='45px' width='100%' />
                  </VStack>
                ))}
              </VStack>
            </Stack>
          )
        }}></PageLaout>
    </Stack>
  )
}
