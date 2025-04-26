import React from 'react'
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import {  Box } from '@chakra-ui/react';
import EmptyStateComponent from './reusable/EmptyStateComponent';
import TaskItem from './TaskList/TaskItem';
import { Task } from '@/types/task';

type Props = {
    tasks: Task[];
    filteredTasks: Task[];
    handleCheckboxChange: (id: string) => void;
    checked: { [key: string]: boolean };
    handleDeleteTask: (id: string) => void;
    handleEditTask: (editedTask: Task) => void;
    handleToggleStatus: (id: string) => void;
    handleDragEnd: (result: any) => void;
    handleCloseActionBar: (id: string) => void
}

const TaskList = ({tasks, filteredTasks, handleCheckboxChange, checked, handleDeleteTask, handleEditTask, handleToggleStatus, handleDragEnd, handleCloseActionBar}:Props) => {
    return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks" direction="vertical">
            {(provided) => (
            <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                {filteredTasks.length > 0 ? filteredTasks.map((item, index) => (
                    <TaskItem
                        key={item.id}
                        item={item}
                        index={index}
                        handleCheckboxChange={handleCheckboxChange}
                        checked={checked}
                        handleDeleteTask={handleDeleteTask}
                        handleEditTask={handleEditTask}
                        handleToggleStatus={handleToggleStatus}
                        handleCloseActionBar={handleCloseActionBar}
                    />
                )) : (
                    <EmptyStateComponent />
                )}
                {provided.placeholder}
            </Box>
            )}
        </Droppable>
    </DragDropContext>
  )
}

export default TaskList