'use client';
import { Flex } from '@chakra-ui/react'
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
        <NavButton display={{base: "none", lg: "flex"}} herf='/showtask' icon={ListTodo} label='See Task' /> 
    </Flex>
  )
}

export default DesktopNavbar