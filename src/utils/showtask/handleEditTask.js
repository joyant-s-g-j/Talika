import { updateTask } from '@/store/slice';
import { toaster } from '@/components/ui/toaster';

export const handleEditTask = (dispatch, updatedTask) => {
    dispatch(updateTask(updatedTask))
    toaster.success({ title: "Task updated successfully" }); 
};