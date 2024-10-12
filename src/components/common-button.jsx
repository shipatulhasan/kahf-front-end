import { Button } from '@chakra-ui/react'
const CommonButton = ({ data }) => {
  return (
    <Button
      className={data?.className}
      size={data?.size}
      leftIcon={data?.icon && <data.icon />}
      bg={data.bg}
      _hover={{ opacity: '.8' }}
      onClick={data.handleClick}
      color={data.color ? data?.color : '#000'}
      border={data?.border}
      variant='outline'>
      {data.text}
    </Button>
  )
}

export default CommonButton
