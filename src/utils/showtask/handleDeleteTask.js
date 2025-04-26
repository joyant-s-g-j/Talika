import { deleteTask } from '@/store/slice';
import { toaster } from '@/components/ui/toaster';

export const handleDeleteTask = (dispatch, id) => {
  dispatch(deleteTask(id));
  toaster.success({ title: "Task deleted successfully" });
};
