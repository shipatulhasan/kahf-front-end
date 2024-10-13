import { Container, Stack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import FormLayout from '../components/form-layout'
import axiosInstance from '../lib/axios-instance'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
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
      url: '/account/create-user',
      method: 'POST',
      data: obj
    })
      .then((data) => {
        if (data.status == 201) {
          toast({
            title: 'Account created successfully',
            status: 'success',
            isClosable: true
          })
          navigate('/')
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
            title: 'Sign up',
            footerText: 'Already have an account?',
            footerButtonText: 'login',
            handleSubmit,
            isLoading
          }}
        />
      </Stack>
    </Container>
  )
}

export default Signup
