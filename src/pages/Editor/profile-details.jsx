import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonButton from '../../components/common-button'
import PreviewCard from '../../components/preview-card'
import { saveUser, updateProfileDetails } from '../../features/profileSlice'
import PageLaout from '../../layout/page-layout'
import { handleError } from '../../lib/handler'
import axiosInstance from '../../lib/axios-instance'
const ProfileDetails = () => {
  return (
    <PageLaout
      data={{
        leftItem: <PreviewCard style={{ marginTop: 0 }} />,
        rightItem: <DetailsForm />
      }}
    />
  )
}

export default ProfileDetails
const DetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { first_name, last_name, email_address, profile_picture } = useSelector(
    (state) => state.profile
  )
  const toast = useToast()

  const dispatch = useDispatch()
  const [errors, setErrors] = useState({ first_name, last_name })
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        dispatch(
          updateProfileDetails({ key: 'profile_picture', value: reader.result })
        )
      }
      reader.readAsDataURL(file)
    }
  }

  const inputs = [
    {
      label: 'First name*',
      name: 'first_name',
      placeholder: 'Enter your first name',
      value: first_name,
      type: 'text'
    },
    {
      label: 'Last name*',
      placeholder: 'Enter your last name',
      name: 'last_name',
      value: last_name,
      type: 'text'
    },
    {
      label: 'Email*',
      placeholder: 'Enter your email address',
      name: 'email_address',
      value: email_address,
      type: 'email'
    }
  ]
  const handleSubmit = () => {
    setIsLoading(true)
    axiosInstance({
      url: '/account',
      method: 'PUT',
      data: { first_name, last_name, profile_picture }
    })
      .then((res) => {
        if (res.status == 200) {
          toast({
            title: res.data.message,
            status: 'success',
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
  useEffect(() => {
    const obj = {}

    if (!first_name) {
      obj.first_name = 'First name is required'
    }
    if (!last_name) {
      obj.last_name = 'Last name is required'
    }

    setErrors(obj)
  }, [first_name, last_name])
  return (
    <Box p={5}>
      <VStack spacing={6} align='start'>
        <HStack
          w={'full'}
          flexWrap={'wrap'}
          p={4}
          bg='gray.50'
          borderRadius='md'
          boxShadow='sm'>
          <FormLabel w={{ base: 'full', md: '100px', lg: '200px' }}>
            Profile Picture
          </FormLabel>
          <HStack flex={1} flexWrap={'wrap'} gap={5}>
            <Box position='relative' display='inline-block' overflow={'hidden'}>
              <Image
                w={150}
                h={150}
                rounded={'md'}
                src={
                  profile_picture ||
                  'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                }
              />
              <Input
                type='file'
                position='absolute'
                top='0'
                cursor='pointer'
                h={'full'}
                zIndex={99}
                left='0'
                opacity='0'
                aria-hidden='true'
                onChange={handleImageChange}
              />
              <Stack
                rounded={'md'}
                justifyContent={'center'}
                position='absolute'
                bottom='0'
                zIndex={1}
                width='100%'
                h={'full'}
                bg='blackAlpha.600'
                color='white'
                textAlign='center'
                p={2}>
                <Text>{profile_picture ? 'Change image' : 'Upload image'}</Text>
              </Stack>
            </Box>
            <Text
              flex={1}
              textAlign={'start'}
              mt={2}
              fontSize='sm'
              color='gray.500'>
              Image must be below 1024x1024px. Use PNG, JPG, or BMP format.
            </Text>
          </HStack>
        </HStack>

        <Stack
          w='100%'
          p={4}
          bg='gray.50'
          borderRadius='md'
          boxShadow='sm'
          spacing={5}>
          {inputs.map((item, i) => (
            <FormControl
              key={`profile-details-${i}`}
              isInvalid={errors[item?.name]}>
              <HStack w={'full'} flexWrap={'wrap'}>
                <FormLabel w={{ base: 'full', md: '100px', lg: '200px' }}>
                  {item?.label}
                </FormLabel>
                <Stack spacing={0} w={'full'} flex={1}>
                  <Input
                    placeholder={item?.placeholder}
                    isDisabled={item?.name == 'email_address'}
                    value={item?.value}
                    minW={'100px'}
                    onBlur={(e) => handleError(e, setErrors)}
                    name={item?.name}
                    onChange={(e) => {
                      handleError(e, setErrors)
                      dispatch(
                        updateProfileDetails({
                          key: item?.name,
                          value: e.target.value
                        })
                      )
                    }}
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
        </Stack>
        <Stack w={'full'} alignItems={'flex-end'}>
          <CommonButton
            data={{
              size: 'sm',
              isDisabled: Object.keys(errors)?.some((i) => errors[i] != ''),
              isLoading,
              bg: '#633BEF',
              text: ' Save Changes',
              color: '#fff',
              border: `0px`,
              handleClick: handleSubmit
            }}
          />
        </Stack>
      </VStack>
    </Box>
  )
}
