import { Box, Button, HStack } from '@chakra-ui/react'
import PreviewCard from '../components/preview-card'

const Preview = () => {
  return (
    <Box bg='gray.100' minH='100vh' display='flex' flexDirection='column'>
      {/* Header Section */}
      <Box
        bg='#633BEF'
        minH={300}
        p={4}
        display='flex'
        justifyContent='space-between'
        roundedBottom={32}>
        <HStack
          p={3}
          justifyContent={'space-between'}
          bg={'#fff'}
          rounded={'md'}
          w={'full'}
          h={'60px'}>
          <Button bg={'#fff'} border={'1px solid #633BEF'} variant='outline'>
            Back to Editor
          </Button>
          <Button bg='#633BEF' color={'#fff'}>
            Share Link
          </Button>
        </HStack>
      </Box>

      {/* Profile Card Section */}
      <PreviewCard />
    </Box>
  )
}

export default Preview
