import { Avatar, Box, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

const PreviewCard = ({ style }) => {
  const { profile_picture, email_address, first_name, last_name, links } =
    useSelector((state) => state.profile)
  return (
    <Stack alignItems={'center'} mt={style?.marginTop}>
      <Box
        maxW={'320px'}
        bg='white'
        w='sm'
        p={6}
        rounded={'xl'}
        boxShadow='lg'
        textAlign='center'>
        {/* Profile Image */}
        <Avatar
          border={'2px solid #633BEF'}
          size='xl'
          name='Ben Wright'
          src={profile_picture}
          mb={4}
        />
        <VStack spacing={2}>
          {/* Name and Email */}
          <Text fontSize='xl' fontWeight='bold'>
            {first_name} {last_name}
          </Text>
          <Text fontSize='sm' color='gray.500'>
            {email_address}
          </Text>
        </VStack>

        {/* Social Media Buttons */}
        <VStack spacing={4} mt={6}>
          {links?.map((item, i) => (
            <HStack
              key={`links-${item?.platform}-${i}`}
              bg={item?.background}
              color={'#fff'}
              w='200px'
              rounded={'md'}
              p={3}
              alignItems='center'
              justifyContent='space-between'>
              <HStack>
                {item.icon ? <item.icon /> : <></>}
                <Text textTransform={'capitalize'}>{item?.platform}</Text>
              </HStack>
              <FaArrowRightLong />
            </HStack>
          ))}
        </VStack>
      </Box>
    </Stack>
  )
}

export default PreviewCard
