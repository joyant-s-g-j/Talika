import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ActionBar, Badge, Box, Button, Checkbox, CloseButton, Dialog, Portal, Switch, Text } from '@chakra-ui/react';
import EditableTaskFields from './reusable/EditableTaskFields';
import { LuPencilLine, LuTrash2 } from 'react-icons/lu';
import EmptyStateComponent from './reusable/EmptyStateComponent';

interface Task {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
}

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

const buttons = [
    { title: 'Delete', icon: <LuTrash2 />, color: 'red' },
    { title: 'Edit', icon: <LuPencilLine />, color: 'orange' }
];
const TaskList = ({tasks, filteredTasks, handleCheckboxChange, checked, handleDeleteTask, handleEditTask, handleToggleStatus, handleDragEnd, handleCloseActionBar}:Props) => {
    const [editedTask, setEditedTask] = useState<Task | null>(null);
    const handleTaskUpdate = (updatedTask: Partial<Task>) => {
        setEditedTask((prev) => ({
            ...prev!,
            ...updatedTask,
        }));
        if (editedTask) {
            handleEditTask(editedTask);
        }
    };
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
                        {checked[item.id] && (
                        <ActionBar.Root open={checked[item.id]}>
                            <Portal>
                            <ActionBar.Positioner>
                                <ActionBar.Content>
                                {buttons.map(({ title, icon, color }) => (
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
                                                {title === "Edit" ? (
                                                    <EditableTaskFields
                                                        title={item.title}
                                                        description={item.description}
                                                        category={item.category}
                                                        onChange={(updated) =>
                                                            setEditedTask((prev) => ({
                                                            ...(prev || item),
                                                            ...updated,
                                                            }))
                                                        }
                                                    />
                                                ) : 'Are you sure you want to delete your task?'}
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
                                                        if(editedTask) {
                                                            handleEditTask(editedTask);
                                                        } else {
                                                            handleTaskUpdate(item)
                                                        }
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
                        )}
                    </Box>
                    )}
                </Draggable>
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