import { Box, Checkbox } from '@chakra-ui/react';
import { Draggable } from '@hello-pangea/dnd';
import React, { useState } from 'react'
import ActionButtons from './ActionButtons';
import TaskInfo from './TaskInfo';
import { Task } from '@/types/task';

interface TaskItemProps {
  item: Task;
  index: number;
  checked: { [id: string]: boolean };
  handleCheckboxChange: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  handleEditTask: (task: Task) => void;
  handleToggleStatus: (id: string) => void;
  handleCloseActionBar: (id: string) => void;
}

const TaskItem = ({item, index, checked, handleCheckboxChange, handleDeleteTask, handleEditTask, handleToggleStatus, handleCloseActionBar }:TaskItemProps) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const handleTaskUpdate = (updatedTask: Partial<Task>) => {
    setEditedTask((prev) => {
      const newTask = {
        ...(prev || item),
        ...updatedTask,
      };
      handleEditTask(newTask);
      return newTask;
    });
  };
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
        <Box
            p={4}
            borderBottom="1px solid #ccc"
            display="flex"
            gap={3}
            w={{base: "full", lg: "50%"}}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}     
        >
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
              <TaskInfo 
                item={item} 
                handleToggleStatus={handleToggleStatus}
              />
            </Box>
            {checked[item.id] && (
            <ActionButtons
              item={item}
              editedTask={editedTask}
              setEditedTask={setEditedTask}
              handleTaskUpdate={handleTaskUpdate}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
              handleCloseActionBar={handleCloseActionBar}
            />
            )}
        </Box>
        )}
    </Draggable>
  )
}

export default TaskItem