import { Button, HStack, useBreakpointValue } from '@chakra-ui/react'
const CommonButton = ({ data }) => {
  const buttonContent = useBreakpointValue({
    base: <>{data?.icon && <data.icon />}</>, // For mobile devices (base breakpoint)
    md: (
      <>
        {data?.icon && <data.icon />}
        {data?.text}
      </>
    ) // For tablets and larger screens
  })
  return (
    <Button
      className={data?.className}
      size={data?.size}
      // leftIcon={{ md: data?.icon && <data.icon /> }}
      bg={data.bg}
      _hover={{ opacity: '.8' }}
      onClick={data.handleClick}
      color={data.color ? data?.color : '#000'}
      border={data?.border}
      variant='outline'>
      {data.break ? <HStack>{buttonContent}</HStack> : data?.text}
    </Button>
  )
}

export default CommonButton
