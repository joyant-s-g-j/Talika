"use client"
import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import NavButton from './reusable/NavbarButton'
import { Plus } from 'lucide-react'

const Hero = () => {
  return (
    <Box 
        display="flex"
        minH="100vh"
        alignItems="center"
        justifyContent="center" 
        flexDirection="column"
        textAlign="center"
        px={4}
    >
        <Text 
            textTransform="capitalize" 
            fontSize={{base: "2xl", md:"5xl", lg: "6xl" }}
            fontWeight="bold"
        >
            Welcome to your <br /> task manage app
        </Text>
        <Text mt={4} fontSize={{base:"sm", lg: "lg"}}>A simple and effective way to manage your task</Text>
        <NavButton 
            variant="solid" 
            mt={4}
            fontSize="lg"
            fontWeight="bold"
            colorPalette="blue" 
            herf='/createtask' 
            icon={Plus} 
            label='Create Task'
        />
    </Box>
  )
}

export default Hero