import Navbar from '@/components/Navbar'
import { Box, Button, Field, Fieldset, For, Input, NativeSelect, Stack, Text, Textarea } from '@chakra-ui/react'
import React from 'react'

const CreateTask = () => {
  return (
    <Box>
      <Navbar />
      <Box display="flex" minH="100vh" alignItems="center" justifyContent="center" >
        <Fieldset.Root size="lg" maxW="md">
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

            <Field.Root>
              <Field.Label fontWeight="bold">Task Title</Field.Label>
              <Input name='Title' placeholder='Write your task title' />
            </Field.Root>
            
            <Field.Root>
              <Field.Label fontWeight="bold">Task Description</Field.Label>
              <Textarea 
                name='description' 
                placeholder='Write your task description' 
                h="80px" 
                resize="none" 
              />
            </Field.Root>

            <Field.Root>
              <Field.Label fontWeight="bold">Task Category</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field name='country'>
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
          
          <Button type='submit' alignSelf="flex-center">
            Submit
          </Button>
        </Fieldset.Root>
      </Box>
    </Box>
  )
}

export default CreateTask