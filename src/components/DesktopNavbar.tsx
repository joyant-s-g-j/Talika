'use client';
import { Box, Button, Flex, Icon, Show, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { Home, ListTodo, Plus } from 'lucide-react';
import NavButton from './reusable/NavbarButton';
const DesktopNavbar = () => {
  return (
    <Flex
        display={{base: "none", lg: "flex"}}
        align="center"
        gap={4}
    >
        <NavButton display={{base: "none", lg: "flex"}} herf='/' icon={Home} label='Home' />
        <NavButton display={{base: "none", lg: "flex"}} herf='/createtask' icon={Plus} label='Create Task' />
        <NavButton display={{base: "none", lg: "flex"}} herf='/showtask' icon={ListTodo} label='Show Task' /> 
    </Flex>
  )
}

export default DesktopNavbar