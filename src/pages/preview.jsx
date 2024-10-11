import { Box, Button, Container, HStack } from '@chakra-ui/react'
import PreviewCard from '../components/preview-card'
import CommonButton from '../components/common-button'
import { useNavigate } from 'react-router-dom'

const Preview = () => {
  const navigate = useNavigate()
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
        <Container maxW={'container.xl'}>
          <HStack
            p={3}
            justifyContent={'space-between'}
            bg={'#fff'}
            rounded={'md'}
            w={'full'}
            h={'60px'}>
            {[
              {
                size: 'md',
                // icon: FaLink,
                bg: '#fff',
                text: 'Back to Editor',
                border: `1px solid #633BEF`,
                handleNavigate: () => navigate('/')
              },
              {
                size: 'md',
                // icon: FaLink,
                bg: '#633BEF',
                text: 'Share Link',
                color: '#fff',
                border: `1px solid #633BEF`
              }
            ].map((item, i) => (
              <CommonButton key={`preview-${i}`} data={item} />
            ))}
          </HStack>
        </Container>
      </Box>

      {/* Profile Card Section */}
      <PreviewCard style={{ marginTop: -24 }} />
    </Box>
  )
}

export default Preview
