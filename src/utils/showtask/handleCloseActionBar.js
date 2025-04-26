export const handleCloseActionBar = (setChecked, taskId) => {
    setChecked(prev => {
        const newChecked = {...prev};
        newChecked[taskId] = false
        return newChecked
    })
}