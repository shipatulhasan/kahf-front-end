import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaGithub, FaLink, FaYoutube } from 'react-icons/fa'
import PreviewCard from '../../components/preview-card'
import PageLaout from '../../layout/page-layout'
import { useDispatch, useSelector } from 'react-redux'
import { addLink, removeLink, updateLink } from '../../features/profileSlice'

const LinkEditor = () => {
  return (
    <PageLaout
      data={{
        leftItem: <PreviewCard style={{ marginTop: 0 }} />,
        rightItem: <CustomizeLinks />
      }}></PageLaout>
  )
}

export default LinkEditor

const CustomizeLinks = () => {
  const { links } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const platforms = [
    { label: 'GitHub', icon: FaGithub, platform: 'github', background: '#000' },
    {
      label: 'YouTube',
      icon: FaYoutube,
      platform: 'youtube',
      background: '#EB393E'
    },
    {
      label: 'Custom Link',
      icon: FaLink,
      platform: 'custom',
      background: '#633BEF'
    }
  ]
  const handleInputChange = (i, field, value) => {
    const selected = platforms.find((i) => i.platform == value)
    dispatch(
      updateLink({
        id: i,
        ...selected
      })
    )
  }

  return (
    <Box p={5}>
      {/* Title */}
      <VStack align='start' mb={5}>
        <Text fontSize='2xl' fontWeight='bold'>
          Customize your links
        </Text>
        <Text fontSize='sm' color='gray.500'>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </Text>
      </VStack>

      {/* Add new link button */}
      <Button
        colorScheme='purple'
        onClick={() =>
          dispatch(
            addLink({
              label: 'Custom Link',
              icon: FaLink,
              platform: 'custom',
              background: '#633BEF'
            })
          )
        }
        mb={5}
        variant='outline'
        w={'full'}>
        + Add new link
      </Button>

      {/* Links List */}
      <VStack spacing={4} w='100%'>
        {links.map((link, i) => (
          <Box
            key={`link-${i}`}
            w='100%'
            p={4}
            bg='gray.50'
            borderRadius='md'
            boxShadow='sm'>
            {/* Link Header with Remove button */}
            <HStack justify='space-between' mb={3}>
              <Text fontWeight='bold'>Link #{i + 1}</Text>
              <Text
                cursor={'pointer'}
                fontSize={'14px'}
                color={'#9d9d9d'}
                _hover={{ color: '#ff5d5d' }}
                fontWeight={'500'}
                onClick={() => dispatch(removeLink(i))}
                variant='ghost'>
                Remove
              </Text>
            </HStack>

            {/* Platform Selection */}
            <VStack align='start' spacing={2}>
              <Text>Platform</Text>
              <Select
                placeholder='Select platform'
                value={link.platform}
                onChange={(e) =>
                  handleInputChange(i, 'platform', e.target.value)
                }>
                {platforms.map((item) => (
                  <option key={item.platform} value={item.platform}>
                    <item.icon /> {item.label}
                  </option>
                ))}
              </Select>
            </VStack>

            {/* Link Input */}
            <VStack align='start' spacing={2} mt={4}>
              <Text>Link</Text>
              <Input
                placeholder='Enter your link'
                value={link.url}
                onChange={(e) => handleInputChange(i, 'url', e.target.value)}
              />
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}
