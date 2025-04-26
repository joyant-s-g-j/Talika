import { reorderTasks } from '@/store/slice';

export const handleDragEndDrop = (dispatch, taskList, result) => {
    const { source, destination } = result
    if(!destination) return
    const newList = Array.from(taskList)
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)
    dispatch(reorderTasks(newList))
}