import {
  Avatar,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'

import React, { useState } from 'react'
import { handleBlur } from '../lib/handler'

const FormLayout = ({ data }) => {
  const [errors, setErrors] = useState({})

  return (
    <Stack alignItems={'center'}>
      <Box
        maxW={'320px'}
        bg='white'
        w='sm'
        p={6}
        rounded={'xl'}
        boxShadow='lg'
        textAlign='center'>
        <Text fontSize='xl' fontWeight='bold'>
          {data.title}
        </Text>

        <VStack as={'form'} onSubmit={data?.handleSubmit} spacing={4} mt={6}>
          {data?.inputs.map((item, i) => (
            <FormControl
              key={`${data.title}-${i}`}
              // isInvalid={errors[item?.name]}
            >
              <HStack w={'full'} flexWrap={'wrap'}>
                <FormLabel w={{ base: 'full', md: '100px', lg: '200px' }}>
                  {item?.label}
                </FormLabel>
                <Stack spacing={0} w={'full'} flex={1}>
                  <Input
                    placeholder={item?.placeholder}
                    value={item?.value}
                    minW={'100px'}
                    onBlur={(e) => handleBlur(e, setErrors)}
                    name={item?.name}
                  />
                  {errors[item.name] && (
                    <FormErrorMessage>
                      {errors[item.name].replace(/_/g, ' ')}
                    </FormErrorMessage>
                  )}
                </Stack>
              </HStack>
            </FormControl>
          ))}
        </VStack>
      </Box>
    </Stack>
  )
}

export default FormLayout
