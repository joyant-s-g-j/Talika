import { Box, ButtonGroup, EmptyState, Icon, VStack } from '@chakra-ui/react'
import { ClipboardList, Home, Plus } from 'lucide-react'
import React from 'react'
import NavButton from './NavbarButton'

const EmptyStateComponent = () => {
  return (
    <Box>
       <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <Icon as={ClipboardList} color="black" boxSize={16} />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>There are no tasks</EmptyState.Title>
              <EmptyState.Description>
                Want to create a task or go back to home?
              </EmptyState.Description>
              <ButtonGroup mt={2}>
                <NavButton display="flex" variant="solid" herf='/' icon={Home} label='Home' />
                <NavButton display="flex" variant="solid" herf='/createtask' icon={Plus} label='Create Task' />
              </ButtonGroup>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
    </Box>
  )
}

export default EmptyStateComponent