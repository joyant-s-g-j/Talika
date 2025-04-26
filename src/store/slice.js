const { createSlice, nanoid, current } = require("@reduxjs/toolkit")

const initialState = {
    tasks: JSON.parse(localStorage.getItem("task")) || []
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
            let taskData = JSON.stringify(current(state.tasks))
            localStorage.setItem("task", taskData)
        },
        deleteTask: (state, action) => {
            const data = state.tasks.filter((item) => {
                return item.id !== action.payload
            })
            state.tasks = data
            localStorage.setItem("task", JSON.stringify(state.tasks))
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
            localStorage.setItem("task", JSON.stringify(current(state.tasks)))
        },
        toggleStatus: (state, action) => {
            const id = action.payload
            const task = state.tasks.find(task => task.id === id)
            if(task) {
                task.status = task.status === 'Completed' ? 'Pending' : 'Completed'
            }
            localStorage.setItem("task", JSON.stringify(current(state.tasks)));
        }
    }
})

export const {addTask, deleteTask, updateTask, toggleStatus} = Slice.actions
export default Slice.reducer