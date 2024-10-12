import { Container, Grid, GridItem, SimpleGrid, Stack } from '@chakra-ui/react'
import React from 'react'

const PageLaout = ({ data }) => {
  return (
    <Container maxW={'container.xl'}>
      <Grid templateColumns={'repeat(6, 1fr)'} gap={5}>
        <GridItem
          colSpan={{ base: 6, md: 3, xl: 2 }}
          // bg={'#fff'}
          rounded={'md'}>
          <Stack
            position={'sticky'}
            top={10}
            display={{ base: 'none', md: 'flex' }}>
            {data.leftItem}
          </Stack>
        </GridItem>
        <GridItem
          colSpan={{ base: 6, md: 3, xl: 4 }}
          bg={'#fff'}
          rounded={'md'}>
          {data.rightItem}
        </GridItem>
      </Grid>
    </Container>
  )
}

export default PageLaout
