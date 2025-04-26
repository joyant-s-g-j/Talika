export const handleCheckboxChange = (setChecked, taskId) => {
    setChecked(prev => {
      const newChecked = {...prev};
      newChecked[taskId] = !newChecked[taskId]
      return newChecked
    })
  }