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
import {
  addLink,
  removeLink,
  updateLink,
  updateLinksOrder
} from '../../features/profileSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { MdDragHandle } from 'react-icons/md'

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
  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (_) {
      return false
    }
  }
  const platforms = [
    {
      label: 'GitHub',
      icon: FaGithub,
      platform: 'github',
      background: '#000',
      url: ''
    },
    {
      label: 'YouTube',
      icon: FaYoutube,
      platform: 'youtube',
      background: '#EB393E',
      url: ''
    },
    {
      label: 'Custom Link',
      icon: FaLink,
      platform: 'custom',
      background: '#633BEF',
      url: ''
    }
  ]
  const handleInputChange = (i, field, value) => {
    const currentLink = links[i]
    const selected = platforms.find((i) => i.platform == value)
    const isValid = field === 'url' ? isValidUrl(value) : currentLink.isValidUrl
    dispatch(
      updateLink({
        id: i,
        ...selected,
        url: field == 'url' ? value : currentLink.url,
        isValid
      })
    )
  }
  const handleDragDrop = (results) => {
    const { source, destination, type } = results

    if (!destination) return

    if (
      source.droppableId == destination.droppableId &&
      source.index == destination.index
    )
      return

    if (type == 'link-list') {
      const reorderLinks = [...links]
      const sourceIndex = source.index
      const destinationIndex = destination.index
      const [removeLinks] = reorderLinks.splice(sourceIndex, 1)
      reorderLinks.splice(destinationIndex, 0, removeLinks)
      dispatch(updateLinksOrder(reorderLinks))
    }
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
              background: '#633BEF',
              url: ''
            })
          )
        }
        mb={5}
        variant='outline'
        w={'full'}>
        + Add new link
      </Button>

      {/* Links List */}
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId='link-list' type='link-list'>
          {(provided) => (
            <VStack
              spacing={4}
              w='100%'
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {links?.map((link, i) => (
                <Draggable
                  draggableId={`link-${i}`}
                  index={i}
                  key={`link-${i}`}>
                  {(provided) => (
                    <Box
                      w='100%'
                      p={4}
                      bg='gray.50'
                      borderRadius='md'
                      boxShadow='sm'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <HStack justify='space-between' mb={3}>
                        <HStack>
                          <MdDragHandle color='#3b3b3b' fontSize={'20px'} />
                          <Text fontWeight='bold'>Link #{i + 1}</Text>
                        </HStack>
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
                          isInvalid={!link?.isValidUrl}
                          errorBorderColor='red.500'
                          onChange={(e) =>
                            handleInputChange(i, 'url', e.target.value)
                          }
                        />
                      </VStack>
                    </Box>
                  )}
                </Draggable>
              ))}
            </VStack>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}
