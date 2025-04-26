import { ActionBar, Box, Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import React from 'react'
import { LuPencilLine, LuTrash2, LuFileText } from 'react-icons/lu';
import EditableTaskFields from '../reusable/EditableTaskFields';
import { Task } from '@/types/task';

interface Props {
    item: Task;
    editedTask: Task | null;
    setEditedTask: React.Dispatch<React.SetStateAction<Task | null>>;
    handleTaskUpdate: (updatedTask: Partial<Task>) => void;
    handleDeleteTask: (id: string) => void;
    handleEditTask: (editedTask: Task) => void;
    handleCloseActionBar: (id: string) => void;
}

const buttons = [
    { title: 'Delete', icon: <LuTrash2 />, color: 'red' },
    { title: 'Edit', icon: <LuPencilLine />, color: 'orange' },
    { title: 'Details', icon: <LuFileText />, color: 'teal'  }
];

const ActionButtons = ({item, editedTask, setEditedTask, handleTaskUpdate, handleDeleteTask, handleEditTask, handleCloseActionBar }: Props) => {
  return (
    <ActionBar.Root open={true}>
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
                            ) : title === 'Delete' ? (
                                'Are you sure you want to delete your task?'
                            ) : (
                                <Box>
                                    <Text><strong>Title:</strong> {item.title}</Text>
                                    <Text><strong>Description:</strong> {item.description}</Text>
                                    <Text><strong>Category:</strong> {item.category}</Text>
                                    <Text><strong>Status:</strong> {item.status}</Text>
                                </Box>
                            )}
                            </Dialog.Body>
                            <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>

                            {title !== "Details" && (
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
                            )}
                            
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

export default ActionButtons