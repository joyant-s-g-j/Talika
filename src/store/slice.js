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
        }
    }
})

export const {addTask} = Slice.actions
export default Slice.reducer