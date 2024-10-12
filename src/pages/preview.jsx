import {
  Box,
  Button,
  Container,
  HStack,
  useClipboard,
  useToast
} from '@chakra-ui/react'
import PreviewCard from '../components/preview-card'
import CommonButton from '../components/common-button'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Preview = () => {
  const navigate = useNavigate()
  const { links } = useSelector((state) => state.profile)
  const toast = useToast()
  const { onCopy, value, setValue, hasCopied } = useClipboard()
  useEffect(() => {
    const urls = links?.map((i) => i?.url).join(',')
    setValue(urls)
  }, [])
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
                handleClick: () => navigate('/')
              },
              {
                size: 'md',
                // icon: FaLink,
                bg: '#633BEF',
                text: 'Share Link',
                color: '#fff',
                border: `1px solid #633BEF`,
                handleClick: () => {
                  onCopy()
                  toast({
                    title: 'Links copied.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                  })
                }
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
