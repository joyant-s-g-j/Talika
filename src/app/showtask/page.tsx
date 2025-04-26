'use client'
import Navbar from '@/components/Navbar'
import { toaster } from '@/components/ui/toaster'
import { reorderTasks, updateTask } from '@/store/slice'
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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
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

  const handleCheckboxChangeWrapper = (taskId: string) => {
    handleCheckboxChange(setChecked, taskId)
  }

  const handleCloseActionBar = (taskId: string) => {
    setChecked(prev => {
      const newChecked = {...prev};
      newChecked[taskId] = false
      return newChecked
    })
  }

  const handleDeleteTaskWrapper = (id: string) => {
    handleDeleteTask(dispatch, id)
  }

  const handleEditTaskWrapper = (editedTask: Task) => {
    handleEditTask(dispatch, editedTask)
  };

  const handleToggleStatusWrapper = (taskId: string) => {
    handleToggleStatus(dispatch, tasks, taskId)
  };

  const handleDragEndDropWrapper = (result: DropResult) => {
    handleDragEndDrop(dispatch, taskList, result)
  }

  if (!hasMounted) return null;
  return (
    <Box>
      <Navbar />
      <Box display="flex" minH="100vh" flexDirection="column" alignItems="center" mt={24} gap={4}>
        <Text fontSize="2xl" fontWeight="bold">Your Task</Text>
        <FilterSection
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          selectedStatus={selectedStatus} 
          setSelectedStatus={setSelectedStatus} 
          search={search}
          setSearch={setSearch}
        />
        {tasks.length === 0 ? (
          <EmptyStateComponent />
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
            handleCloseActionBar={handleCloseActionBar}
          />
        )}
      </Box>
    </Box>
  );
  
}

export default ShowTask;
