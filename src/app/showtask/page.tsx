'use client'
import Navbar from '@/components/Navbar'
import NavButton from '@/components/reusable/NavbarButton'
import { toaster } from '@/components/ui/toaster'
import { deleteTask, reorderTasks, updateTask } from '@/store/slice'
import { Box, ButtonGroup, EmptyState, Icon, Text, VStack } from '@chakra-ui/react'
import { ClipboardList, Home, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { DropResult } from "@hello-pangea/dnd";
import FilterSection from '@/components/FilterSection'
import TaskList from '@/components/TaskList'
import EmptyStateComponent from '@/components/reusable/EmptyStateComponent'

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

  useEffect(() => {
    
  }, [selectedCategory, selectedStatus, search, tasks])

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

  const handleEditTask = (editedTask: Task) => {
    dispatch(updateTask(editedTask));
    setEditedTask({});
    toaster.success({ title: "Task updated successfully" });
  };

  const handleToggleStatus = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if(task) {
      const updatedStatus = task.status === "Completed" ? "Pending" : "Completed";
      dispatch(updateTask({ ...task, status: updatedStatus }));
      toaster.success({ title: "Task status updated" });
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if(!destination) return
    const newList = Array.from(taskList)
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)

    setTaskList(newList)
    dispatch(reorderTasks(newList))
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
            handleCheckboxChange={handleCheckboxChange}
            checked={checked}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            handleToggleStatus={handleToggleStatus}
            handleDragEnd={handleDragEnd}
            handleCloseActionBar={handleCloseActionBar}
          />
        )}
      </Box>
    </Box>
  );
  
}

export default ShowTask;
