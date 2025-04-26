import { Task } from '@/types/task';
import { Badge, Box, Switch, Text } from '@chakra-ui/react'
import React from 'react'

interface TaskInfoProps {
    item: Task;
    handleToggleStatus: (id: string) => void;
}
  
const TaskInfo = ({item, handleToggleStatus}: TaskInfoProps) => {
  return (
    <Box display="flex" justifyContent="space-between" w="full" alignItems="center">
        <Box display="flex" flexDirection="column" alignItems="start">
            <Text as="span" textTransform="capitalize" fontWeight="bold">{item.title}</Text>
            <Text as="span">{item.description.split(" ").slice(0, 5).join(" ")}...</Text>
        </Box>
        <Box display="flex" gap={4} alignItems="center">
            <Text 
                as="span"
                backgroundColor={
                    item.category === "Work" ? "blue.300" :
                    item.category === "Personal" ? "purple.300" :
                    "gray.400"
                } 
                p={1} 
                borderRadius="md"
                fontSize="sm"
            >
                {item.category}
            </Text>
            <Badge color={item.status === "Pending" ? "orange.solid" : "green.solid"}>{item.status}</Badge>
            <Switch.Root 
                colorPalette="green"
                checked={item.status === "Completed"}
                onCheckedChange={() => handleToggleStatus(item.id)}
            >
            <Switch.HiddenInput />
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
            </Switch.Root>
        </Box>
    
    </Box>
  )
}

export default TaskInfo