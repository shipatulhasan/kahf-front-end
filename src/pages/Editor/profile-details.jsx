import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PreviewCard from '../../components/preview-card'
import PageLaout from '../../layout/page-layout'
import { updateProfileDetails } from '../../features/profileSlice'
import { useDispatch } from 'react-redux'
import CommonButton from '../../components/common-button'
import { handleBlur, validateField } from '../../lib/handler'
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
  const { first_name, last_name, email_address, profile_picture } = useSelector(
    (state) => state.profile
  )

  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})

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
              <Image w={150} h={150} rounded={'md'} src={profile_picture} />

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
                <Text>Change Image</Text>
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
                    value={item?.value}
                    minW={'100px'}
                    onBlur={(e) => handleBlur(e, setErrors)}
                    name={item?.name}
                    onChange={(e) =>
                      dispatch(
                        updateProfileDetails({
                          key: item?.name,
                          value: e.target.value
                        })
                      )
                    }
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
              // icon: FaLink,
              bg: '#633BEF',
              text: ' Save Changes',
              color: '#fff',
              border: `0px`
              // handleClick: () => navigate('/preview')
            }}
          />
        </Stack>
      </VStack>
    </Box>
  )
}
