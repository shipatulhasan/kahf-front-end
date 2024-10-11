import { Container, Grid, GridItem, SimpleGrid, Stack } from '@chakra-ui/react'
import React from 'react'

const PageLaout = ({ data }) => {
  return (
    <Container maxW={'container.xl'}>
      <Grid templateColumns='repeat(6, 1fr)' gap={5}>
        <GridItem
          colSpan={2}
          // bg={'#fff'}
          rounded={'md'}>
          <Stack position={'sticky'} top={10}>
            {data.leftItem}
          </Stack>
        </GridItem>
        <GridItem colSpan={4} bg={'#fff'} rounded={'md'}>
          {data.rightItem}
        </GridItem>
      </Grid>
    </Container>
  )
}

export default PageLaout
