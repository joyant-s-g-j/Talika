import Navbar from '@/components/Navbar'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const ShowTask = () => {
  return (
    <Box>
        <Navbar />
        <Box display="flex" minH="100vh" alignItems="center" justifyContent="center" >
        <Text>Show task Section</Text>
        </Box>
    </Box>
  )
}

export default ShowTask