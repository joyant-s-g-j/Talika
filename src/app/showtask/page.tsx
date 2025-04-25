'use client'
import Navbar from '@/components/Navbar'
import EditableTaskFields from '@/components/reusable/EditableTaskFields'
import FilterSelect from '@/components/reusable/FilterSelect'
import NavButton from '@/components/reusable/NavbarButton'
import { toaster } from '@/components/ui/toaster'
import { deleteTask, updateTask } from '@/store/slice'
import { ActionBar, Badge, Box, Button, ButtonGroup, Checkbox, CloseButton, Dialog, EmptyState, Icon, Input, Portal, Switch, Text, VStack } from '@chakra-ui/react'
import { ClipboardList, Home, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { LuPencilLine, LuTrash2 } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';

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

const categoryOptions = [
  { label: 'All', value: '' },
  { label: 'Work', value: 'Work' },
  { label: 'Personal', value: 'Personal' },
  { label: 'Other', value: 'Other' },
];

const statusOptions = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Completed', value: 'Completed' },
];

const buttons = [
  {
    title: 'Delete',
    icon: <LuTrash2 />,
    color: 'red'
  },
  {
    title: 'Edit',
    icon: <LuPencilLine />,
    color: 'orange'
  }
]

const ShowTask = () => {
  const tasks = useSelector((state: State) => state.tasks.tasks);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((task) => 
    (selectedCategory === '' || task.category === selectedCategory) &&
    (selectedStatus === '' || task.status === selectedStatus) &&
    (task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()))
  )

  const handleCheckboxChange = (taskId: string) => {
    setChecked(prev => {
      const newChecked = {...prev};
      newChecked[taskId] = !newChecked[taskId]
      return newChecked
    })
  }

  const handleCloseActionBar = (taskId: string) => {
    setChecked(prev => {
      const newChecked = {...prev};
      newChecked[taskId] = false
      return newChecked
    })
  }

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id))
    toaster.success({title: "Task deleted successfully"})
  }

  const handleEditTask = (id: string) => {
    const originalTask = tasks.find((t) => t.id === id);
    if (originalTask){
      const updated = {
        ...originalTask,
        ...editedTask,
      };
    
      dispatch(updateTask(updated));
      setEditedTask({});
      toaster.success({title: "Task updated successfully"})
    }
  }

  return (
    <Box>
      <Navbar />
      <Box display="flex" minH="100vh" flexDirection="column" alignItems="center" mt={24} gap={4}>
        <Text fontSize="2xl" fontWeight="bold">Your Task</Text>
        <Box display="flex" flexDirection={{base: "column", lg: "row"}} gap={2}>
          <FilterSelect 
            label='Select Category'
            placeholder='Category'
            options={categoryOptions}
            selectedValue={selectedCategory}
            onChange={setSelectedCategory}
          />
          <FilterSelect 
            label='Select Status'
            placeholder='Status'
            options={statusOptions}
            selectedValue={selectedStatus}
            onChange={setSelectedStatus}
          />
          <Box display="flex" flexDirection="column">
            <Text>Search</Text>
            <Input
              placeholder='Seach by task name'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              width="320px"
              size="sm"
            />
          </Box>
        </Box>
        {
          tasks.length === 0 ? (
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <Icon as={ClipboardList} color="black" boxSize={16}/>
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>There is no task</EmptyState.Title>
                  <EmptyState.Description>
                    You want to create task or go back to home? 
                  </EmptyState.Description>
                  <ButtonGroup mt={2}>
                    <NavButton display="flex" variant="solid" herf='/' icon={Home} label='Home' />
                    <NavButton display="flex" variant="solid" herf='/createtask' icon={Plus} label='Create Task' />
                  </ButtonGroup>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          ) : (
              filteredTasks.length > 0 ? filteredTasks.map((item) => (
                <Box key={item.id} p={4} borderBottom="1px solid #ccc" display="flex" gap={3} w={{base: "full", lg: "50%"}}>
                  <Checkbox.Root 
                    checked={!!checked[item.id]}
                    onChange={() => handleCheckboxChange(item.id)}
                    variant="subtle"
                    colorPalette="red"
                  >
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
                      <Badge color="orange.solid">{item.status}</Badge>
                      <Switch.Root colorPalette="green">
                        <Switch.HiddenInput />
                        <Switch.Control>
                          <Switch.Thumb />
                        </Switch.Control>
                      </Switch.Root>
                    </Box>
                  </Box>
                  {
                    checked[item.id] && (
                      <ActionBar.Root open={checked[item.id]}>
                        <Portal>
                          <ActionBar.Positioner>
                            <ActionBar.Content>
                              {buttons.map(({title, icon, color}) => (
                                <Dialog.Root key={title} placement="center" motionPreset="slide-in-bottom">
                                <Dialog.Trigger>     
                                  <Button color={color} borderColor={color} variant="outline" size="sm">
                                    {icon}
                                    {title}
                                  </Button>
                                </Dialog.Trigger>
                                <Portal>
                                  <Dialog.Backdrop />
                                  <Dialog.Positioner>
                                    <Dialog.Content>
                                      <Dialog.Header>
                                        <Dialog.Title>{title} Task</Dialog.Title>
                                      </Dialog.Header>
                                      <Dialog.Body>                                  
                                        {title === "Edit" ?                                  
                                          <EditableTaskFields
                                            title={item.title}
                                            description={item.description}
                                            category={item.category}
                                            onChange={(updated) =>
                                              setEditedTask((prev) => ({
                                                ...prev,
                                                ...updated,
                                                id: item.id,
                                              }))
                                            }                                                                                   
                                          />                                         
                                          :'Are you sure you want to delete your task?'
                                        }
                                      </Dialog.Body>
                                      <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                          <Button variant="outline">Cancel</Button>
                                        </Dialog.ActionTrigger>
                                        <Button 
                                          backgroundColor="red" 
                                          onClick={() => {
                                            if (title === 'Delete') {
                                              handleDeleteTask(item.id);
                                            } else if (title === 'Edit') {
                                              handleEditTask(item.id);
                                              handleCloseActionBar(item.id);
                                            }
                                          }}
                                        >
                                          {title}
                                        </Button>
                                      </Dialog.Footer>
                                      <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                      </Dialog.CloseTrigger>
                                    </Dialog.Content>
                                  </Dialog.Positioner>
                                </Portal>
                              </Dialog.Root>
                              ))}       
                              <ActionBar.CloseTrigger asChild>
                                <CloseButton size="sm" onClick={() => handleCloseActionBar(item.id)} />
                              </ActionBar.CloseTrigger>
                            </ActionBar.Content>
                          </ActionBar.Positioner>
                        </Portal>
                      </ActionBar.Root>
                    )
                  }         
                </Box>
              )) : (
                <EmptyState.Root>
                  <EmptyState.Content>
                    <EmptyState.Indicator>
                      <Icon as={ClipboardList} color="black" boxSize={16}/>
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                      <EmptyState.Title>There is no task</EmptyState.Title>
                    </VStack>
                  </EmptyState.Content>
                </EmptyState.Root>
              )
          )
        }
      </Box>
    </Box>
  );
}

export default ShowTask;
