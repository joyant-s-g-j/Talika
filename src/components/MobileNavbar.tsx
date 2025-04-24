"use client"
import { Box, Button, CloseButton, Drawer, Icon, Portal, Text } from '@chakra-ui/react'
import { Home, ListTodo, Menu, Plus } from 'lucide-react'
import React, { useState } from 'react'
import NavButton from './reusable/NavbarButton'

const MobileNavbar = () => {
  const [open, setOpen] = useState(false)
  return (
        <Box display={{base:"flex", lg: "none"}}>
            <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Drawer.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <Icon as={Menu} />
                    </Button>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>Menu</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body display="flex" flexDirection="column" alignItems="start">
                                <NavButton herf='/' icon={Home} label='Home' />
                                <NavButton herf='/createtask' icon={Plus} label='Create Task' />
                                <NavButton herf='/showtask' icon={ListTodo} label='Show Task' />
                            </Drawer.Body>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </Box>
  )
}

export default MobileNavbar