"use client"
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import { ListCheck } from 'lucide-react'
import MobileNavbar from './MobileNavbar'

const Navbar = () => {
  return (
    <Box 
        as="nav"
        position="fixed"
        top="0"
        margin="10px"
        width="calc(100% - 20px)"   
        zIndex="50"
        border="2px solid"
        borderColor="gray.200"
        bg="gray.emphasized"
        borderRadius="4xl"
        backdropFilter="blur(70px)"
    >
        <Box maxW="7xl" mx="auto" px={4}>
            <Flex align="center" gap={5} h="16" justify="space-between">
                <Flex align="center">
                    <Link href="/">
                        <Flex direction="row">
                            <Icon as={ListCheck} boxSize={{base: "9", lg: "12"}} />
                            <Text fontSize={{base: "2xl", lg: "4xl"}} fontWeight="bold">Talika</Text>
                        </Flex>
                    </Link>
                </Flex>
                <DesktopNavbar />
                <MobileNavbar />
            </Flex>
        </Box>
    </Box>
  )
}

export default Navbar