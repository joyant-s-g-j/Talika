'use client'
import Navbar from '@/components/Navbar'
import { Box, Checkbox, Switch, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
}

interface State {
  tasks: {
    tasks: Task[];
  };
}

const ShowTask = () => {
  const tasks = useSelector((state: State) => state.tasks.tasks);

  return (
    <Box>
      <Navbar />
      <Box display="flex" minH="100vh" flexDirection="column" alignItems="center" mt={24} gap={4}>
        <Text fontSize="2xl" fontWeight="bold">Show Task Section</Text>
        {
          tasks.length > 0 ? tasks.map((item) => (
            <Box key={item.id} p={4} borderBottom="1px solid #ccc" display="flex" gap={3} w="50%">
                <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
                <Box display="flex" justifyContent="space-between" flex="1">
                  <Box display="flex" flexDirection="column" alignItems="start">
                    <Text as="span" textTransform="capitalize" fontWeight="bold">{item.title}</Text>
                    <Text as="span">{item.description.split(" ").slice(0, 5).join(" ")}...</Text>
                  </Box>
                  <Box display="flex" gap={4} alignItems="center">
                    <Text 
                      as="span" 
                      backgroundColor={
                        item.category === "Work" ? "blue.300"
                        : item.category === "Personal" ? "purple.300"
                        : "gray.400"
                      } 
                      p={1} 
                      borderRadius="md"
                      fontSize="sm"
                    >
                      {item.category}
                    </Text>
                    <Text as="span">{item.status}</Text>
                    <Switch.Root>
                      <Switch.HiddenInput />
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch.Root>
                  </Box>
                </Box> 
            </Box>
          )) : (
            <Text>No tasks available.</Text>
          )
        }
      </Box>
    </Box>
  );
}

export default ShowTask;
