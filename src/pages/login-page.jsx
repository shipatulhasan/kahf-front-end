import { Container, Stack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import FormLayout from '../components/form-layout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../lib/axios-instance'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    const form = e.target
    const email_address = form.email_address.value
    const password = form.password.value
    const obj = {
      email_address,
      password
    }

    axiosInstance({
      url: '/account/login',
      method: 'POST',
      data: obj
    })
      .then((data) => {
        if (data.status == 200) {
          navigate('/')
        } else {
          toast({
            title: data?.message,
            status: 'error',
            isClosable: true
          })
        }
      })
      .catch((err) =>
        toast({
          title: err?.response?.data?.message,
          status: 'error',
          isClosable: true
        })
      )
      .finally(() => setIsLoading(false))
  }
  return (
    <Container maxW={'container.xl'}>
      <Stack minH={'100vh'} justifyContent={'center'}>
        <FormLayout
          data={{
            title: 'Sign in',
            footerText: `Doesn't have an account?`,
            footerButtonText: 'sign-up',
            handleSubmit,
            isLoading
          }}
        />
      </Stack>
    </Container>
  )
}

export default Login
