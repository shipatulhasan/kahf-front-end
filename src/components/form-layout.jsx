import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CommonButton from './common-button'

const FormLayout = ({ data }) => {
  const [errors, setErrors] = useState({})
  const inputs = [
    {
      label: 'Email',
      placeholder: 'Enter your email address',
      name: 'email_address',
      value: '',
      type: 'email'
    },
    {
      label: 'Password',
      placeholder: 'Enter your Password',
      name: 'password',
      value: '',
      type: 'password'
    }
  ]

  return (
    <Stack alignItems={'center'}>
      <Box maxW={'340px'} bg='white' w='sm' p={6} rounded={'xl'} boxShadow='lg'>
        <Text fontSize='xl' fontWeight='bold'>
          {data.title}
        </Text>
        <Stack as={'form'} onSubmit={data?.handleSubmit} spacing={4} mt={6}>
          {inputs?.map((item, i) => (
            <FormControl
              key={`${data.title}-${i}`}
              // isInvalid={errors[item?.name]}
            >
              <FormLabel>{item?.label}</FormLabel>
              <Input
                placeholder={item?.placeholder}
                minW={'100px'}
                type={item?.type}
                name={item?.name}
              />
              {errors[item.name] && (
                <FormErrorMessage>
                  {errors[item.name].replace(/_/g, ' ')}
                </FormErrorMessage>
              )}
            </FormControl>
          ))}
          <CommonButton
            data={{
              width: 'full',
              // icon: FaLink,
              isLoading: data?.isLoading,
              bg: '#633BEF',
              text: data.title,
              type: 'submit',
              color: '#fff',
              border: `0px`
              // handleClick: () => navigate('/preview')
            }}
          />
        </Stack>
        <Text textAlign={'center'} color={'#2e2e2e'} mt={4} fontWeight={'600'}>
          {data?.footerText} please{' '}
          <Text as={'span'} color='#633BEF' textDecoration={'underline'}>
            <Link to={`/${data?.footerButtonText}`}>
              {data?.footerButtonText.replace(/-/g, ' ')}
            </Link>
          </Text>
        </Text>
      </Box>
    </Stack>
  )
}

export default FormLayout
