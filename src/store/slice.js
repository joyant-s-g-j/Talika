const { createSlice, nanoid } = require("@reduxjs/toolkit")

const initialState = {
    tasks: []
}

const Slice = createSlice({
    name: 'addTaskSlice',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const {title, description, category, status} = action.payload
            const data = {
                id: nanoid(),
                title,
                description,
                category,
                status
            }
            state.tasks.push(data)
        },
        deleteTask: (state, action) => {
            const id = action.payload
            state.tasks = state.tasks.filter(task => task.id !== id)
        }
    }
})

export const {addTask, deleteTask} = Slice.actions
export default Slice.reducer