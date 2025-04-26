'use client'
import Navbar from '@/components/Navbar'
import { toaster } from '@/components/ui/toaster'
import { addTask } from '@/store/slice'
import { Box, Button, Field, Fieldset, For, Input, NativeSelect, Stack, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const CreateTask = () => {
  const [taskData, setTaskData] = useState({ //tracking 4 field of task by using useState
    title: '',
    description: '',
    category: '',
    status: "Pending", //by default task status is pending
  })
  const dispatch = useDispatch() //declare dispatch for send data on redux store
  const handleChange = (e: { target: { name: any; value: any } }) => { // when user writing on the field then update the value and save the value on the state
    const { name, value } = e.target
    setTaskData(prev => ({...prev, [name]: value}))
  }
  const dataDispatch = () => { // its call when submit data
    if(!taskData.title || !taskData.description || !taskData.category) { 
      toaster.error({title: "Please fill in all the required fields."}) 
      return
    }
      dispatch(addTask(taskData)) //if everything is ok then data will send to the redux store
      setTaskData({ // form reseting(all field will again empty)
        title: '',
        description: '',
        category: '',
        status: "Pending",
      })
      toaster.success({title: "Task created successfully"})
  }
  return (
    <Box>
      <Navbar />
      <Box display="flex" minH="100vh" alignItems="center" justifyContent="center" >
        <Fieldset.Root 
          border="2px solid #ccc" 
          boxShadow="md" 
          borderRadius="5px" 
          padding="10px" 
          size="lg" 
          maxW={{base:"sm", lg: "md"}}
        >
          <Stack>
            <Fieldset.Legend 
              display="flex"
              fontSize="2xl" 
              justifyContent="center"
              fontWeight="bold"
            >
              Create Your Task
            </Fieldset.Legend>
          </Stack>
          <Fieldset.Content>
            {/* Task title input */}
            <Field.Root>
              <Field.Label fontWeight="bold">Task Title</Field.Label>
              <Input name='title' placeholder='Write your task title' value={taskData.title} onChange={handleChange} />
            </Field.Root>
            
            {/* Task Description input */}
            <Field.Root>
              <Field.Label fontWeight="bold">Task Description</Field.Label>
              <Textarea 
                name='description' 
                placeholder='Write your task description' 
                h="80px" 
                resize="none"
                value={taskData.description} 
                onChange={handleChange}
              />
            </Field.Root>

            {/* Task category input */}
            <Field.Root>
              <Field.Label fontWeight="bold">Task Category</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field name='category' placeholder='Select category' value={taskData.category} onChange={handleChange} >
                  <For each={["Work", "Personal", "Other"]}>
                    {(item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )}
                  </For>
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Field.Root>
          </Fieldset.Content>
          
          {/* Task submit button */}
          <Button type='submit' onClick={dataDispatch} alignSelf="flex-center">
            Submit
          </Button>
        </Fieldset.Root>
      </Box>
    </Box>
  )
}

export default CreateTask