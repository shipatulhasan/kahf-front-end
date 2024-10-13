import {
  Box,
  Button,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { FaGithub, FaLink, FaYoutube } from 'react-icons/fa'
import { MdDragHandle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import CommonButton from '../../components/common-button'
import PreviewCard from '../../components/preview-card'
import {
  addLink,
  removeLink,
  saveLinks,
  updateLink,
  updateLinksOrder
} from '../../features/profileSlice'
import PageLaout from '../../layout/page-layout'
import axiosInstance from '../../lib/axios-instance'
import { isValidUrl } from '../../lib/handler'

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
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()
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
    const isValid =
      field === 'url'
        ? isValidUrl(value, currentLink?.platform)
        : currentLink.isValid
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
  const handleSubmit = () => {
    setIsLoading(true)
    axiosInstance({
      url: '/links',
      method: 'PUT',
      data: { links }
    })
      .then((res) => {
        if (res.status == 201) {
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
    axiosInstance({
      url: '/links',
      method: 'GET'
    })
      .then((res) => {
        if (res.status == 200) {
          res?.data?.data?.length && dispatch(saveLinks(res?.data?.data))
        }
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <Stack p={5}>
      <VStack align='start' mb={5}>
        <Text fontSize='2xl' fontWeight='bold'>
          Customize your links
        </Text>
        <Text fontSize='sm' color='gray.500'>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </Text>
      </VStack>
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
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId='link-list' type='link-list'>
          {(provided) => (
            <Stack
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
                      <Stack align='start' spacing={2}>
                        <Text>Platform</Text>
                        <Select
                          placeholder='Select platform'
                          value={link.platform}
                          onChange={(e) =>
                            handleInputChange(i, 'platform', e.target.value)
                          }>
                          {platforms.map((item) => (
                            <option
                              key={item.platform}
                              value={item.platform}
                              disabled={links?.some(
                                (i) => i?.platform == item?.platform
                              )}>
                              {item.label}
                            </option>
                          ))}
                        </Select>
                      </Stack>
                      <Stack align='start' spacing={2} mt={4}>
                        <Text>Link</Text>
                        <Input
                          placeholder='Enter your link'
                          value={link.url}
                          isInvalid={!link?.isValid?.valid}
                          errorBorderColor='red.500'
                          onChange={(e) =>
                            handleInputChange(i, 'url', e.target.value)
                          }
                        />
                        {!link?.isValid?.valid && (
                          <Text
                            color={'red'}
                            fontWeight={'500'}
                            fontSize={'13px'}>
                            {link?.isValid?.message}
                          </Text>
                        )}
                      </Stack>
                    </Box>
                  )}
                </Draggable>
              ))}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Stack w={'full'} alignItems={'flex-end'}>
        <CommonButton
          data={{
            size: 'sm',
            isLoading,
            isDisabled: links?.some((i) => !i.isValid),
            bg: '#633BEF',
            text: ' Save Changes',
            color: '#fff',
            border: `0px`,
            handleClick: handleSubmit
          }}
        />
      </Stack>
    </Stack>
  )
}
