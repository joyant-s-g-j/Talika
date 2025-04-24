import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import { Box } from '@chakra-ui/react'
import React from 'react'

const HomePage = () => {
  return (
    <Box>
        <Navbar />
        <Hero />
    </Box>
  )
}

export default HomePage