const inititalState = {
    assigned: false
}
  
const assigned = (state = inititalState, action) => {
    console.log('======', action)
    switch (action.type) {
      case 'CHANGE_TASKTYPE':
        return {
          ...state,
          assigned: action.tasktype.assigned
        }
      default:
        return state;
    }
}
  
export default assigned;