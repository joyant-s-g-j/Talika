import { updateTask } from '@/store/slice';
import { toaster } from '@/components/ui/toaster';

export const handleToggleStatus = (dispatch, tasks, taskId) => {
    const task = tasks.find(t => t.id === taskId)
    if(task) {
        const updatedStatus = task.status === "Completed" ? "Pending" : "Completed";
        dispatch(updateTask({ ...task, status: updatedStatus }));
        toaster.success({ title: "Task status updated" });
    }
}