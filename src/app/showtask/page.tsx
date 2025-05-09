'use client'
import Navbar from '@/components/Navbar'
import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { DropResult } from "@hello-pangea/dnd";
import FilterSection from '@/components/FilterSection'
import TaskList from '@/components/TaskList'
import EmptyStateComponent from '@/components/reusable/EmptyStateComponent'
import { handleDeleteTask } from '@/utils/showtask/handleDeleteTask.js'
import { handleEditTask } from '@/utils/showtask/handleEditTask.js'
import { handleToggleStatus } from '@/utils/showtask/handleToggleStatus.js'
import { handleDragEndDrop } from '@/utils/showtask/handleDragEndDrop.js'
import { handleCheckboxChange } from '@/utils/showtask/handleCheckboxChange.js';
import { handleCloseActionBar } from '@/utils/showtask/handleCloseActionBar.js';
import { Task } from '@/types/task'

interface State {
  tasks: {
    tasks: Task[];
  };
}

const ShowTask = () => {
  const tasks = useSelector((state: State) => state.tasks.tasks);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const dispatch = useDispatch();
  const [taskList, setTaskList] = useState(tasks);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    setTaskList(tasks)
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => 
    (selectedCategory === '' || task.category === selectedCategory) &&
    (selectedStatus === '' || task.status === selectedStatus) &&
    (task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()))
  )

  const handleCheckboxChangeWrapper = (taskId: string) => { // checkbox handler, when it checked a delete and edit actionbar open. Here pass a specific id for specific task
    handleCheckboxChange(setChecked, taskId)
  }

  const handleCloseActionBarWrapper = (taskId: string) => { // actionbar close handler, use to close the action bar
    handleCloseActionBar(setChecked, taskId)
  }

  const handleDeleteTaskWrapper = (id: string) => { // for deleting task, here pass dispatch cause when user delete a task then the task data remove from the redux store
    handleDeleteTask(dispatch, id)
  }

  const handleEditTaskWrapper = (editedTask: Task) => { // editing task, using dispatch to update data on redux store also
    handleEditTask(dispatch, editedTask)
  };

  const handleToggleStatusWrapper = (taskId: string) => { 
    handleToggleStatus(dispatch, tasks, taskId)
  };

  const handleDragEndDropWrapper = (result: DropResult) => {
    handleDragEndDrop(dispatch, taskList, result)
  }

  if (!hasMounted) return null; // avoid hydration error
  return (
    <Box>
      <Navbar />
      <Box display="flex" minH="100vh" flexDirection="column" alignItems="center" mt={24} gap={4}>
        <Text fontSize="2xl" fontWeight="bold">Your Task</Text>
        <FilterSection // reusable component for filter search. 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          selectedStatus={selectedStatus} 
          setSelectedStatus={setSelectedStatus} 
          search={search}
          setSearch={setSearch}
        />
        {tasks.length === 0 ? (
          <EmptyStateComponent /> // when no task on list then showing the empty state
        ) : (
          <TaskList
            tasks={tasks}
            filteredTasks={filteredTasks}
            handleCheckboxChange={handleCheckboxChangeWrapper}
            checked={checked}
            handleDeleteTask={handleDeleteTaskWrapper}
            handleEditTask={handleEditTaskWrapper}
            handleToggleStatus={handleToggleStatusWrapper}
            handleDragEnd={handleDragEndDropWrapper}
            handleCloseActionBar={handleCloseActionBarWrapper}
          />
        )}
      </Box>
    </Box>
  );
  
}

export default ShowTask;
