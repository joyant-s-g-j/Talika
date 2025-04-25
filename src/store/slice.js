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
        },
        updateTask: (state, action) => {
            const {id, title, description, category, status} = action.payload
            const task = state.tasks.find(task => task.id === id)
            if(task) {
                task.title = title
                task.description = description
                task.category = category
                task.status = status
            }
        },
        toggleStatus: (state, action) => {
            const id = action.payload
            const task = state.tasks.find(task => task.id === id)
            if(task) {
                task.status = task.status === 'Completed' ? 'Pending' : 'Completed'
            }
        }
    }
})

export const {addTask, deleteTask, updateTask, toggleStatus} = Slice.actions
export default Slice.reducer